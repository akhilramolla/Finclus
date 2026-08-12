"use client";

import { CheckCircle2, CircleAlert, ExternalLink, ShieldCheck } from "lucide-react";
import { useDemoStore } from "@/lib/store";

interface PreScreenTile {
  title: string;
  result: string;
  detail: string;
  source: string;
  consent: string;
  tone: "good" | "watch" | "pending";
}

const tiles: PreScreenTile[] = [
  { title: "KYC / CKYC", result: "Matched", detail: "Promoter and entity identity align with the application record.", source: "CKYC / LOS identity service", consent: "LOS-03417-KYC", tone: "good" },
  { title: "Bureau", result: "CMR-3", detail: "Existing commercial credit file returned; review repayment history in appraisal.", source: "Bureau response · 11 Aug 2026", consent: "LOS-03417-BUR", tone: "watch" },
  { title: "GST", result: "Active", detail: "Registration is active; filing pattern is available for reconciliation.", source: "GSTN response · simulated", consent: "AA-03417-GST", tone: "good" },
  { title: "Banking (AA)", result: "Connected", detail: "Account aggregation returned consented bank-credit history for spread review.", source: "AA artefact · simulated", consent: "AA-03417-2026", tone: "good" },
  { title: "ITR", result: "Received", detail: "Three financial years received; values remain subject to cross-source comparison.", source: "Income-tax document pack · simulated", consent: "LOS-03417-ITR", tone: "watch" },
  { title: "Project", result: "3 risks", detail: "Land-use conversion, HT load sanction and grant timing need officer follow-up.", source: "DPR + project checklist", consent: "LOS-03417-DPR", tone: "watch" },
  { title: "Government approvals", result: "4 pending", detail: "Approval dependencies are visible before the file reaches sanction routing.", source: "Application checklist · simulated", consent: "LOS-03417-CP", tone: "pending" },
  { title: "Subsidy", result: "Under check", detail: "Scheme fit is a research output, not an automatic sanction assumption.", source: "MoFPI scheme records", consent: "LOS-03417-SCH", tone: "pending" },
];

const iconFor = (tone: PreScreenTile["tone"]) => tone === "good" ? <CheckCircle2 size={19} /> : tone === "watch" ? <CircleAlert size={19} /> : <ShieldCheck size={19} />;

export function PreScreenTiles() {
  const set = useDemoStore((state) => state.set);
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{tiles.map((tile) => <article key={tile.title} className="card flex min-h-[190px] flex-col p-4">
    <div className="flex items-start justify-between gap-3"><div className="text-sm font-bold text-slate-900">{tile.title}</div><span className={`${tile.tone === "good" ? "text-emerald-600" : tile.tone === "watch" ? "text-amber-600" : "text-violet-700"}`} aria-label={tile.result}>{iconFor(tile.tone)}</span></div>
    <div className={`mt-3 text-lg font-bold ${tile.tone === "good" ? "text-emerald-700" : tile.tone === "watch" ? "text-amber-800" : "text-violet-800"}`}>{tile.result}</div>
    <p className="mt-2 flex-1 text-sm leading-5 text-slate-600">{tile.detail}</p>
    <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-4 text-slate-500"><div><span className="font-bold text-slate-700">Source:</span> {tile.source}</div><button onClick={() => set({ governance: true })} className="mt-1 inline-flex items-center gap-1 font-semibold text-violet-700 hover:underline"><ExternalLink size={12} /> Evidence + consent: {tile.consent}</button></div>
  </article>)}</div>;
}
