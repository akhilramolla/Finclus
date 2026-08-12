"use client";

import { useEffect, useState } from "react";
import { Check, CircleDashed, Database, Eye, Leaf, Users } from "lucide-react";
import { Fact } from "@/components/governance/Fact";
import { clusterMandals, clusterNodes, clusterSummary, type ClusterMandal } from "@/content/cluster";
import { PslImpact } from "@/components/portfolio/PslImpact";

const phaseCounts = [0, 64, 152, 239, clusterSummary.evidenceableCount];
const phaseLabels = ["Ready", "Procurement ledger read", "Cross-source matches", "Evidence review", "Underwritable cluster"];

export function ClusterMap() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase >= 4) return;
    const timer = window.setTimeout(() => setPhase((current) => Math.min(4, current + 1)), 650);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const visibleEvidence = phaseCounts[phase];
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-fabric">Portfolio / rural payload</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">WOW 4 · One sanction, a village credit cluster</h1><p className="mt-2 max-w-3xl text-slate-600">We just financed one MSME. Now watch what the same evidence does across its procurement network.</p></div><button onClick={() => setPhase(4)} className="inline-flex items-center gap-2 rounded border border-violet-300 bg-white px-4 py-2 text-sm font-bold text-violet-800 hover:bg-violet-50"><Eye size={16} /> Show result</button></div>
    <div className="rounded border border-violet-200 bg-violet-50 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="rounded-full bg-violet-700 p-2 text-white"><Database size={18} /></div><div><div className="text-xs font-bold uppercase tracking-widest text-violet-700">Deterministic evidence trace · {phase + 1} / 5</div><div className="mt-1 font-bold text-violet-950">{phaseLabels[phase]}</div></div></div><div className="flex gap-1">{phaseCounts.map((_, index) => <span key={index} className={`h-2 w-8 rounded-full ${index <= phase ? "bg-violet-700" : "bg-violet-200"}`} />)}</div></div><div className="mt-3 text-sm leading-6 text-violet-950">Procurement ledger → land records → milk-society and mandi records → PM-KISAN → AA where consent exists. No map API and no random sampling.</div></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{clusterMandals.map((mandal) => <MandalStat key={mandal} mandal={mandal} />)}</div>
    <section className="card overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-4"><div><div className="flex items-center gap-2 text-sm font-bold"><CircleDashed size={17} className="text-violet-700" />Map-free cluster visualisation</div><p className="mt-1 text-xs text-slate-500">Each node is one supplier in the procurement ledger. Green means evidenceable, grey means the honest counterfactual.</p></div><div className="flex gap-3 text-xs font-semibold"><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />Underwritable</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full border border-slate-400 bg-white" />Not evidenced</span></div></div><div className="grid gap-4 p-4 lg:grid-cols-4">{clusterMandals.map((mandal) => <MandalNodes key={mandal} mandal={mandal} visibleEvidence={visibleEvidence} />)}</div></section>
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><Metric label="Evidenceable" value={`${visibleEvidence} / ${clusterSummary.supplierCount}`} detail="SIMULATED" tone="green" /><Metric label="Pipeline" value="₹4.68 Cr" detail="SIMULATED" tone="blue" /><Metric label="Average ticket" value="₹1.63 lakh" detail="SIMULATED" tone="blue" /><Metric label="New to credit" value="196" detail="SIMULATED" tone="violet" /><Metric label="Women" value="171" detail="SIMULATED" tone="teal" /></section>
    <PslImpact />
    <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]"><div className="rounded border border-amber-300 bg-amber-50 p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800"><Users size={15} />The honest counterfactual</div><div className="mt-3 text-3xl font-black text-amber-950">25 not evidenced</div><p className="mt-2 text-sm leading-6 text-amber-950">No digitised land record, no consent, or tenant cultivator without a record of rights. The fabric does not turn absence of evidence into a clean approval.</p><div className="mt-4 text-xs leading-5 text-amber-900"><Fact id="uli.adoption" /></div></div><div className="rounded border border-teal-200 bg-teal-50 p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-800"><Leaf size={15} />Collateral framing</div><p className="mt-3 text-sm leading-6 text-teal-950">At the simulated average ticket, these cases sit inside the agricultural collateral-free position and the mandatory MSE position. Eligibility and repayment capacity still require evidence.</p><div className="mt-3 space-y-2 text-xs leading-5 text-teal-950"><Fact id="agri.collateralfree" /><Fact id="rbi.msme.collateral" /></div></div></div>
    <div className="rounded bg-slate-950 p-6 text-xl font-bold leading-8 text-white sm:text-2xl">One MSME sanction did not produce one asset. It produced a village credit cluster the bank already had a claim on and could not see.</div>
  </div>;
}

function MandalStat({ mandal }: { mandal: ClusterMandal }) {
  const nodes = clusterNodes.filter((node) => node.mandal === mandal);
  const evidenceable = nodes.filter((node) => node.evidenceable).length;
  return <div className="card p-4"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">{mandal} mandal</div><div className="mt-2 tabnums text-2xl font-bold">{evidenceable} <span className="text-sm font-normal text-slate-500">/ {nodes.length}</span></div><div className="mt-1 text-xs text-slate-600">evidenceable suppliers</div></div>;
}

function MandalNodes({ mandal, visibleEvidence }: { mandal: ClusterMandal; visibleEvidence: number }) {
  const nodes = clusterNodes.filter((node) => node.mandal === mandal);
  return <div className="rounded border border-slate-200 bg-white p-3"><div className="mb-3 flex items-center justify-between"><div className="text-xs font-bold uppercase tracking-widest text-slate-700">{mandal}</div><span className="text-[10px] text-slate-400">{nodes.length} nodes</span></div><div className="grid grid-cols-10 gap-1">{nodes.map((node) => { const active = node.evidenceIndex !== null && node.evidenceIndex < visibleEvidence; return <span key={node.id} title={`${node.id} · ${active ? node.evidenceSource : node.counterfactualReason ?? "queued"}`} aria-label={`${node.id} ${active ? "evidenceable" : "not yet evidenced"}`} className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${active ? "bg-emerald-500" : "border border-slate-300 bg-white"}`} />; })}</div><div className="mt-3 border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-500">Green nodes carry a deterministic evidence path. Grey nodes remain unresolved.</div></div>;
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: "green" | "blue" | "violet" | "teal" }) {
  const tones = { green: "border-emerald-200 bg-emerald-50 text-emerald-950", blue: "border-blue-200 bg-blue-50 text-blue-950", violet: "border-violet-200 bg-violet-50 text-violet-950", teal: "border-teal-200 bg-teal-50 text-teal-950" };
  return <div className={`rounded border p-4 ${tones[tone]}`}><div className="text-xs font-bold uppercase tracking-widest opacity-70">{label}</div><div className="mt-2 tabnums text-2xl font-black">{value}</div><div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-70"><Check size={12} />{detail}</div></div>;
}
