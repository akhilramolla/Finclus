import Link from "next/link";
import { ArrowRight, Database, Filter, ListChecks } from "lucide-react";
import { Shell } from "@/components/presenter/Shell";
import { WorkQueue } from "@/components/bank/WorkQueue";

export default function BankQueuePage() {
  return <Shell><div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-bank">Bank / intake control</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Credit work queue</h1><p className="mt-2 max-w-3xl text-slate-600">A live operating surface for the officer: service level, ownership, unresolved flags and the next evidence action.</p></div><Link href="/bank/los/03417" className="inline-flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">Open anchor case <ArrowRight size={16} /></Link></div>
    <div className="grid gap-3 sm:grid-cols-3"><Metric icon={<ListChecks size={17} />} label="Open applications" value="03" detail="RCPC queue" /><Metric icon={<Filter size={17} />} label="Needs officer review" value="01" detail="anchor case" /><Metric icon={<Database size={17} />} label="Evidence freshness" value="92%" detail="simulated view" /></div>
    <WorkQueue />
    <div className="grid gap-3 lg:grid-cols-[1fr_1fr]"><div className="rounded border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950"><b>Queue principle</b><br />The LOS owns the application state. The intelligence fabric prepares evidence and flags uncertainty. The credit officer owns the decision.</div><div className="rounded border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600"><b className="text-slate-900">Presenter cue</b><br />Click the anchor row. This is bank software, not a chatbot.</div></div>
  </div></Shell>;
}

function Metric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return <div className="card p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">{icon}{label}</div><div className="mt-2 tabnums text-2xl font-bold text-slate-900">{value}</div><div className="text-xs text-slate-500">{detail}</div></div>;
}
