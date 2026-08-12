import { existsSync, mkdirSync } from "node:fs";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { join, resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

import { runsheet } from "../src/content/runsheet";
import { ewsSignals } from "../src/content/ews";

const projectRoot = resolve(__dirname, "..");
const port = process.env.PLAYWRIGHT_PORT ?? "3100";
const baseURL = `http://127.0.0.1:${port}`;
const screensDirectory = join(projectRoot, "e2e", "screens");

let app: ChildProcess | undefined;

test.beforeAll(async () => {
  test.setTimeout(120_000);
  mkdirSync(screensDirectory, { recursive: true });

  const nextCli = resolve(projectRoot, "node_modules", "next", "dist", "bin", "next");
  if (!existsSync(join(projectRoot, ".next", "BUILD_ID"))) {
    const build = spawnSync(process.execPath, [nextCli, "build"], {
      cwd: projectRoot,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: "inherit",
    });
    if (build.status !== 0) throw new Error("The Next.js production build failed before the smoke test started.");
  }
  app = spawn(process.execPath, [nextCli, "start", "--hostname", "127.0.0.1", "--port", port], {
    cwd: projectRoot,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let startupOutput = "";
  app.stdout?.on("data", (chunk: Buffer) => { startupOutput += chunk.toString(); });
  app.stderr?.on("data", (chunk: Buffer) => { startupOutput += chunk.toString(); });

  const deadline = Date.now() + 60_000;
  let lastError = "";
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseURL}/`);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }

  throw new Error(`The app did not start at ${baseURL}: ${lastError}\n${startupOutput}`);
});

test.afterAll(() => {
  app?.kill();
});

function installBrowserDiagnostics(page: Page) {
  let activeRoute = "";
  const issues: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      issues.push(`[${activeRoute}] console ${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    issues.push(`[${activeRoute}] page error: ${error.message}`);
  });

  return {
    setRoute(route: string) {
      activeRoute = route;
    },
    issues,
  };
}

async function assertRouteAndCapture(
  page: Page,
  index: number,
  viewportName: "1280x720" | "1920x1080",
  diagnostics: ReturnType<typeof installBrowserDiagnostics>,
) {
  const step = runsheet[index];
  diagnostics.setRoute(step.route);

  await page.goto(`${baseURL}${step.route}`, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(`${baseURL}${step.route}`);
  await expect(page.locator("h1").first()).toBeVisible();
  await page.waitForTimeout(500);

  const dimensions = await page.evaluate(() => ({
    bodyWidth: document.body?.scrollWidth ?? 0,
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(
    Math.max(dimensions.bodyWidth, dimensions.documentWidth),
    `${step.route} overflows horizontally at ${viewportName}`,
  ).toBeLessThanOrEqual(dimensions.viewportWidth);

  await page.screenshot({
    path: join(screensDirectory, `${String(index).padStart(2, "0")}-${step.id}-${viewportName}.png`),
  });
}

async function assertDiagnosticsAreClean(issues: string[], viewportName: string) {
  expect(issues, `console errors or warnings at ${viewportName}`).toEqual([]);
}

async function advanceRunsheet(page: Page, index: number) {
  const expected = `${index + 1}/${runsheet.length}`;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if ((await page.locator("header").first().textContent())?.includes(expected)) return;
    await page.keyboard.press("ArrowRight");
    try {
      await expect(page.locator("header").first()).toContainText(expected, { timeout: 1_500 });
      return;
    } catch {
      // A freshly hydrated route can miss the first key event; retry the same key.
    }
  }
  await expect(page.locator("header").first()).toContainText(expected);
}

test("drives the complete Finclus runsheet and preserves governed state", async ({ page }) => {
  test.setTimeout(120_000);
  const diagnostics = installBrowserDiagnostics(page);

  // Start from a known persisted state. Begin is the only click used to enter the run.
  diagnostics.setRoute("/");
  await page.goto(`${baseURL}/`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await assertRouteAndCapture(page, 0, "1280x720", diagnostics);

  await page.waitForTimeout(750);
  const beginButton = page.getByRole("button", { name: "Begin at frame" });
  for (let attempt = 0; attempt < 3 && !(await page.locator("header").first().textContent())?.includes(`2/${runsheet.length}`); attempt += 1) {
    await beginButton.click();
    await page.waitForTimeout(150);
  }
  await expect(page.locator("header").first()).toContainText(`2/${runsheet.length}`);

  // ArrowRight advances the runsheet. Direct deep links enter each screen because the
  // presenter shell intentionally keeps keyboard advancement separate from URL routing.
  await assertRouteAndCapture(page, 1, "1280x720", diagnostics);
  for (let index = 2; index < runsheet.length; index += 1) {
    await advanceRunsheet(page, index);
    await assertRouteAndCapture(page, index, "1280x720", diagnostics);

    if (runsheet[index].id === "research") {
      await page.getByRole("button", { name: "RUN RESEARCH" }).click();
      await expect(page.getByRole("button", { name: "RUN AGAIN" })).toBeVisible({ timeout: 8_000 });
      await expect(page.getByText(/Research complete/)).toBeVisible();
      await expect(page.getByText("6 / 6 populated")).toBeVisible();
      await page.screenshot({ path: join(screensDirectory, `${String(index).padStart(2, "0")}-research-complete-1280x720.png`) });
    }

    if (runsheet[index].id === "conflict") {
      await expect(page.getByText("I cannot safely resolve this discrepancy.")).toBeVisible();
      await expect(page.getByText("18.8%", { exact: false })).toBeVisible();
    }

    if (runsheet[index].id === "correction") {
      await page.getByRole("button", { name: "Challenge", exact: true }).click();
      await page.getByRole("checkbox").check();
      const recordButton = page.getByRole("button").filter({ hasText: /record|retract|submit/i }).last();
      await expect(recordButton).toBeVisible();
      await recordButton.click();

      await expect(page.getByText("Retracted. My source was stale by 80 days.")).toBeVisible();
      await expect(page.getByText("AUD-03417-002").first()).toBeVisible();
      await expect(page.getByText("Governance drawer")).toBeVisible();
      await page.screenshot({ path: join(screensDirectory, `${String(index).padStart(2, "0")}-correction-retracted-1280x720.png`) });
      await page.keyboard.press("g");
    }

    if (runsheet[index].id === "sanction") {
      await expect(page.getByText("Disbursement gate · 5 conditions")).toBeVisible();
      await expect(page.getByText("Land-use conversion for survey 214/2B complete and verified")).toBeVisible();
      await expect(page.getByText("CP list corrected")).toBeVisible();
    }

    if (runsheet[index].id === "ews") {
      await expect(page.getByText("6 sanction assumptions challenged")).toBeVisible({ timeout: 8_000 });
      for (const signal of ewsSignals) {
        await expect(page.getByText(signal.label, { exact: true })).toBeVisible();
      }
    }

    if (runsheet[index].id === "cluster") {
      await expect(page.getByText("287 / 312", { exact: true })).toBeVisible({ timeout: 8_000 });
      await expect(page.getByText("Underwritable cluster")).toBeVisible();

      // The route and the persisted presenter index both survive a deep-link refresh.
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("header").first()).toContainText(`${index + 1}/${runsheet.length}`);
      await expect(page.getByText("287 / 312", { exact: true })).toBeVisible({ timeout: 8_000 });
    }
  }

  await expect(page).toHaveURL(`${baseURL}/close`);
  await page.keyboard.press("r");
  await expect(page.locator("header").first()).toContainText(`1/${runsheet.length}`);
  await assertDiagnosticsAreClean(diagnostics.issues, "1280x720");

  // Repeat the route/overflow/screenshot sweep at the second required projector size.
  const browser = page.context().browser();
  expect(browser).not.toBeNull();
  const wideContext = await browser!.newContext({ viewport: { width: 1920, height: 1080 } });
  const widePage = await wideContext.newPage();
  const wideDiagnostics = installBrowserDiagnostics(widePage);
  for (let index = 0; index < runsheet.length; index += 1) {
    await assertRouteAndCapture(widePage, index, "1920x1080", wideDiagnostics);
  }
  await assertDiagnosticsAreClean(wideDiagnostics.issues, "1920x1080");
  await wideContext.close();
});
