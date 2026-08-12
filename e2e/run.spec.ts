import {existsSync} from "node:fs";
import {spawn, spawnSync, type ChildProcess} from "node:child_process";
import {resolve} from "node:path";
import {expect, test, type Page} from "@playwright/test";
import {runsheet} from "../src/content/runsheet";

const root=resolve(__dirname,"..");
const port=process.env.PLAYWRIGHT_PORT??"3100";
const baseURL=`http://127.0.0.1:${port}`;
let app:ChildProcess|undefined;

test.beforeAll(async()=>{
  test.setTimeout(180_000);
  const nextCli=resolve(root,"node_modules","next","dist","bin","next");
  if(!existsSync(resolve(root,".next","BUILD_ID"))){const build=spawnSync(process.execPath,[nextCli,"build"],{cwd:root,env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},stdio:"inherit"});if(build.status!==0)throw new Error("Build failed");}
  app=spawn(process.execPath,[nextCli,"start","--hostname","127.0.0.1","--port",port],{cwd:root,env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},stdio:"ignore"});
  const deadline=Date.now()+60_000; while(Date.now()<deadline){try{if((await fetch(baseURL)).ok)return}catch{} await new Promise(resolvePromise=>setTimeout(resolvePromise,250));} throw new Error("App did not start");
});
test.afterAll(()=>app?.kill());

function diagnostics(page:Page){const issues:string[]=[];page.on("console",message=>{if(["error","warning"].includes(message.type()))issues.push(`${message.type()}: ${message.text()}`)});page.on("pageerror",error=>issues.push(error.message));return issues;}
async function noOverflow(page:Page){const size=await page.evaluate(()=>({content:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),viewport:window.innerWidth}));expect(size.content).toBeLessThanOrEqual(size.viewport);}

test("Version 1 remains the complete keyboard-led workshop",async({page})=>{
  test.setTimeout(120_000); const issues=diagnostics(page);
  await page.goto(`${baseURL}/1`); await page.evaluate(()=>localStorage.clear()); await page.reload();
  await expect(page.getByRole("heading",{name:/Finclus/})).toBeVisible();
  await page.getByRole("button",{name:"Begin at frame"}).click();
  await expect(page).toHaveURL(`${baseURL}/1/frame/stack`);
  for(let index=1;index<runsheet.length;index++){
    const expected=runsheet[index].route==="/"?"/1":`/1${runsheet[index].route}`;
    await expect(page).toHaveURL(`${baseURL}${expected}`); await expect(page.locator("h1").first()).toBeVisible(); await noOverflow(page);
    if(index<runsheet.length-1)await page.keyboard.press("ArrowRight");
  }
  await page.keyboard.press("r"); await expect(page).toHaveURL(`${baseURL}/1`); await expect(page.locator("header")).toContainText(`1/${runsheet.length}`); expect(issues).toEqual([]);
});

test("Version 2 operates from application to rural origination",async({page})=>{
  test.setTimeout(120_000); const issues=diagnostics(page);
  await page.goto(`${baseURL}/2`); await page.evaluate(()=>localStorage.clear()); await page.reload();
  await expect(page.getByRole("heading",{name:"Good morning, K. Rao"})).toBeVisible();
  await page.getByRole("link",{name:/Open work queue/}).click();
  await page.getByRole("button",{name:/Claim and open/}).click();
  await expect(page).toHaveURL(`${baseURL}/2/applications/03417`);
  await page.getByRole("link",{name:/Start institutional research/}).click();
  await page.getByRole("button",{name:"Run research"}).click();
  await expect(page.getByRole("button",{name:"Add findings to credit file"})).toBeEnabled({timeout:10_000});
  await page.getByRole("button",{name:"Add findings to credit file"}).click();
  await page.getByRole("link",{name:"Open appraisal"}).click();
  await page.getByRole("button",{name:"Submit recommendation"}).click();
  await page.getByRole("link",{name:"Review exceptions"}).click();
  await page.getByLabel("Escalation note").fill("Reconcile all three attributable sources before decision.");
  await page.getByRole("button",{name:"Escalate to credit review"}).click();
  await page.getByRole("link",{name:"Open correction"}).click();
  await page.getByRole("button",{name:"Record challenge"}).click();
  await page.locator('input[type="file"]').setInputFiles({name:"rm-site-note.pdf",mimeType:"application/pdf",buffer:Buffer.from("synthetic site note")});
  await page.getByRole("button",{name:"Retract original assertion"}).click();
  await expect(page.getByText("Land-use conversion is pending.")).toBeVisible();
  await page.getByRole("link",{name:"Open decision"}).click();
  await page.getByRole("button",{name:"Approve as checker"}).click();
  await page.getByRole("button",{name:"Sanction facility"}).click();
  await page.getByRole("link",{name:/Continue to account 03417/}).click();
  await page.getByRole("link",{name:/Open monitoring review/}).click();
  await page.getByRole("button",{name:"Assign RM investigation"}).click();
  await page.getByRole("link",{name:"Cluster Origination"}).click();
  await expect(page.getByText("287",{exact:true})).toBeVisible();
  await page.getByRole("link",{name:/Review evidence/}).click();
  await page.getByRole("button",{name:"Create KCC-AH Application"}).click();
  await expect(page.getByText(/KCCAH\/AP\/2026\/08112 created/)).toBeVisible();
  await page.getByRole("link",{name:"Work Queue"}).click();
  await expect(page.getByText("Lakshmi Devi G.")).toBeVisible();
  await expect(page.getByText("₹1.60 L")).toBeVisible(); await noOverflow(page); expect(issues).toEqual([]);
});

test("version switch preserves mapped context",async({page})=>{
  await page.goto(`${baseURL}/1/bank/queue`); await page.getByRole("navigation",{name:"Experience version"}).getByRole("link",{name:"2"}).click(); await expect(page).toHaveURL(`${baseURL}/2/work-queue`);
  await page.getByRole("navigation",{name:"Experience version"}).getByRole("link",{name:"1"}).click(); await expect(page).toHaveURL(`${baseURL}/1/bank/queue`);
});
