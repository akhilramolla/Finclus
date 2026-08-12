import { CheckCircle2, FileCheck2, Landmark, ShieldCheck } from "lucide-react";
import { Fact } from "@/components/governance/Fact";

const checks = [
  ["EMI status", "Current", "Scheduled instalment received"],
  ["Mandate", "NACH honoured", "No return in the servicing ledger"],
  ["Covenants", "Met", "Reporting and security covenants on file"],
  ["Tranches", "3 / 3", "All sanctioned tranches disbursed"]
] as const;

export function LmsView() {
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><div className="text-xs font-bold uppercase tracking-[.22em] accent-bank">LMS / servicing control</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">LAN `MSME/AP/2026/03417`</h1><p className="mt-2 max-w-3xl text-slate-600">The servicing system is doing exactly what it should: recording a healthy account without inventing a risk event.</p></div>
      <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-800">Servicing ledger · live view</div>
    </div>
    <section className="rounded border-2 border-emerald-300 bg-emerald-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5"><div className="flex items-center gap-4"><div className="rounded-full bg-emerald-600 p-3 text-white"><CheckCircle2 size={30} /></div><div><div className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700">Bank system status</div><div className="mt-1 text-5xl font-black tracking-tight text-emerald-950">CURRENT</div></div></div><div className="text-right"><div className="tabnums text-3xl font-bold text-emerald-950">0 DPD</div><div className="mt-1 text-sm text-emerald-800">Standard / <Fact id="rbi.sma" /></div></div></div>
      <div className="mt-6 grid min-h-[92px] gap-3 sm:grid-cols-4">{checks.map(([label, value, detail]) => <div key={label} className="rounded border border-emerald-200 bg-white/80 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">{label}</div><div className="mt-1 font-bold text-emerald-950">{value}</div><div className="mt-1 text-xs text-slate-600">{detail}</div></div>)}</div>
    </section>
    <div className="grid gap-3 md:grid-cols-3"><div className="card p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500"><Landmark size={15} /> CBS / LMS ledger</div><div className="mt-3 text-lg font-bold">No delinquency event</div><p className="mt-1 text-sm text-slate-600">The account is correctly green on payment behaviour.</p></div><div className="card p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500"><ShieldCheck size={15} /> Control evidence</div><div className="mt-3 text-lg font-bold">Covenants met</div><p className="mt-1 text-sm text-slate-600">The latest servicing packet is complete and traceable.</p></div><div className="card p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500"><FileCheck2 size={15} /> Next layer</div><div className="mt-3 text-lg font-bold text-violet-800">Run EWS scan</div><p className="mt-1 text-sm text-slate-600">Payment current does not mean the operating assumptions are current.</p></div></div>
    <div className="rounded border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-950"><b>Presenter cue:</b> the LMS has no reason to turn this account red. The intelligence fabric asks a different question: what changed before the first missed payment?</div>
  </div>;
}
