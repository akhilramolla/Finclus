"use client";

import { useState } from "react";
import { Fact } from "@/components/governance/Fact";
import { stress } from "@/lib/credit";

const facilities = [2, 2.7, 3.25, 3.75];

export function FacilitySlider() {
  const [facilityCr, setFacilityCr] = useState(3.25);
  const result = stress({ facilityCr });
  return <section className="card p-5">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-widest text-teal-700">Logged human action</div><h3 className="mt-1 text-lg font-bold">Facility modifier</h3><p className="mt-1 max-w-2xl text-sm text-slate-600">Move the requested term facility. The projection recomputes; the model cannot move the limit itself.</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${result.policyPass ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{result.policyPass ? "POLICY PASS" : "CREDIT REVIEW"}</span></div>
    <div className="mt-5 flex items-center gap-4"><span className="tabnums text-sm font-bold text-slate-500">₹2.00 Cr</span><input aria-label="Term facility in crore" type="range" min="2" max="3.75" step="0.05" value={facilityCr} onChange={(event) => setFacilityCr(Number(event.target.value))} className="h-2 min-w-0 flex-1 accent-teal-700" /><span className="tabnums text-sm font-bold text-slate-500">₹3.75 Cr</span><output className="tabnums min-w-[86px] text-right text-xl font-bold text-slate-950">₹{facilityCr.toFixed(2)} Cr</output></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-4"><Metric label="Min DSCR" value={`${result.minDscr.toFixed(2)}×`} /><Metric label="Avg DSCR" value={`${result.averageDscr.toFixed(2)}×`} /><Metric label="D:E" value={`${result.debtEquity.toFixed(2)}×`} /><Metric label="Promoter margin" value={`${result.promoterMargin.toFixed(1)}%`} /></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm"><span className="text-slate-500">Funding gap</span><b className="ml-2 tabnums">₹{result.fundingGapCr.toFixed(2)} Cr</b></div><div className="rounded border border-teal-200 bg-teal-50 p-3 text-sm text-teal-950"><b>{result.recommendation}</b><div className="mt-1 text-xs"><Fact id="rbi.dl2025.limit" /></div></div></div>
  </section>;
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded border border-slate-200 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</div><div className="mt-1 tabnums text-lg font-bold text-slate-950">{value}</div></div>; }
