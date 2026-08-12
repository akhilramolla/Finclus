"use client";

import Link from "next/link";
import {AlertTriangle, ArrowLeft, ArrowRight, CalendarDays, Check, FilePlus2, Milk} from "lucide-react";
import {Fact} from "@/components/governance/Fact";
import {useProductStore} from "@/lib/product-store";

const evidence=[
  ["Milk-society pouring record", "26 months", "Retrieved", "MILK-GDP-188-26"],
  ["Society payment ledger", "26 months", "Retrieved with mismatch", "PAY-GDP-188-26"],
  ["Veterinary vaccination record", "3 cattle", "Matched", "AH-GDP-7702"],
  ["PM-KISAN beneficiary record", "FY 2025-26", "Matched", "PMK-AP-90118"],
  ["Bureau report", "No file", "New to credit", "CIC-NTC-110826"]
] as const;

const milkCycle=[
  ["Jun–Oct", "High output", "₹9,600", "₹4,000 monthly collection"],
  ["Nov–Feb", "Seasonal trough", "₹7,500", "₹2,500 monthly collection"],
  ["Mar–May", "Recovery", "₹8,800", "₹3,500 monthly collection"],
  ["Annual clean-up", "Society bonus / surplus", "Variable", "₹12,000 principal reduction"]
] as const;

export function LakshmiLeadWorkspace() {
  const created=useProductStore(state=>state.lakshmiCreated);
  const act=useProductStore(state=>state.act);
  const create=()=>act("KCC-AH application created for Lakshmi Devi G. from alternate evidence lead",{lakshmiCreated:true});
  return <div className="space-y-4 pb-16 lg:pb-0">
    <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/2/clusters/annapurna" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950"><ArrowLeft size={14}/>Annapurna origination queue</Link><span className={`rounded px-2 py-1 text-[10px] font-black uppercase tracking-wider ${created?"bg-emerald-100 text-emerald-800":"bg-violet-100 text-violet-800"}`}>{created?"Application created":"Lead review"}</span></div>
    <header className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-5"><div><div className="text-[10px] font-black uppercase tracking-[.16em] text-violet-700">Alternate-evidence workspace · SUP-GDP-001</div><h1 className="mt-2 text-2xl font-black tracking-tight">Lakshmi Devi G.</h1><p className="mt-1 text-xs text-slate-600">Gudupalle · Dairy producer · New to credit · 3 crossbred cows</p></div><div className="text-right"><div className="text-[9px] font-black uppercase tracking-wider text-slate-400">Requested facility</div><div className="mt-1 font-mono text-2xl font-black">₹1.60 lakh</div><div className="mt-1 text-xs text-slate-500">KCC-AH working capital + equipment</div></div></div></header>

    <section className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white"><div className="border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="flex items-center gap-2 text-sm font-black"><Milk size={16} className="text-violet-700"/>Alternate evidence register</h2><p className="mt-1 text-xs text-slate-500">Source records support review; they do not replace KYC, eligibility or credit appraisal.</p></div><div className="divide-y divide-slate-100">{evidence.map(([source,period,status,artefact])=><div key={source} className="grid gap-2 p-4 sm:grid-cols-[1.2fr_.6fr_.8fr] sm:items-center"><div><div className="text-xs font-black">{source}</div><div className="mt-1 font-mono text-[10px] text-slate-500">{artefact}</div></div><div className="text-xs text-slate-600">{period}</div><div className={`text-xs font-bold ${status.includes("mismatch")?"text-amber-800":"text-emerald-700"}`}>{status}</div></div>)}</div></div>
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800"><AlertTriangle size={15}/>Evidence mismatch</div><h2 className="mt-2 text-lg font-black text-amber-950">May 2025 and May 2026 settlements are partial</h2><p className="mt-2 text-sm leading-6 text-amber-950">The pouring record shows deliveries for both months, while the society payment ledger records partial settlement. The difference is retained as an application exception for officer review.</p><div className="mt-4 grid grid-cols-2 gap-2"><Mismatch label="Pouring record" value="Deliveries present"/><Mismatch label="Payment ledger" value="Partial settlement" warning/></div><div className="mt-4 text-xs leading-5 text-amber-900">Required before decision: society confirmation and borrower explanation.</div></div>
    </section>

    <section className="overflow-hidden rounded-lg border border-slate-300 bg-white"><div className="border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="flex items-center gap-2 text-sm font-black"><CalendarDays size={16} className="text-violet-700"/>Proposed milk-cycle repayment schedule</h2><p className="mt-1 text-xs text-slate-500">Collections follow observed society settlement capacity instead of a flat monthly instalment.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-xs"><thead className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Cycle</th><th className="px-3 py-3">Observed pattern</th><th className="px-3 py-3">Indicative monthly milk receipts</th><th className="px-3 py-3">Proposed collection</th></tr></thead><tbody>{milkCycle.map(([cycle,pattern,receipts,collection])=><tr key={cycle} className="border-b border-slate-100 last:border-0"><th className="px-4 py-3">{cycle}</th><td className="px-3 py-3 text-slate-600">{pattern}</td><td className="px-3 py-3 font-mono font-bold">{receipts}</td><td className="px-3 py-3 font-semibold">{collection}</td></tr>)}</tbody></table></div><div className="border-t border-slate-200 bg-slate-50 p-3 text-[10px] text-slate-600">Indicative schedule for appraisal. Final amount, tenor and repayment terms require bank approval and borrower acceptance.</div></section>

    <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]"><div className="rounded-lg border border-slate-300 bg-white p-4 text-xs leading-5 text-slate-700"><div className="font-black text-slate-950">Product reference</div><div className="mt-2"><Fact id="kcc.subvention"/></div><div className="mt-2"><Fact id="agri.collateralfree"/></div></div><div className="rounded-lg border border-violet-300 bg-violet-50 p-4"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-sm font-black text-violet-950">Convert reviewed lead to an application</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-violet-900">Creates a KCC-AH application with evidence lineage and the two settlement mismatches attached. No sanction or eligibility outcome is created.</p></div>{created?<Link href="/2/clusters/annapurna" className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Check size={15}/>Return to origination queue <ArrowRight size={14}/></Link>:<button type="button" onClick={create} className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-black text-white hover:bg-slate-800"><FilePlus2 size={15}/>Create KCC-AH Application</button>}</div>{created?<div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-900">Application KCCAH/AP/2026/08112 created · Pending KYC and credit appraisal</div>:null}</div></section>
  </div>;
}

function Mismatch({label,value,warning=false}:{label:string;value:string;warning?:boolean}) {return <div className={`rounded border p-3 ${warning?"border-red-200 bg-red-50":"border-amber-200 bg-white/60"}`}><div className="text-[9px] font-black uppercase tracking-wider text-slate-500">{label}</div><div className={`mt-1 text-xs font-bold ${warning?"text-red-800":"text-slate-900"}`}>{value}</div></div>}
