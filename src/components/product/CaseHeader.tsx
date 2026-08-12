import Link from "next/link";
import {AlertTriangle, Clock3, MapPin, UserRound} from "lucide-react";
import {anchorCase} from "@/content/case";

export function CaseHeader({stage, action}:{stage:string; action?:React.ReactNode}) {
  return <section className="rounded-lg border border-slate-300 bg-white">
    <div className="flex flex-wrap items-start justify-between gap-4 p-4">
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded bg-blue-50 px-2 py-1 font-mono text-[10px] font-bold text-blue-800">MSME/AP/2026/03417</span><span className="rounded bg-violet-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-violet-800">{stage}</span><span className="rounded bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800">3 exceptions</span></div><h1 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">{anchorCase.entity}</h1><div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600"><span className="flex items-center gap-1"><MapPin size={13}/>{anchorCase.location}</span><span className="flex items-center gap-1"><UserRound size={13}/>K. Rao · RCPC Tirupati</span><span className="flex items-center gap-1"><Clock3 size={13}/>18h SLA remaining</span></div></div>
      <div className="flex items-center gap-2">{action}</div>
    </div>
    <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-4"><CaseMetric label="Facility" value="₹3.25 Cr TL + ₹0.50 Cr WC"/><CaseMetric label="Project cost" value="₹5.00 Cr"/><CaseMetric label="Promoter margin" value="25.0%"/><CaseMetric label="Attention" value="Turnover reconciliation" warning/></div>
  </section>;
}

function CaseMetric({label,value,warning=false}:{label:string;value:string;warning?:boolean}) {return <div className="bg-slate-50 px-4 py-2.5"><div className="text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className={`mt-1 flex items-center gap-1.5 text-xs font-bold ${warning?"text-amber-800":"text-slate-800"}`}>{warning&&<AlertTriangle size={13}/>}<span className="tabnums">{value}</span></div></div>}
