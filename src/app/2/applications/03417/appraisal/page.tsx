"use client";

import Link from "next/link";
import {ArrowRight, CheckCircle2, Gauge, Save} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {useApplicationWorkflow} from "@/components/product/application/application-store";
import {stress} from "@/lib/credit";
import {useProductStore} from "@/lib/product-store";

export default function AppraisalPage() {
  const facilityCr = useApplicationWorkflow(state => state.facilityCr);
  const revenueStress = useApplicationWorkflow(state => state.revenueStress);
  const materialStress = useApplicationWorkflow(state => state.materialStress);
  const grantDelayed = useApplicationWorkflow(state => state.grantDelayed);
  const setAppraisal = useApplicationWorkflow(state => state.setAppraisal);
  const saveRecommendation = useApplicationWorkflow(state => state.saveRecommendation);
  const submitted = useProductStore(state => state.recommendationSubmitted);
  const act = useProductStore(state => state.act);
  const result = stress({facilityCr,revenueStress,materialStress,grantDelayed});

  const submit = () => {
    saveRecommendation({facilityCr,revenueStress,materialStress,grantDelayed,minDscr:result.minDscr,recommendation:result.recommendation,submittedAt:new Date().toISOString()});
    act(`Credit recommendation submitted at ₹${facilityCr.toFixed(2)} Cr with minimum DSCR ${result.minDscr.toFixed(2)}x`, {recommendationSubmitted:true});
  };

  return <ApplicationWorkspace stage={submitted?"Recommendation submitted":"Credit appraisal"} action={<Link href="/2/applications/03417/exceptions" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-bold">Review exceptions <ArrowRight size={14}/></Link>}>
    <section className="rounded-lg border border-slate-300 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-blue-700"><Gauge size={15}/> Repayment projection</div><h2 className="mt-1 text-xl font-black">Facility and downside assessment</h2><p className="mt-1 text-sm text-slate-600">Every value is recalculated by the shared credit model.</p></div><span className={`rounded px-3 py-1.5 text-xs font-black ${result.policyPass?"bg-emerald-50 text-emerald-700":"bg-red-50 text-red-700"}`}>{result.policyPass?"DSCR floor met":"Below DSCR floor"}</span></div>
      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center gap-4"><label htmlFor="facility" className="text-xs font-black text-slate-700">Term facility</label><span className="font-mono text-xs text-slate-500">₹2.00 Cr</span><input id="facility" type="range" min="2" max="3.75" step="0.05" value={facilityCr} onChange={event=>setAppraisal({facilityCr:Number(event.target.value)})} className="min-w-48 flex-1 accent-blue-700"/><span className="font-mono text-xs text-slate-500">₹3.75 Cr</span><output className="min-w-24 text-right font-mono text-lg font-black">₹{facilityCr.toFixed(2)} Cr</output></div></div>
      <div className="mt-4 grid gap-2 md:grid-cols-3"><StressToggle label="Revenue reduced 15%" checked={revenueStress} onClick={()=>setAppraisal({revenueStress:!revenueStress})}/><StressToggle label="EBITDA margin reduced 10 pp" checked={materialStress} onClick={()=>setAppraisal({materialStress:!materialStress})}/><StressToggle label="CEFPPC grant delayed" checked={grantDelayed} onClick={()=>setAppraisal({grantDelayed:!grantDelayed})}/></div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5"><Metric label="Minimum DSCR" value={`${result.minDscr.toFixed(2)}x`} warning={!result.policyPass}/><Metric label="Average DSCR" value={`${result.averageDscr.toFixed(2)}x`}/><Metric label="Debt / equity" value={`${result.debtEquity.toFixed(2)}x`}/><Metric label="Promoter margin" value={`${result.promoterMargin.toFixed(1)}%`}/><Metric label="Funding gap" value={`₹${result.fundingGapCr.toFixed(2)} Cr`} warning={result.fundingGapCr>0}/></div>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[900px] text-right text-xs"><thead className="border-y border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-2 text-left">Year</th><th className="px-3 py-2">Revenue</th><th className="px-3 py-2">EBITDA margin</th><th className="px-3 py-2">EBITDA</th><th className="px-3 py-2">Interest</th><th className="px-3 py-2">Principal</th><th className="px-3 py-2">PAT</th><th className="px-3 py-2">Debt service</th><th className="px-3 py-2">DSCR</th><th className="px-3 py-2">Closing balance</th></tr></thead><tbody>{result.years.map(year=><tr key={year.year} className="border-b border-slate-100"><th className="px-3 py-2.5 text-left">Year {year.year}</th><td className="px-3 py-2.5 font-mono">₹{year.revenueCr.toFixed(2)}</td><td className="px-3 py-2.5 font-mono">{(year.ebitdaMargin*100).toFixed(1)}%</td><td className="px-3 py-2.5 font-mono">₹{year.ebitdaCr.toFixed(2)}</td><td className="px-3 py-2.5 font-mono">₹{year.interestCr.toFixed(2)}</td><td className="px-3 py-2.5 font-mono">₹{year.principalRepaymentCr.toFixed(2)}</td><td className="px-3 py-2.5 font-mono">₹{year.patCr.toFixed(2)}</td><td className="px-3 py-2.5 font-mono">₹{year.debtServiceCr.toFixed(2)}</td><td className={`px-3 py-2.5 font-mono font-black ${year.dscr<1.25?"text-red-700":"text-emerald-700"}`}>{year.dscr.toFixed(2)}x</td><td className="px-3 py-2.5 font-mono">₹{year.closingBalanceCr.toFixed(2)}</td></tr>)}</tbody></table></div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-md border border-blue-200 bg-blue-50 p-4"><div><div className="text-[10px] font-black uppercase tracking-wider text-blue-700">Model recommendation</div><div className="mt-1 text-sm font-black text-blue-950">{result.recommendation}</div><p className="mt-1 text-xs text-blue-800">Facility changes require an explicit recorded officer submission.</p></div><button onClick={submit} className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-xs font-bold text-white">{submitted?<CheckCircle2 size={15}/>:<Save size={15}/>} {submitted?"Update recommendation":"Submit recommendation"}</button></div>
    </section>
  </ApplicationWorkspace>;
}

function StressToggle({label,checked,onClick}:{label:string;checked:boolean;onClick:()=>void}) {return <button aria-pressed={checked} onClick={onClick} className={`flex items-center justify-between rounded-md border p-3 text-left text-xs font-bold ${checked?"border-violet-400 bg-violet-50 text-violet-950":"border-slate-200 text-slate-700"}`}><span>{label}</span><span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${checked?"bg-violet-700":"bg-slate-300"}`}><span className={`h-4 w-4 rounded-full bg-white transition-transform ${checked?"translate-x-4":""}`}/></span></button>}
function Metric({label,value,warning=false}:{label:string;value:string;warning?:boolean}) {return <div className="rounded-md border border-slate-200 p-3"><div className="text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className={`mt-1 font-mono text-base font-black ${warning?"text-red-700":"text-slate-900"}`}>{value}</div></div>}
