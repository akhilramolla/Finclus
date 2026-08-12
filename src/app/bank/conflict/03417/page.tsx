"use client";

import Link from "next/link";
import { ArrowRight, Eye, Route } from "lucide-react";
import { Fact } from "@/components/governance/Fact";
import { Shell } from "@/components/presenter/Shell";
import { useDemoStore } from "@/lib/store";

const sources = [["Audited financials", "₹6.90 Cr", "High", "AUD-FY25-03417"], ["GSTN · GSTR-3B", "₹8.20 Cr", "High", "GST-3B-FY25-03417"], ["Bank credits via AA", "₹7.80 Cr", "Medium", "AA-03417-2026"]];

export default function Conflict03417Page() {
  const set = useDemoStore(s => s.set);
  return <Shell><div className="space-y-5"><div className="rounded border border-red-300 bg-slate-950 p-6 text-white sm:p-10"><div className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">WOW 1 · source conflict</div><h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">I cannot safely resolve this discrepancy.</h1><p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">Three sources disagree by <b className="text-amber-300">18.8%</b>, above the <b className="text-amber-300">10% policy tolerance</b>. This requires a credit officer.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => set({ governance: true })} className="inline-flex items-center gap-2 rounded bg-white px-4 py-3 text-sm font-bold text-slate-950"><Eye size={16} /> Show evidence</button><Link href="/bank/appraisal/03417" className="inline-flex items-center gap-2 rounded border border-slate-500 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"><Route size={16} /> Route to credit review</Link></div></div><div className="grid gap-3 md:grid-cols-3">{sources.map(([source, value, confidence, artefact]) => <div key={source} className="card p-5"><div className="flex items-center justify-between gap-2"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">{source}</div><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{confidence}</span></div><div className="mt-5 tabnums text-3xl font-bold">{value}</div><div className="mt-3 text-xs text-slate-500"><span className="status-dot" />{artefact} · FY25</div></div>)}</div><div className="grid gap-3 lg:grid-cols-2"><div className="rounded border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><b>Transformation held back</b><br />The fabric preserves each source, consent path and timestamp. It does not average them into a fourth number. Owner: credit officer K. Rao.</div><div className="rounded border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700"><b className="text-slate-950">Governance posture</b><br /><Fact id="rbi.mrm.draft" /></div></div></div></Shell>;
}
