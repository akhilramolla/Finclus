"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight, CircleAlert, FlaskConical, Play, SkipForward } from "lucide-react";
import { Fact } from "@/components/governance/Fact";
import { EvidenceGraph } from "@/components/bank/EvidenceGraph";
import { Shell } from "@/components/presenter/Shell";
import { researchPlanner, researchStreams, type ResearchFinding } from "@/content/research";

const lastStage = 4;

export default function Research03417Page() {
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setStage((current) => {
        if (current >= lastStage) {
          setRunning(false);
          return lastStage;
        }
        return current + 1;
      });
    }, 750);
    return () => window.clearTimeout(timer);
  }, [running, stage]);

  useEffect(() => {
    const skipReveal = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" || stage < 0) return;
      event.preventDefault();
      setStage(lastStage);
      setRunning(false);
    };
    window.addEventListener("keydown", skipReveal);
    return () => window.removeEventListener("keydown", skipReveal);
  }, [stage]);

  const runResearch = () => {
    setStage(0);
    setRunning(true);
  };

  return <Shell><div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-fabric">Bank / institutional research</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Research brief · `03417`</h1><p className="mt-2 max-w-3xl text-slate-600">Decompose the question, gather six perspectives, and leave the officer with evidence rather than an opaque answer.</p></div><Link href="/bank/appraisal/03417" className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold hover:border-violet-400">Continue to appraisal <ArrowRight size={16} /></Link></div>
    <GrammarStrip />
    <section className="card overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 p-5"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-700"><FlaskConical size={15} /> Deterministic research runner</div><h2 className="mt-2 text-xl font-bold">What should we know before appraisal?</h2><p className="mt-1 text-sm text-slate-600">Anchor expansion: mango and tomato pulp processing plus cold storage in Kuppam.</p></div><button onClick={runResearch} className="inline-flex items-center gap-2 rounded bg-violet-700 px-5 py-3 text-sm font-bold text-white hover:bg-violet-800"><Play size={16} /> {stage < 0 ? "RUN RESEARCH" : running ? "RESEARCH RUNNING" : "RUN AGAIN"}</button></div>
      <div className="p-5"><div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">{["Planner", "Six streams", "Evidence graph", "Conflict", "Pathways"].map((label, index) => <div key={label} className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full border ${stage >= index ? "border-violet-700 bg-violet-700 text-white" : "border-slate-300 bg-white"}`}>{stage > index ? <Check size={14} /> : index + 1}</span><span className={stage >= index ? "text-violet-800" : "text-slate-500"}>{label}</span>{index < 4 && <ChevronRight size={14} className="text-slate-300" />}</div>)}</div>
        <div className="min-h-[200px]">{stage < 0 ? <EmptyResearch /> : <>
          {stage >= 0 && <Planner />}
          {stage >= 1 && <Streams />}
          {stage >= 2 && <div className="mt-5"><EvidenceGraph /></div>}
          {stage >= 3 && <ConflictNotice />}
          {stage >= 4 && <Pathways />}
        </>}</div>
      </div>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500"><span>{running ? "Scripted reveal: one stage every 750 ms" : stage >= 0 ? "Research complete · all findings remain labelled" : "Nothing runs until the officer presses RUN RESEARCH"}</span>{running && <span className="inline-flex items-center gap-1 font-semibold text-violet-700"><SkipForward size={14} /> Press → to skip</span>}</div>
  </div></Shell>;
}

function EmptyResearch() {
  return <div className="flex min-h-[200px] flex-col items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 p-6 text-center"><div className="rounded-full bg-violet-100 p-3 text-violet-700"><FlaskConical size={24} /></div><div className="mt-3 text-lg font-bold text-slate-900">Research is staged, not improvised</div><p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">Press the single button. The runner decomposes the brief and reveals its evidence path in a fixed sequence.</p></div>;
}

function Planner() {
  return <div className="rounded border border-violet-200 bg-violet-50 p-4"><div className="text-xs font-bold uppercase tracking-widest text-violet-800">01 · planner decomposition</div><div className="mt-3 flex flex-wrap gap-2">{researchPlanner.map((item) => <span key={item} className="rounded-full border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-900">{item}</span>)}</div><p className="mt-3 text-sm leading-6 text-violet-950">The agent does not search for one answer. It creates six bounded workstreams that can be inspected, challenged and carried forward.</p></div>;
}

function Streams() {
  return <div className="mt-5"><div className="mb-3 flex items-center justify-between"><div className="text-xs font-bold uppercase tracking-widest text-emerald-700">02 · parallel streams</div><span className="text-xs text-slate-500">6 / 6 populated</span></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{researchStreams.map((stream) => <article key={stream.id} className="card min-h-[205px] p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-bold text-slate-900">{stream.title}</div><div className="mt-1 text-xs leading-4 text-slate-500">{stream.question}</div></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">READY</span></div><div className="mt-4 space-y-3">{stream.findings.map((finding) => <Finding key={finding.id} finding={finding} />)}</div></article>)}</div></div>;
}

function Finding({ finding }: { finding: ResearchFinding }) {
  return <div className="border-l-2 border-emerald-300 pl-3"><div className="text-xs font-bold text-slate-800">{finding.label}</div><div className="mt-1 text-xs leading-5 text-slate-600">{finding.factId ? <Fact id={finding.factId} /> : finding.detail}</div><div className="mt-1 flex flex-wrap gap-x-2 text-[10px] text-slate-500"><span>{finding.source}</span><span className="font-bold uppercase text-emerald-700">{finding.confidence}</span></div></div>;
}

function ConflictNotice() {
  return <div className="mt-5 rounded border border-amber-300 bg-amber-50 p-5"><div className="flex items-start gap-3"><CircleAlert className="mt-0.5 shrink-0 text-amber-700" size={21} /><div><div className="text-xs font-bold uppercase tracking-widest text-amber-800">04 · unresolved conflict carried forward</div><h3 className="mt-1 text-lg font-bold text-amber-950">The evidence engine refuses to manufacture a single turnover.</h3><p className="mt-2 max-w-4xl text-sm leading-6 text-amber-950">Audited financials, GSTN and AA-derived bank credits do not agree. The discrepancy is preserved as a credit-review item, with source, consent and transformation attached. It is not silently averaged.</p><div className="mt-3 inline-flex rounded bg-white/70 px-3 py-2 text-xs font-bold text-amber-900">NEXT OWNER · CREDIT OFFICER K. RAO</div></div></div></div>;
}

function Pathways() {
  return <div className="mt-5 grid gap-3 lg:grid-cols-2"><div className="rounded border border-emerald-200 bg-emerald-50 p-4"><div className="text-xs font-bold uppercase tracking-widest text-emerald-800">05 · pathways to verify</div><div className="mt-3 space-y-3 text-sm text-emerald-950"><div><b>MSME term loan + working capital</b><div className="text-xs leading-5">Matches the project and operating cycle; credit appraisal remains required.</div></div><div><b>PMKSY–CEFPPC</b><div className="text-xs leading-5"><Fact id="pmksy.cefppc" /></div></div><div><b>CGTMSE</b><div className="text-xs leading-5"><Fact id="cgtmse.ceiling" /> · <Fact id="cgtmse.agf" /></div></div></div></div><div className="rounded border border-red-200 bg-red-50 p-4"><div className="text-xs font-bold uppercase tracking-widest text-red-800">Explicit rule-outs</div><div className="mt-3 space-y-3 text-sm text-red-950"><div><b>PMFME</b><div className="text-xs leading-5"><Fact id="pmfme.ruleout" /></div></div><div><b>PLISFPI</b><div className="text-xs leading-5"><Fact id="plisfpi.ruleout" /></div></div></div></div></div>;
}

function GrammarStrip() {
  return <div className="grid gap-px overflow-hidden rounded border border-slate-200 bg-slate-200 sm:grid-cols-4"><div className="bg-blue-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Bank system</div><div className="mt-1 text-sm font-semibold">Owns application state</div></div><div className="bg-violet-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-violet-700">Intelligence fabric</div><div className="mt-1 text-sm font-semibold">Researches + reconciles</div></div><div className="bg-teal-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Human authority</div><div className="mt-1 text-sm font-semibold">Reviews conflict</div></div><div className="bg-emerald-50 p-3"><div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Evidence</div><div className="mt-1 text-sm font-semibold">Source + confidence</div></div></div>;
}
