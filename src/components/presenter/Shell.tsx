"use client";

import Link from "next/link";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {runsheet} from "@/content/runsheet";
import {useDemoStore} from "@/lib/store";
import {GovernanceDrawer} from "@/components/governance/GovernanceDrawer";
import {VersionSwitch} from "@/components/version/VersionSwitch";

function versioned(route:string) {return route === "/" ? "/1" : `/1${route}`;}

export function Shell({children}:{children:React.ReactNode}) {
  const demo = useDemoStore();
  const pathname = usePathname();
  const router = useRouter();
  const legacyPath = pathname.startsWith("/1") ? pathname.slice(2) || "/" : pathname === "/legacy" ? "/" : pathname;
  const routeIndex = runsheet.findIndex(step => step.route === legacyPath);
  const index = routeIndex >= 0 ? routeIndex : Math.min(demo.current, runsheet.length - 1);

  useEffect(() => {
    if (routeIndex >= 0 && demo.current !== routeIndex) demo.set({current: routeIndex});
  }, [routeIndex, demo.current, demo.set]);

  useEffect(() => {
    if ((pathname === "/1" || pathname === "/legacy") && demo.started && demo.current === 1) router.push("/1/frame/stack");
  }, [pathname, demo.started, demo.current, router]);

  useEffect(() => {
    const onKey = (event:KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, button, [contenteditable='true']") || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "r") {demo.reset(); router.push("/1"); return;}
      if (key === "g") {demo.set({governance: !demo.governance}); return;}
      if (key === "p") {demo.set({notes: !demo.notes}); return;}
      if (key === "f") {router.push("/1/facts"); return;}
      if (key === "s") {const scales=[1,1.15,1.3]; const current=scales.findIndex(value=>Math.abs(value-demo.scale)<0.01); demo.set({scale:scales[(current+1)%scales.length]}); return;}
      if (event.key === "Escape") {demo.set({notes:false,governance:false}); return;}
      if ((event.key === "ArrowRight" || event.key === " ") && index < runsheet.length - 1) {event.preventDefault(); router.push(versioned(runsheet[index+1].route)); return;}
      if (event.key === "ArrowLeft" && index > 0) {event.preventDefault(); router.push(versioned(runsheet[index-1].route));}
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [demo, index, router]);

  return <div style={{fontSize:`${demo.scale}em`}} className="min-h-screen">
    <header className="fixed top-0 z-30 flex min-h-10 w-full items-center gap-3 border-b border-slate-200 bg-white px-4 py-2 text-xs text-slate-600">
      <div className="min-w-0 flex-1 truncate"><b className="text-slate-900">SIMULATED — WORKSHOP DEMO</b> · synthetic borrower · no live RBIH/ULI/AA call · every fact is sourced and labelled</div>
      <span className="tabnums whitespace-nowrap">{Math.round(demo.scale*100)}% · {index+1}/{runsheet.length}</span><VersionSwitch/>
    </header>
    <aside className="fixed bottom-0 left-0 top-10 z-20 hidden w-56 overflow-y-auto border-r border-slate-200 bg-white p-3 lg:block">
      <Link href="/1" className="mb-4 block text-lg font-bold text-slate-900">FINCLUS<span className="text-violet-700">.</span><span className="block text-[10px] font-normal tracking-[.2em] text-slate-500">INTELLIGENCE FABRIC</span></Link>
      {["Frame","Borrower","Bank","Portfolio","Close"].map(group=><div key={group} className="mb-3"><div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{group}</div>{runsheet.filter(step=>step.group===group).map(step=>{const stepIndex=runsheet.indexOf(step); return <Link key={step.id} href={versioned(step.route)} className={`block rounded px-2 py-1 text-xs ${stepIndex===index?"bg-blue-50 font-bold text-blue-700":"text-slate-600 hover:bg-slate-50"}`}>{stepIndex<index?<span className="mr-1 text-emerald-600">✓</span>:null}{step.title}</Link>})}</div>)}
    </aside>
    <main className="min-h-screen pt-14 lg:ml-56"><div className="mx-auto max-w-[1500px] p-4 sm:p-6">{children}</div></main>
    {demo.notes&&<div className="fixed bottom-5 right-5 z-40 max-w-sm rounded-lg border border-violet-200 bg-white p-4 shadow-xl"><b>Presenter note</b><p className="mt-2 text-sm">{runsheet[index]?.presenterNote}</p><p className="mt-2 text-xs text-violet-700">Cue: {runsheet[index]?.cue}</p></div>}
    <GovernanceDrawer/>
  </div>;
}
