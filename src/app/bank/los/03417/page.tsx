import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, Landmark, UserRound } from "lucide-react";
import { Shell } from "@/components/presenter/Shell";
import { PreScreenTiles } from "@/components/bank/PreScreenTiles";

export default function Los03417Page() {
  return <Shell><div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-bank">Bank / LOS · pre-screen</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Application `03417`</h1><p className="mt-2 max-w-3xl text-slate-600">Sri Annapurna Foods Private Limited · Kuppam, Chittoor · synthetic application record.</p></div><Link href="/bank/research/03417" className="inline-flex items-center gap-2 rounded bg-violet-700 px-4 py-2 text-sm font-bold text-white hover:bg-violet-800">Run institutional research <ArrowRight size={16} /></Link></div>
    <div className="card overflow-hidden"><div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">{[
      [<FileText size={16} />, "ARN", "LOS-AP-2026-03417"], [<ClipboardCheck size={16} />, "Product", "MSME term loan + WC"], [<Landmark size={16} />, "Facility", "₹3.25 Cr TL + ₹0.50 Cr WC"], [<UserRound size={16} />, "Authority", "RCPC · one-up DoP route"],
    ].map(([icon, label, value]) => <div key={label as string} className="bg-white p-4"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">{icon}{label}</div><div className="mt-2 text-sm font-bold text-slate-900">{value}</div></div>)}</div></div>
    <GrammarStrip />
    <div className="flex items-end justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-violet-700">Evidence intake</div><h2 className="mt-1 text-2xl font-bold">AI pre-screen tiles</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">8 checks · all provenance attached</span></div>
    <PreScreenTiles />
    <div className="grid gap-3 lg:grid-cols-3"><div className="card p-4"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Application facts</div><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between gap-3"><span className="text-slate-500">Promoter</span><b>K. Venkataramana, 47</b></div><div className="flex justify-between gap-3"><span className="text-slate-500">Existing unit</span><b>6 TPD · 9 years</b></div><div className="flex justify-between gap-3"><span className="text-slate-500">Security</span><b>Land + project assets</b></div></div></div><div className="card p-4 lg:col-span-2"><div className="text-xs font-bold uppercase tracking-widest text-amber-700">Open evidence question</div><p className="mt-3 text-sm leading-6 text-slate-700">The fabric can assemble the file, but it cannot turn three inconsistent turnover signals into a single truth. That conflict is routed forward into appraisal.</p></div></div>
  </div></Shell>;
}

function GrammarStrip() {
  return <div className="grid gap-px overflow-hidden rounded border border-slate-200 bg-slate-200 sm:grid-cols-4"><div className="bg-blue-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Bank system</div><div className="mt-1 text-sm font-semibold">Owns application state</div></div><div className="bg-violet-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-violet-700">Intelligence fabric</div><div className="mt-1 text-sm font-semibold">Prepares and reconciles</div></div><div className="bg-teal-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Human authority</div><div className="mt-1 text-sm font-semibold">Challenges and decides</div></div><div className="bg-emerald-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Evidence</div><div className="mt-1 text-sm font-semibold">Source + consent + time</div></div></div>;
}
