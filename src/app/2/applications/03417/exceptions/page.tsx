"use client";

import Link from "next/link";
import {AlertTriangle, ArrowRight, CheckCircle2, Route} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {useApplicationWorkflow} from "@/components/product/application/application-store";
import {useProductStore} from "@/lib/product-store";

const sources = [
  {name:"Audited financials", value:6.90, confidence:"High", ref:"AUD-FY25-03417", basis:"Revenue reported in signed FY25 statements"},
  {name:"GSTN · GSTR-3B", value:8.20, confidence:"High", ref:"GST-3B-FY25-03417", basis:"Taxable outward supplies aggregated for FY25"},
  {name:"Bank credits via AA", value:7.80, confidence:"Medium", ref:"AA-03417-2026", basis:"Eligible operating credits after transfer exclusions"},
];

export default function ExceptionsPage() {
  const escalated = useProductStore(state=>state.conflictEscalated);
  const act = useProductStore(state=>state.act);
  const note = useApplicationWorkflow(state=>state.exceptionNote);
  const setNote = useApplicationWorkflow(state=>state.setExceptionNote);
  const max = Math.max(...sources.map(source=>source.value));
  const min = Math.min(...sources.map(source=>source.value));
  const variance = (max-min)/min*100;
  const escalate = () => {
    if (!escalated) act(`Turnover conflict escalated to RCPC credit review${note.trim()?`: ${note.trim()}`:""}`, {conflictEscalated:true});
  };

  return <ApplicationWorkspace stage={escalated?"Exception escalated":"Exception review"} action={<Link href="/2/applications/03417/correction" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-bold">Open correction <ArrowRight size={14}/></Link>}>
    <section className="rounded-lg border border-amber-300 bg-white overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4 bg-amber-50 p-5"><div className="flex gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={22}/><div><div className="text-[10px] font-black uppercase tracking-[.16em] text-amber-800">Turnover reconciliation</div><h2 className="mt-1 text-xl font-black text-amber-950">Three attributable sources disagree by {variance.toFixed(1)}%</h2><p className="mt-1 text-sm text-amber-900">The variance exceeds the 10% review tolerance. Each value remains separate.</p></div></div><span className="rounded bg-white px-3 py-1.5 text-xs font-black text-amber-900">Owner · Credit officer</span></div>
      <div className="grid gap-px bg-slate-200 md:grid-cols-3">{sources.map(source=><article key={source.name} className="bg-white p-5"><div className="flex items-center justify-between gap-2"><h3 className="text-xs font-black uppercase tracking-wider text-slate-500">{source.name}</h3><span className="rounded bg-slate-100 px-2 py-1 text-[9px] font-black">{source.confidence}</span></div><div className="mt-4 font-mono text-3xl font-black">₹{source.value.toFixed(2)} Cr</div><p className="mt-3 text-xs leading-5 text-slate-600">{source.basis}</p><div className="mt-3 font-mono text-[10px] text-slate-400">{source.ref} · FY25</div></article>)}</div>
    </section>
    <section className="rounded-lg border border-slate-300 bg-white p-5"><div className="grid gap-5 lg:grid-cols-[1fr_auto]"><div><label htmlFor="exception-note" className="text-xs font-black text-slate-700">Escalation note</label><textarea id="exception-note" value={note} onChange={event=>setNote(event.target.value)} placeholder="Record the review question or supporting context" className="mt-2 min-h-24 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"/><p className="mt-2 text-xs text-slate-500">No source will be averaged or selected by this action.</p></div><div className="flex items-end"><button onClick={escalate} disabled={escalated} className="inline-flex min-w-48 items-center justify-center gap-2 rounded-md bg-amber-600 px-5 py-3 text-sm font-bold text-white disabled:bg-emerald-700">{escalated?<CheckCircle2 size={16}/>:<Route size={16}/>} {escalated?"Escalated":"Escalate to credit review"}</button></div></div></section>
  </ApplicationWorkspace>;
}
