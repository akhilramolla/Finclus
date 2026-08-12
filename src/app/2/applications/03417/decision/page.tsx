"use client";

import Link from "next/link";
import {ArrowRight, Check, CheckCircle2, LockKeyhole, ShieldCheck, Stamp} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {useApplicationWorkflow} from "@/components/product/application/application-store";
import {useProductStore} from "@/lib/product-store";

const baseConditions = [
  {id:"documents", label:"Executed sanction and facility documents", owner:"Operations"},
  {id:"security", label:"Security creation and insurance complete", owner:"Documentation"},
  {id:"materials", label:"Raw-material escalation clause accepted", owner:"Credit"},
  {id:"grant", label:"CEFPPC sanction letter before subsidy-linked drawdown", owner:"Borrower"},
];

export default function DecisionPage() {
  const recommendationSubmitted = useProductStore(state=>state.recommendationSubmitted);
  const conflictEscalated = useProductStore(state=>state.conflictEscalated);
  const retracted = useProductStore(state=>state.retracted);
  const sanctioned = useProductStore(state=>state.sanctioned);
  const act = useProductStore(state=>state.act);
  const recommendation = useApplicationWorkflow(state=>state.recommendation);
  const cpVerified = useApplicationWorkflow(state=>state.cpVerified);
  const checkerApproved = useApplicationWorkflow(state=>state.checkerApproved);
  const toggleCp = useApplicationWorkflow(state=>state.toggleCp);
  const approveChecker = useApplicationWorkflow(state=>state.approveChecker);
  const conditions = retracted?[...baseConditions.slice(0,2),{id:"land",label:"Land-use conversion for survey 214/2B verified",owner:"Legal"},...baseConditions.slice(2)]:baseConditions;
  const approvalReady = recommendationSubmitted&&conflictEscalated&&retracted;

  const approve = () => {
    if (!approvalReady||checkerApproved) return;
    approveChecker();
    act("Credit recommendation approved by checker M. Iyer");
  };
  const sanction = () => {
    if (!checkerApproved||sanctioned) return;
    act(`Facility sanctioned at ₹${(recommendation?.facilityCr??3.25).toFixed(2)} Cr term loan plus ₹0.50 Cr working capital`, {sanctioned:true});
  };

  return <ApplicationWorkspace stage={sanctioned?"Sanctioned":checkerApproved?"Approved":"Decision pending"} action={sanctioned?<Link href="/2/accounts/03417" className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-xs font-bold text-white">Open account <ArrowRight size={14}/></Link>:undefined}>
    <div className="grid gap-4 xl:grid-cols-3">
      <section className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-blue-700"><Stamp size={15}/> Delegation of powers</div><h2 className="mt-2 text-lg font-black">RCPC one-up authority</h2><dl className="mt-4 space-y-3 text-xs"><DecisionRow label="Facility" value={`₹${(recommendation?.facilityCr??3.25).toFixed(2)} Cr TL + ₹0.50 Cr WC`}/><DecisionRow label="Recommending officer" value="K. Rao · Scale III"/><DecisionRow label="Approving officer" value="M. Iyer · Scale IV"/><DecisionRow label="Route reason" value="Projected-turnover deviation"/></dl></section>
      <section className="rounded-lg border border-slate-300 bg-white p-5 xl:col-span-2"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-violet-700"><ShieldCheck size={15}/> Maker-checker</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><ApprovalCard role="Maker" officer="K. Rao" complete={recommendationSubmitted} detail={recommendation?`${recommendation.recommendation} · min DSCR ${recommendation.minDscr.toFixed(2)}x`:"Recommendation required in Appraisal"}/><ApprovalCard role="Checker" officer="M. Iyer" complete={checkerApproved} detail={checkerApproved?"Recommendation and exceptions reviewed":"Independent approval pending"}/></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">Checker approval requires a maker recommendation, escalated turnover exception and governed retraction.</p><button onClick={approve} disabled={!approvalReady||checkerApproved} className="rounded-md bg-violet-700 px-4 py-2.5 text-xs font-bold text-white disabled:bg-slate-300">{checkerApproved?"Checker approved":"Approve as checker"}</button></div>{!approvalReady?<div className="mt-3 rounded-md bg-amber-50 p-3 text-xs text-amber-900">Outstanding: {[!recommendationSubmitted&&"maker recommendation",!conflictEscalated&&"exception escalation",!retracted&&"land-use correction"].filter(Boolean).join(", ")}.</div>:null}</section>
    </div>
    <section className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-[10px] font-black uppercase tracking-[.16em] text-teal-700">Conditions precedent</div><h2 className="mt-1 text-lg font-black">Disbursement control tracker</h2></div><span className="text-xs font-bold text-slate-500">{cpVerified.filter(id=>conditions.some(condition=>condition.id===id)).length} of {conditions.length} verified</span></div><div className="mt-4 grid gap-2 md:grid-cols-2">{conditions.map(condition=>{const checked=cpVerified.includes(condition.id); return <button key={condition.id} onClick={()=>{toggleCp(condition.id); act(`${condition.label} marked ${checked?"open":"verified"}`)}} className="grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded-md border border-slate-200 p-3 text-left"><span className={`flex h-5 w-5 items-center justify-center rounded border ${checked?"border-emerald-600 bg-emerald-600 text-white":"border-slate-300"}`}>{checked?<Check size={13}/>:null}</span><span className="text-xs font-bold">{condition.label}</span><span className="text-[9px] font-black uppercase text-slate-400">{condition.owner}</span></button>})}</div><p className="mt-3 flex items-center gap-2 text-xs text-slate-500"><LockKeyhole size={13}/> Open CPs block disbursement, not the sanction decision.</p></section>
    <section className={`rounded-lg border p-5 ${sanctioned?"border-emerald-300 bg-emerald-50":"border-slate-300 bg-white"}`}><div className="flex flex-wrap items-center justify-between gap-4"><div>{sanctioned?<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-emerald-700"><CheckCircle2 size={15}/> Sanction recorded</div>:<div className="text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Final authority action</div>}<h2 className="mt-1 text-xl font-black">{sanctioned?`₹${(recommendation?.facilityCr??3.25).toFixed(2)} Cr term loan + ₹0.50 Cr working capital`:"Record sanction decision"}</h2><p className="mt-1 text-sm text-slate-600">{sanctioned?"The account handoff is available; disbursement remains subject to the CP tracker.":"This action is available only after independent checker approval."}</p></div>{sanctioned?<Link href="/2/accounts/03417" className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white">Continue to account 03417 <ArrowRight size={16}/></Link>:<button onClick={sanction} disabled={!checkerApproved} className="rounded-md bg-blue-700 px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300">Sanction facility</button>}</div></section>
  </ApplicationWorkspace>;
}

function DecisionRow({label,value}:{label:string;value:string}) {return <div className="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-500">{label}</dt><dd className="text-right font-bold">{value}</dd></div>}
function ApprovalCard({role,officer,complete,detail}:{role:string;officer:string;complete:boolean;detail:string}) {return <div className={`rounded-md border p-4 ${complete?"border-emerald-200 bg-emerald-50":"border-slate-200 bg-slate-50"}`}><div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{role}</span><span className={`rounded px-2 py-1 text-[9px] font-black ${complete?"bg-emerald-700 text-white":"bg-slate-200 text-slate-600"}`}>{complete?"Complete":"Pending"}</span></div><div className="mt-2 text-sm font-black">{officer}</div><p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p></div>}
