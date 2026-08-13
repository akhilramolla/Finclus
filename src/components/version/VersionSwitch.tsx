"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const v1ToV2: Record<string, string> = {
  "/bank/queue": "/2/work-queue",
  "/bank/los/03417": "/2/applications/03417",
  "/bank/research/03417": "/2/applications/03417/research",
  "/bank/appraisal/03417": "/2/applications/03417/appraisal",
  "/bank/conflict/03417": "/2/applications/03417/exceptions",
  "/bank/correction/03417": "/2/applications/03417/correction",
  "/bank/sanction/03417": "/2/applications/03417/decision",
  "/lms/03417": "/2/accounts/03417",
  "/portfolio/ews/03417": "/2/early-warning/03417",
  "/portfolio/cluster": "/2/clusters/annapurna",
  "/portfolio/lakshmi": "/2/leads/lakshmi",
};
const v2ToV1 = Object.fromEntries(
  Object.entries(v1ToV2).map(([one, two]) => [two, `/1${one}`]),
);

export function VersionSwitch({dark = false}: {dark?: boolean}) {
  const pathname = usePathname();
  const isV2 = pathname.startsWith("/2");
  const isV3 =
    pathname.startsWith("/3") ||
    pathname.includes("aif-swarm") ||
    pathname.endsWith("/aif-swarm.html");
  const legacyPath = pathname.startsWith("/1")
    ? pathname.slice(2) || "/"
    : pathname;
  const oneHref = isV2
    ? (v2ToV1[pathname] ?? "/1")
    : pathname.startsWith("/1")
      ? pathname
      : isV3
        ? "/1"
        : "/1";
  const twoHref = isV2 ? pathname : (v1ToV2[legacyPath] ?? "/2");
  const threeHref = "/3";

  const base = `inline-flex rounded-lg border p-0.5 text-xs font-black ${
    dark ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"
  }`;
  const idle = dark
    ? "text-slate-300 hover:bg-slate-800"
    : "text-slate-600 hover:bg-slate-100";

  return (
    <nav aria-label="Experience version" className={base}>
      <Link
        href={oneHref}
        className={`rounded-md px-2.5 py-1.5 ${!isV2 && !isV3 ? "bg-blue-700 text-white" : idle}`}
      >
        1
      </Link>
      <Link
        href={twoHref}
        className={`rounded-md px-2.5 py-1.5 ${isV2 ? "bg-violet-600 text-white" : idle}`}
      >
        2
      </Link>
      <Link
        href={threeHref}
        className={`rounded-md px-2.5 py-1.5 ${isV3 ? "bg-emerald-600 text-white" : idle}`}
        title="AIF Agent Swarm"
      >
        3
      </Link>
    </nav>
  );
}
