"use client";

import {CheckCircle2, Circle, FileClock, ShieldCheck, UserRoundCheck} from "lucide-react";
import {Fact} from "@/components/governance/Fact";
import {useProductStore} from "@/lib/product-store";

const controls=[
  ["Evidence lineage", "Source, artefact and reconciliation reason retained on account, signal and lead records.", "Credit operations", "Active"],
  ["Human decision boundary", "Models may qualify evidence and recommend action; bank officers investigate, appraise and decide.", "Credit risk", "Active"],
  ["Exception retention", "Unresolved cluster records and Lakshmi’s two payment mismatches remain visible through conversion.", "Operations risk", "Active"],
  ["Servicing separation", "Early-warning investigation does not alter DPD, SMA band or asset classification.", "Portfolio risk", "Active"],
  ["Workflow persistence", "RM assignment, lead review and application creation are retained in the local operating state.", "Product control", "Active"]
] as const;

export function GovernanceSummary() {
  const assigned=useProductStore(state=>state.ewsAssigned);
  const reviewed=useProductStore(state=>state.clusterReviewed);
  const created=useProductStore(state=>state.lakshmiCreated);
  return <div className="space-y-4 pb-16 lg:pb-0">
    <header className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-[.16em] text-teal-700">Governance · operational control summary</div><h1 className="mt-2 text-2xl font-black tracking-tight">Account-to-rural-origination controls</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Control status across account monitoring, early-warning triage, evidence qualification and application conversion. Product actions remain inspectable and human-owned.</p></div><span className="inline-flex items-center gap-2 rounded bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-emerald-800"><ShieldCheck size={14}/>Controls active</span></div></header>

    <section className="grid gap-px overflow-hidden rounded-lg border border-slate-300 bg-slate-200 sm:grid-cols-3"><FlowStatus label="RM investigation" complete={assigned} detail={assigned?"Assigned to S. Reddy":"Pending assignment"}/><FlowStatus label="Lakshmi review" complete={reviewed} detail={reviewed?"Evidence workspace opened":"Pending review"}/><FlowStatus label="KCC-AH application" complete={created} detail={created?"KCCAH/AP/2026/08112":"Not created"}/></section>

    <section className="overflow-hidden rounded-lg border border-slate-300 bg-white"><div className="border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="text-sm font-black">Operating control register</h2><p className="mt-1 text-xs text-slate-500">Active means the product surface enforces or exposes the control; it does not discharge the bank’s policy or validation obligations.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[840px] text-left text-xs"><thead className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Control</th><th className="px-3 py-3">Product operation</th><th className="px-3 py-3">Accountable owner</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{controls.map(([control,operation,owner,status])=><tr key={control} className="border-b border-slate-100 last:border-0"><th className="px-4 py-3 font-black">{control}</th><td className="px-3 py-3 leading-5 text-slate-600">{operation}</td><td className="px-3 py-3 font-semibold">{owner}</td><td className="px-3 py-3"><span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-800"><CheckCircle2 size={11}/>{status}</span></td></tr>)}</tbody></table></div></section>

    <section className="grid gap-4 lg:grid-cols-2"><div className="rounded-lg border border-slate-300 bg-white p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700"><UserRoundCheck size={15}/>Human authority</div><p className="mt-2 text-sm leading-6 text-slate-700">The RM investigates early-warning alerts. Credit officers resolve evidence conflicts and appraise the KCC-AH request. Only authorised bank roles change limits, classification or sanction status.</p><div className="mt-3 text-xs leading-5 text-slate-700"><Fact id="rbi.dl2025.limit"/></div></div><div className="rounded-lg border border-amber-300 bg-amber-50 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800"><FileClock size={15}/>Regulatory instrument status</div><p className="mt-2 text-sm leading-6 text-amber-950">Model-risk requirements shown here are control design references. The cited RBI model-risk guidance remains draft and requires bank-owned implementation, validation and approval.</p><div className="mt-3 text-xs leading-5 text-amber-900"><Fact id="rbi.mrm.draft"/></div></div></section>

    <section className="rounded-lg border border-slate-300 bg-slate-950 p-4 text-xs leading-6 text-slate-300"><div className="font-black text-white">Accountability position</div><div className="mt-1"><Fact id="rbi.dl2025.lsp"/></div></section>
  </div>;
}

function FlowStatus({label,complete,detail}:{label:string;complete:boolean;detail:string}) {return <div className="bg-white p-4"><div className="flex items-center gap-2">{complete?<CheckCircle2 size={17} className="text-emerald-600"/>:<Circle size={17} className="text-slate-300"/>}<div className="text-xs font-black">{label}</div></div><div className={`mt-2 text-[10px] font-semibold ${complete?"text-emerald-700":"text-slate-500"}`}>{detail}</div></div>}
