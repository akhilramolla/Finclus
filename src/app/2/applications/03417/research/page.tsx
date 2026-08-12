"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {ArrowRight, Check, FlaskConical, Play, Plus, RotateCcw} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {researchPlanner, researchStreams} from "@/content/research";
import {useProductStore} from "@/lib/product-store";

const completeStage = researchStreams.length + 1;

export default function ResearchPage() {
  const researchComplete = useProductStore(state => state.researchComplete);
  const researchAdded = useProductStore(state => state.researchAdded);
  const act = useProductStore(state => state.act);
  const [stage, setStage] = useState(() => researchComplete ? completeStage : -1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStage(current => {
      const next = current + 1;
      if (next >= completeStage) {
        setRunning(false);
        if (!researchComplete) act("Institutional research completed", {researchComplete:true});
        return completeStage;
      }
      return next;
    }), 500);
    return () => window.clearTimeout(timer);
  }, [act,researchComplete,running,stage]);

  const run = () => {setStage(0); setRunning(true)};
  const addFindings = () => {
    if (!researchAdded) act("12 research findings added to the credit file", {researchAdded:true});
  };

  return <ApplicationWorkspace stage={researchAdded?"Research filed":researchComplete?"Research complete":"Research pending"} action={<Link href="/2/applications/03417/appraisal" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-bold">Open appraisal <ArrowRight size={14}/></Link>}>
    <section className="rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5"><div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-violet-700"><FlaskConical size={15}/> Institutional research</div><h2 className="mt-1 text-xl font-black">Six-source credit brief</h2><p className="mt-1 text-sm text-slate-600">The run order and findings are fixed for this application.</p></div><div className="flex gap-2"><button onClick={run} disabled={running} className="inline-flex items-center gap-2 rounded-md bg-violet-700 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">{researchComplete?<RotateCcw size={14}/>:<Play size={14}/>} {running?"Running":researchComplete?"Run again":"Run research"}</button><button onClick={addFindings} disabled={!researchComplete||researchAdded} className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-bold text-white disabled:bg-slate-300"><Plus size={14}/> {researchAdded?"Added to credit file":"Add findings to credit file"}</button></div></div>
      <div className="p-5">
        <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-8">{["Plan",...researchPlanner,"Complete"].map((label,index) => <div key={label} className={`rounded-md border p-2 text-center text-[10px] font-bold ${stage>=index?"border-violet-300 bg-violet-50 text-violet-900":"border-slate-200 text-slate-400"}`}><span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full border border-current">{stage>index?<Check size={11}/>:index+1}</span>{label}</div>)}</div>
        {stage<0?<div className="mt-5 rounded-md border border-dashed border-slate-300 bg-slate-50 p-10 text-center"><h3 className="font-black">Research has not run</h3><p className="mt-1 text-sm text-slate-500">Run the staged process to inspect every source and finding.</p></div>:<div className="mt-5 space-y-4">
          <div className="rounded-md border border-violet-200 bg-violet-50 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-violet-700">Research plan</div><div className="mt-2 flex flex-wrap gap-2">{researchPlanner.map(item=><span key={item} className="rounded bg-white px-2 py-1 text-xs font-bold text-violet-900">{item}</span>)}</div></div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{researchStreams.map((stream,index) => <article key={stream.id} className={`rounded-md border p-4 transition-opacity ${stage>=index+1?"border-slate-200 bg-white opacity-100":"border-slate-200 bg-slate-50 opacity-35"}`}><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-black">{stream.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{stream.question}</p></div><span className="rounded bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">{stage>=index+1?"Complete":"Queued"}</span></div>{stage>=index+1?<div className="mt-3 space-y-3">{stream.findings.map(finding=><div key={finding.id} className="border-l-2 border-emerald-400 pl-3"><div className="text-xs font-bold">{finding.label}</div><p className="mt-1 text-[11px] leading-5 text-slate-600">{finding.detail}</p><div className="mt-1 text-[9px] font-bold uppercase text-slate-400">{finding.source} · {finding.confidence}</div></div>)}</div>:null}</article>)}</div>
          {stage>=completeStage?<div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><b>Credit review item retained:</b> audited financials, GSTN and AA-derived bank credits disagree. No consolidated turnover has been recorded.</div>:null}
        </div>}
      </div>
    </section>
  </ApplicationWorkspace>;
}
