"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ListFilter,
} from "lucide-react";
import {anchorCase} from "@/content/case";
import {useProductStore} from "@/lib/product-store";

const exceptions = [
  {
    id: "MSME/AP/2026/03417",
    borrower: anchorCase.entity,
    issue: "Turnover reconciliation",
    age: "6h open",
    severity: "Material",
    href: "/2/applications/03417/exceptions",
  },
  {
    id: "MSME/AP/2026/03008",
    borrower: "Godavari Agro FPO",
    issue: "Consent artefact incomplete",
    age: "2h open",
    severity: "Blocking",
    href: "/2/work-queue",
  },
  {
    id: "MSME/TG/2026/01902",
    borrower: "Deccan Cold Chain LLP",
    issue: "Site report awaiting review",
    age: "1d open",
    severity: "Review",
    href: "/2/work-queue",
  },
];

export function QueueDashboard() {
  const claimed = useProductStore((state) => state.claimed);
  const lakshmiCreated = useProductStore((state) => state.lakshmiCreated);
  const activity = useProductStore((state) => state.activity);
  const assigned = 4 + (claimed ? 1 : 0) + (lakshmiCreated ? 1 : 0);

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      <section className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="grid lg:grid-cols-[1fr_360px]">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-blue-700">
              <BriefcaseBusiness size={14} /> Credit officer workspace
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Good morning, K. Rao</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Your RCPC Tirupati book is ordered by service time and unresolved evidence. Start with the application nearest to an officer decision.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/2/work-queue" className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                Open work queue <ArrowRight size={16} />
              </Link>
              <span className="text-xs font-semibold text-slate-500">{assigned} applications assigned to your desk</span>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-950 p-5 text-white lg:border-l lg:border-t-0">
            <div className="text-[10px] font-black uppercase tracking-[.18em] text-blue-300">Next best action</div>
            <div className="mt-3 font-mono text-[10px] text-slate-400">MSME/AP/2026/03417</div>
            <h2 className="mt-1 text-lg font-black">Resolve turnover variance</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">{anchorCase.entity} has 18h remaining and three open exceptions.</p>
            <Link href="/2/applications/03417/exceptions" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-300 hover:text-white">
              Review exception evidence <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="My work metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<ListFilter size={16} />} label="Assigned to me" value={String(assigned).padStart(2, "0")} detail={claimed ? "Anchor case claimed" : "1 available to claim"} />
        <Metric icon={<Clock3 size={16} />} label="Due within 24h" value="02" detail="Next SLA in 6h" tone="amber" />
        <Metric icon={<AlertTriangle size={16} />} label="Open exceptions" value="05" detail="2 require officer action" tone="red" />
        <Metric icon={<FileCheck2 size={16} />} label="Awaiting checker" value="01" detail="Recommendation submitted" tone="green" />
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
        <section className="overflow-hidden rounded-lg border border-slate-300 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="text-sm font-black text-slate-950">Exception queue</h2>
              <p className="mt-0.5 text-xs text-slate-500">Items needing evidence review or an officer decision</p>
            </div>
            <Link href="/2/work-queue?priority=exception" className="text-xs font-bold text-blue-700 hover:text-blue-900">View all work</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {exceptions.map((item) => (
              <Link key={item.id} href={item.href} className="grid gap-3 px-4 py-3 hover:bg-slate-50 sm:grid-cols-[minmax(0,1.4fr)_minmax(180px,1fr)_90px] sm:items-center">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] font-bold text-slate-500">{item.id}</div>
                  <div className="mt-1 truncate text-sm font-bold text-slate-900">{item.borrower}</div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><AlertTriangle size={14} className="shrink-0 text-amber-600" />{item.issue}</div>
                <div className="flex items-center justify-between gap-2 sm:block sm:text-right">
                  <span className={`rounded px-2 py-1 text-[9px] font-black uppercase tracking-wider ${item.severity === "Blocking" ? "bg-red-50 text-red-700" : item.severity === "Material" ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600"}`}>{item.severity}</span>
                  <div className="mt-1 text-[10px] text-slate-500">{item.age}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-black text-slate-950">Recent activity</h2>
            <p className="mt-0.5 text-xs text-slate-500">Current session and application events</p>
          </div>
          <ol className="p-4">
            {activity.slice(0, 5).map((event, index) => (
              <li key={`${event}-${index}`} className="relative flex gap-3 pb-4 last:pb-0">
                {index < Math.min(activity.length, 5) - 1 ? <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200" /> : null}
                <CheckCircle2 size={15} className="relative mt-0.5 shrink-0 bg-white text-emerald-600" />
                <div><div className="text-xs font-semibold leading-5 text-slate-800">{event}</div><div className="mt-0.5 text-[10px] text-slate-400">Application 03417</div></div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function Metric({icon, label, value, detail, tone = "blue"}: {icon: React.ReactNode; label: string; value: string; detail: string; tone?: "blue" | "amber" | "red" | "green"}) {
  const tones = {blue: "text-blue-700 bg-blue-50", amber: "text-amber-700 bg-amber-50", red: "text-red-700 bg-red-50", green: "text-emerald-700 bg-emerald-50"};
  return <div className="rounded-lg border border-slate-300 bg-white p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-[.14em] text-slate-500">{label}</span><span className={`rounded-md p-1.5 ${tones[tone]}`}>{icon}</span></div><div className="tabnums mt-3 text-2xl font-black text-slate-950">{value}</div><div className="mt-1 text-[11px] font-medium text-slate-500">{detail}</div></div>;
}
