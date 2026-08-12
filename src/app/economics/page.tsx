import { Fact } from "@/components/governance/Fact";
import { JudgmentCostCurve } from "@/components/charts/JudgmentCostCurve";
import { Shell } from "@/components/presenter/Shell";

const tasks = [
  ["Research schemes and regulation", "2.0 h", "0.3 h", "repeatable"],
  ["Reconcile conflicting sources", "1.5 h", "0.5 h", "judgment retained"],
  ["Financial spreading", "2.5 h", "0.4 h", "repeatable"],
  ["Site-visit note synthesis", "1.0 h", "0.2 h", "rarely done today"],
  ["Scheme eligibility mapping", "1.0 h", "0.2 h", "repeatable"],
  ["Draft CAM", "4.0 h", "0.8 h", "maker-checker"],
  ["CP tracking", "0.8 h", "0.1 h", "repeatable"],
  ["Post-disbursement EWS scan", "rarely done today", "0.2 h", "new coverage"],
  ["Renewal review", "3.0 h", "0.6 h", "judgment retained"],
  ["Cluster origination", "rarely done today", "0.5 h", "new coverage"],
];

function Badge({ children, tone = "simulated" }: { children: React.ReactNode; tone?: "simulated" | "illustrative" | "hypothesis" }) {
  const styles = { simulated: "bg-slate-100 text-slate-600", illustrative: "bg-amber-100 text-amber-800", hypothesis: "bg-violet-100 text-violet-800" };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[tone]}`}>{children}</span>;
}

export default function EconomicsPage() {
  return <Shell><div className="space-y-5">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-fabric">Close / economics</div><h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">Make judgment cheap enough to travel.</h1><p className="mt-2 max-w-3xl text-slate-600">The commercial case is not automation for its own sake. It is rigorous evidence on tickets that arithmetic currently excludes.</p></div><div className="rounded border border-violet-200 bg-violet-50 px-4 py-3 text-right"><div className="text-[10px] font-bold uppercase tracking-widest text-violet-700">Observed on this case</div><div className="tabnums text-2xl font-black text-violet-950">~7–9×</div><Badge tone="simulated">simulated</Badge></div></header>
    <JudgmentCostCurve />
    <section className="card overflow-hidden"><div className="border-b border-slate-200 bg-white p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-widest text-fabric">Where the workforce spends time</div><h2 className="mt-1 text-2xl font-bold">A task table, not a headcount promise</h2></div><div className="flex gap-2"><Badge tone="simulated">~7–9× observed</Badge><Badge tone="hypothesis">100× design hypothesis</Badge></div></div><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Human authority stays on conflicts, exceptions and the decision. The agent workforce expands the evidence work around that decision. “Rarely done today” is marked rather than quietly counted as productivity.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-slate-300 bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500"><tr><th className="px-5 py-3">Credit task</th><th className="px-3 py-3">Human alone</th><th className="px-3 py-3">Human + workforce</th><th className="px-3 py-3">What changes</th></tr></thead><tbody>{tasks.map(([task, human, workforce, change]) => <tr key={task} className="border-b border-slate-100 last:border-0"><th className="px-5 py-3 font-semibold text-slate-900">{task}</th><td className={`px-3 py-3 tabnums ${human === "rarely done today" ? "font-bold text-amber-700" : "text-slate-600"}`}>{human}</td><td className="px-3 py-3 tabnums font-bold text-violet-800">{workforce}</td><td className="px-3 py-3 text-xs text-slate-500">{change}</td></tr>)}</tbody></table></div><div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2"><div className="bg-violet-50 p-4"><div className="text-xs font-bold uppercase tracking-widest text-violet-700">Observed on this case</div><div className="mt-1 text-lg font-bold text-violet-950">~7–9× throughput per officer</div><p className="mt-1 text-xs leading-5 text-violet-900">Simulated workshop observation. Not a public benchmark and not a claim about every bank.</p></div><div className="bg-slate-950 p-4 text-white"><div className="text-xs font-bold uppercase tracking-widest text-violet-300">Full-workforce model</div><div className="mt-1 text-lg font-bold">100× is a design hypothesis</div><p className="mt-1 text-xs leading-5 text-slate-300">The 90-day pilot measures whether the architecture earns this claim. It is not measured today.</p></div></div></section>
    <section className="rounded bg-slate-950 p-5 text-xl font-bold leading-8 text-white sm:text-2xl">The objective is not fewer bankers. It is more productive bankers — and rural borrowers who become underwritable for the first time.</section>
    <div className="grid gap-3 md:grid-cols-2"><div className="card p-4"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Input discipline</div><p className="mt-2 text-sm leading-6 text-slate-700">Both baseline values are placeholders for the bank’s own measured baseline, not sourced industry facts.</p><div className="mt-3 space-y-2 text-xs"><Fact id="cost.per.appraisal" /><Fact id="tat.baseline" /></div></div><div className="card p-4"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Pilot offer</div><p className="mt-2 text-sm leading-6 text-slate-700">Measure the cost floor, officer throughput and quality blind-scored by the bank’s own credit committee. Keep the numerator and denominator visible.</p></div></div>
  </div></Shell>;
}
