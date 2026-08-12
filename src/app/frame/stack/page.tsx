import Link from "next/link";
import { Shell } from "@/components/presenter/Shell";

const stages = [
  ["Channel", "customer / RM"], ["Lead + CRM", "intent + ownership"], ["LOS", "application record"],
  ["Identity checks", "CKYC · AML · dedupe"], ["Consent", "AA / ULI"], ["Evidence", "bureau · GST · ITR · MCA · banking · land · agri · docs"],
  ["Document processing", "extract + classify"], ["BRE / policy", "deterministic rules"], ["Credit appraisal", "CAM + judgment"],
  ["Exception", "deviation / conflict"], ["Authority", "DoP / committee"], ["Sanction", "conditions precedent"],
  ["Documentation", "CHG-1 · CERSAI"], ["CBS", "account master"], ["Disbursement", "ledger event"],
  ["LMS", "servicing"], ["Collections", "monitoring"], ["EWS / portfolio", "renewal"],
];

function Lane({ title, tone, children }: { title: string; tone: string; children: React.ReactNode }) {
  return <div className="card overflow-hidden"><div className={`border-b px-4 py-3 text-xs font-bold uppercase tracking-[.18em] ${tone}`}>{title}</div><div className="p-4">{children}</div></div>;
}

export default function Stack() {
  return <Shell><div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.22em] accent-bank">Frame / 01 · operating map</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The real lending lifecycle</h1><p className="mt-2 max-w-3xl text-slate-600">A bank does not need another destination. It needs a layer that can see the whole path from intake to renewal.</p></div><Link href="/frame/rails" className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold hover:border-blue-400">Next: rails →</Link></div>
    <div className="card overflow-hidden p-4 sm:p-6"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-slate-500">One continuous case path</span><span className="text-xs font-semibold text-violet-700">judgment boundary →</span></div><div className="flex flex-wrap items-center gap-2">{stages.map(([name, detail], index) => <div className="flex items-center gap-2" key={name}><div className={`min-w-[138px] rounded-md border p-3 ${index >= 8 && index <= 11 ? "border-violet-200 bg-violet-50" : index === 13 ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}><div className="text-sm font-bold">{name}</div><div className="mt-1 text-[11px] leading-4 text-slate-500">{detail}</div></div>{index < stages.length - 1 && <span className="text-lg text-slate-300" aria-hidden="true">→</span>}</div>)}</div></div>
    <div className="grid gap-4 md:grid-cols-3"><Lane title="Systems of record" tone="bg-blue-50 text-blue-700"><p className="text-sm leading-6">LOS, CBS, LMS, CRM and the source systems retain the official state of the account.</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded bg-blue-100 px-2 py-1">write the record</span><span className="rounded bg-blue-100 px-2 py-1">stamp the event</span></div></Lane><Lane title="Data rails" tone="bg-violet-50 text-violet-700"><p className="text-sm leading-6">Consent-led access brings signals together. Access is not the same as understanding.</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded bg-violet-100 px-2 py-1">retrieve</span><span className="rounded bg-violet-100 px-2 py-1">reconcile</span></div></Lane><Lane title="Human authority" tone="bg-teal-50 text-teal-700"><p className="text-sm leading-6">Credit officers and committees own material decisions, exceptions and the final decision-of-record.</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded bg-teal-100 px-2 py-1">challenge</span><span className="rounded bg-teal-100 px-2 py-1">decide</span></div></Lane></div>
    <div className="rounded-lg border border-violet-200 bg-violet-50 p-5"><div className="text-sm font-bold text-violet-900">Presenter cue</div><p className="mt-2 text-lg font-semibold text-violet-950">“Where does your team lose the most time — is that a systems problem or a judgment problem?”</p></div>
  </div></Shell>;
}
