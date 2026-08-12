import Link from "next/link";
import {AlertTriangle, ArrowRight, CheckCircle2, FileText, Landmark, ShieldCheck} from "lucide-react";
import {Fact} from "@/components/governance/Fact";

const repayment = [
  ["15 Apr 2026", "₹6.42 lakh", "₹6.42 lakh", "Paid", "12 Apr 2026"],
  ["15 May 2026", "₹6.42 lakh", "₹6.42 lakh", "Paid", "14 May 2026"],
  ["15 Jun 2026", "₹6.42 lakh", "₹6.42 lakh", "Paid", "13 Jun 2026"],
  ["15 Jul 2026", "₹6.42 lakh", "₹6.42 lakh", "Paid", "14 Jul 2026"],
  ["15 Aug 2026", "₹6.42 lakh", "—", "Due", "—"]
] as const;

const covenants = [
  ["Quarterly stock statement", "31 Jul 2026", "Received", "LMS-DOC-SS-Q1-26"],
  ["GST filing continuity", "20 Jul 2026", "Exception", "GST-3B-FY26-06"],
  ["Insurance on primary security", "31 Mar 2027", "Current", "POL-AP-44281"],
  ["No additional charge without consent", "Continuous", "Review", "MCA-CHARGE-2026-09"],
  ["Buyer concentration ≤ 40%", "Monthly", "Exception", "AA-03417-BUYER-MIX-06"]
] as const;

export function AccountWorkspace() {
  return <div className="space-y-4 pb-16 lg:pb-0">
    <header className="rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div><div className="flex flex-wrap items-center gap-2"><span className="rounded bg-blue-50 px-2 py-1 font-mono text-[10px] font-bold text-blue-800">LAN MSME/AP/2026/03417</span><span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">Current · 0 DPD</span></div><h1 className="mt-2 text-2xl font-black tracking-tight">Sri Annapurna Foods Private Limited</h1><p className="mt-1 text-xs text-slate-600">Term loan and working-capital account · RCPC Tirupati · Kuppam branch</p></div>
        <Link href="/2/early-warning/03417" className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-black text-white hover:bg-slate-800">Open monitoring review <ArrowRight size={15}/></Link>
      </div>
      <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-5"><AccountMetric label="Sanctioned" value="₹3.75 Cr"/><AccountMetric label="Principal outstanding" value="₹3.12 Cr"/><AccountMetric label="Available WC" value="₹18.40 lakh"/><AccountMetric label="Next instalment" value="₹6.42 lakh · 15 Aug"/><AccountMetric label="Asset class" value="Standard"/></div>
    </header>

    <section className="grid gap-4 xl:grid-cols-[1.45fr_.8fr]">
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3"><div><h2 className="flex items-center gap-2 text-sm font-black"><Landmark size={16} className="text-blue-700"/>Repayment ledger</h2><p className="mt-1 text-xs text-slate-500">Term loan · 84 monthly instalments after 12-month moratorium</p></div><span className="text-xs font-bold text-emerald-700">4 / 4 instalments honoured</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-xs"><thead className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Due date</th><th className="px-3 py-3">Demand</th><th className="px-3 py-3">Received</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Value date</th></tr></thead><tbody>{repayment.map(([due,demand,received,status,date])=><tr key={due} className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 font-semibold">{due}</td><td className="px-3 py-3 font-mono">{demand}</td><td className="px-3 py-3 font-mono">{received}</td><td className="px-3 py-3"><Status value={status}/></td><td className="px-3 py-3 text-slate-600">{date}</td></tr>)}</tbody></table></div>
      </div>
      <div className="rounded-lg border border-slate-300 bg-white p-4"><div className="flex items-center gap-2 text-sm font-black"><FileText size={16} className="text-blue-700"/>Facility terms</div><dl className="mt-3 divide-y divide-slate-100 text-xs"><Term label="Term loan" value="₹3.25 Cr"/><Term label="Working capital" value="₹0.50 Cr"/><Term label="Interest" value="9.90% p.a. · monthly rests"/><Term label="Tenor" value="7 years"/><Term label="Primary security" value="Plant, machinery and current assets"/><Term label="Collateral" value="Industrial land and building"/></dl><div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-950"><CheckCircle2 size={14} className="mr-1 inline"/>Servicing is current. Monitoring exceptions do not alter DPD or asset classification.</div></div>
    </section>

    <section className="overflow-hidden rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3"><div><h2 className="flex items-center gap-2 text-sm font-black"><ShieldCheck size={16} className="text-blue-700"/>Covenant and monitoring register</h2><p className="mt-1 text-xs text-slate-500">Servicing status and operating controls are recorded separately.</p></div><span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-amber-800">3 items require review</span></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Control</th><th className="px-3 py-3">Test date</th><th className="px-3 py-3">Result</th><th className="px-3 py-3">Evidence artefact</th></tr></thead><tbody>{covenants.map(([control,date,result,evidence])=><tr key={control} className="border-b border-slate-100 last:border-0"><th className="px-4 py-3 font-semibold">{control}</th><td className="px-3 py-3 text-slate-600">{date}</td><td className="px-3 py-3"><Status value={result}/></td><td className="px-3 py-3 font-mono text-[11px] text-slate-600">{evidence}</td></tr>)}</tbody></table></div>
    </section>

    <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800"><AlertTriangle size={15}/>Monitoring action</div><h2 className="mt-2 text-lg font-black text-amber-950">Reconcile operating exceptions before the next account review</h2><p className="mt-1 text-sm leading-6 text-amber-950">Payment performance remains current, while GST cadence, a new MCA charge and buyer concentration challenge sanction-time assumptions. Open early warning to assign an RM investigation without changing the servicing classification.</p></div>
      <div className="rounded-lg border border-slate-300 bg-white p-4 text-xs leading-5 text-slate-700"><div className="font-black text-slate-950">Classification reference</div><div className="mt-2"><Fact id="rbi.sma"/></div></div>
    </section>
  </div>;
}

function AccountMetric({label,value}:{label:string;value:string}) {return <div className="bg-slate-50 px-4 py-3"><div className="text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 font-mono text-sm font-bold text-slate-900">{value}</div></div>}
function Term({label,value}:{label:string;value:string}) {return <div className="flex items-start justify-between gap-4 py-2.5"><dt className="text-slate-500">{label}</dt><dd className="max-w-[62%] text-right font-semibold text-slate-900">{value}</dd></div>}
function Status({value}:{value:string}) {const caution=value==="Exception"||value==="Review"||value==="Due"; return <span className={`inline-flex rounded px-2 py-1 text-[10px] font-black uppercase tracking-wider ${caution?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}`}>{value}</span>}
