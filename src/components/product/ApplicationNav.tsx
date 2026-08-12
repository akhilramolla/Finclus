"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const tabs = [
  ["Overview","/2/applications/03417"], ["Research","/2/applications/03417/research"], ["Appraisal","/2/applications/03417/appraisal"],
  ["Exceptions","/2/applications/03417/exceptions"], ["Correction","/2/applications/03417/correction"], ["Decision","/2/applications/03417/decision"]
];

export function ApplicationNav(){const pathname=usePathname(); return <nav className="flex overflow-x-auto rounded-lg border border-slate-300 bg-white p-1" aria-label="Application workspace">{tabs.map(([label,href])=><Link key={href} href={href} className={`whitespace-nowrap rounded-md px-4 py-2 text-xs font-bold ${pathname===href?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>{label}</Link>)}</nav>}
