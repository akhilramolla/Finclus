"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { creditAgents } from "@/content/agents";

export function AgentPanel() {
  const [active, setActive] = useState(0);
  const agent = creditAgents[active];
  return <section className="card overflow-hidden">
    <div className="border-b border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-700"><ShieldAlert size={15} /> Committee workbench</div>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-2"><h2 className="text-xl font-bold">Six specialist views, no consensus score</h2><span className="text-xs font-bold text-teal-700">AI recommends. The human decides.</span></div>
    </div>
    <div className="grid md:grid-cols-[210px_1fr]">
      <div className="border-b border-slate-200 p-2 md:border-b-0 md:border-r">{creditAgents.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={`mb-1 w-full rounded px-3 py-2 text-left text-sm font-bold ${index === active ? "bg-violet-100 text-violet-900" : "text-slate-600 hover:bg-slate-50"}`}>{item.name}{item.id === "adversarial" && <span className="ml-2 text-[10px] uppercase text-red-700">stop</span>}</button>)}</div>
      <div className="min-h-[185px] p-5"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Objective</div><p className="mt-1 text-sm text-slate-700">{agent.objective}</p><div className="mt-5 text-xs font-bold uppercase tracking-widest text-violet-700">Recommendation</div><p className="mt-1 text-lg font-bold text-slate-950">{agent.recommendation}</p><div className="mt-4 border-l-2 border-amber-400 pl-3 text-sm leading-6 text-slate-700"><b>Strongest argument:</b> {agent.strongestArgument}</div></div>
    </div>
  </section>;
}
