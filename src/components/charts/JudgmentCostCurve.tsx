"use client";

import { useState } from "react";
import { Fact } from "@/components/governance/Fact";

const MIN_COST_LAKH = 0.05;
const MAX_COST_LAKH = 0.75;
const COST_STEP = 0.05;

function minimumTicket(costLakh: number): number {
  return Number((costLakh * 12).toFixed(2));
}

function ticketLabel(ticketLakh: number): string {
  return ticketLakh >= 100 ? `₹${(ticketLakh / 100).toFixed(2)} Cr` : `₹${ticketLakh.toFixed(2)} lakh`;
}

function Marker({ x, y, label, tone }: { x: number; y: number; label: string; tone: "anchor" | "dairy" }) {
  return <g>
    <line x1={x} x2={x} y1={y} y2={220} stroke={tone === "anchor" ? "#1e4fd6" : "#0f766e"} strokeDasharray="4 4" />
    <circle cx={x} cy={y} r="6" fill="#fff" stroke={tone === "anchor" ? "#1e4fd6" : "#0f766e"} strokeWidth="3" />
    <text x={x + 8} y={y - 10} fill="#16202e" fontSize="11" fontWeight="700">{label}</text>
  </g>;
}

export function JudgmentCostCurve() {
  const [costLakh, setCostLakh] = useState(0.35);
  const width = 640;
  const height = 260;
  const left = 54;
  const right = 22;
  const top = 24;
  const bottom = 40;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const xForCost = (value: number) => left + ((value - MIN_COST_LAKH) / (MAX_COST_LAKH - MIN_COST_LAKH)) * plotWidth;
  const yForTicket = (value: number) => top + plotHeight - (Math.min(value, 10) / 10) * plotHeight;
  const points = Array.from({ length: 15 }, (_, index) => {
    const cost = MIN_COST_LAKH + index * 0.05;
    return `${xForCost(cost)},${yForTicket(minimumTicket(cost))}`;
  }).join(" ");
  const currentTicket = minimumTicket(costLakh);
  const dairyViable = currentTicket <= 1.6;
  const anchorViable = currentTicket <= 500;
  const ruralBorrowersInRange = currentTicket <= 1.63 ? 287 : 0;

  return <section className="card overflow-hidden">
    <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Interactive judgment-cost curve</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">The floor is arithmetic, not intent.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Drag the fully-loaded cost of one rigorous appraisal. The curve shows the smallest ticket that can carry that work under this illustrative bank hurdle.</p>
        </div>
        <div className="rounded border border-white/20 bg-white/10 px-3 py-2 text-right"><div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Current cost floor</div><div className="mt-1 tabnums text-2xl font-black">₹{costLakh.toFixed(2)} lakh</div><div className="text-[10px] text-amber-300">ILLUSTRATIVE</div></div>
      </div>
    </div>
    <div className="grid gap-5 p-5 lg:grid-cols-[1.45fr_.8fr]">
      <div>
        <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label="Minimum viable ticket increases as appraisal cost increases">
            <rect x={left} y={top} width={plotWidth} height={plotHeight} fill="#f8fafc" />
            {[0, 2.5, 5, 7.5, 10].map((tick) => <g key={tick}><line x1={left} x2={width - right} y1={yForTicket(tick)} y2={yForTicket(tick)} stroke="#e2e8f0" /><text x={left - 8} y={yForTicket(tick) + 4} textAnchor="end" fill="#64748b" fontSize="10">{ticketLabel(tick)}</text></g>)}
            <polyline points={points} fill="none" stroke="#6d28d9" strokeWidth="3" />
            <Marker x={xForCost(0.35)} y={yForTicket(minimumTicket(0.35))} label="Current illustrative floor" tone="anchor" />
            <Marker x={xForCost(costLakh)} y={yForTicket(currentTicket)} label={ticketLabel(currentTicket)} tone="dairy" />
            <text x={left} y={height - 13} fill="#475569" fontSize="10" fontWeight="700">FULLY-LOADED APPRAISAL COST (₹ LAKH)</text>
            <text transform={`translate(14 ${top + plotHeight / 2}) rotate(-90)`} fill="#475569" fontSize="10" fontWeight="700">MINIMUM VIABLE TICKET</text>
          </svg>
        </div>
        <label className="mt-4 block text-sm font-bold text-slate-800" htmlFor="cost-floor">Move the cost floor <span className="font-normal text-slate-500">(illustrative input)</span></label>
        <input id="cost-floor" type="range" min={MIN_COST_LAKH} max={MAX_COST_LAKH} step={COST_STEP} value={costLakh} onChange={(event) => setCostLakh(Number(event.target.value))} className="mt-2 w-full accent-violet-700" />
        <div className="mt-1 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"><span>₹0.05 lakh</span><span>₹0.75 lakh</span></div>
      </div>
      <div className="space-y-3">
        <div className={`rounded border p-4 ${anchorViable ? "border-blue-200 bg-blue-50" : "border-amber-200 bg-amber-50"}`}><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Anchor · simulated</div><div className="mt-1 text-xl font-black">₹5.00 Cr</div><div className="mt-2 text-sm font-semibold">{anchorViable ? "Inside the current range" : "Outside this cost floor"}</div><p className="mt-1 text-xs leading-5 text-slate-600">A large ticket can absorb rigorous judgment today. That is not the rural growth strategy.</p></div>
        <div className={`rounded border p-4 ${dairyViable ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Lakshmi dairy · simulated</div><div className="mt-1 text-xl font-black">₹1.60 lakh</div><div className="mt-2 text-sm font-semibold">{dairyViable ? "Now comes into range" : "Not viable at this cost"}</div><p className="mt-1 text-xs leading-5 text-slate-700">Lower the cost floor and the same evidence discipline can reach a new-to-credit borrower.</p></div>
        <div className="rounded border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-bold uppercase tracking-widest text-slate-500">Rural population in range</div><div className="mt-1 text-xl font-black tabnums">{ruralBorrowersInRange} / 287</div><div className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">SIMULATED CLUSTER BORROWERS</div><p className="mt-2 text-xs leading-5 text-slate-600">The cluster’s simulated average ticket is ₹1.63 lakh. Lowering the cost floor brings that evidenceable population into economic range.</p></div>
        <div className="rounded border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-950"><b>Illustrative conversion:</b> minimum viable ticket = 12× fully-loaded appraisal cost. The bank replaces this hurdle with its measured baseline in the pilot.</div>
      </div>
    </div>
    <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-600"><Fact id="cost.per.appraisal" /> <span className="mx-1">·</span> <Fact id="tat.baseline" /></div>
  </section>;
}
