"use client";

import {useDeferredValue, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  Search,
  SlidersHorizontal,
  UserCheck,
  X,
} from "lucide-react";
import {anchorCase} from "@/content/case";
import {useProductStore} from "@/lib/product-store";

type QueueStage = "Pre-screen" | "Appraisal" | "Evidence review" | "Intake";
type QueuePriority = "exception" | "standard";

interface QueueItem {
  id: string;
  borrower: string;
  location: string;
  product: string;
  amount: string;
  stage: QueueStage;
  owner: string;
  sla: string;
  slaUsed: number;
  priority: QueuePriority;
  exceptions: number;
  anchor?: boolean;
  lakshmi?: boolean;
}

const baseRows: QueueItem[] = [
  {id: "MSME/AP/2026/03417", borrower: anchorCase.entity, location: "Kuppam, Chittoor", product: "Term loan + working capital", amount: "₹3.75 Cr", stage: "Pre-screen", owner: "Unassigned", sla: "18h remaining", slaUsed: 72, priority: "exception", exceptions: 3, anchor: true},
  {id: "MSME/AP/2026/03008", borrower: "Godavari Agro FPO", location: "Vijayawada, Andhra Pradesh", product: "Working capital", amount: "₹2.00 Cr", stage: "Evidence review", owner: "A. Prasad", sla: "6h remaining", slaUsed: 89, priority: "exception", exceptions: 1},
  {id: "MSME/TG/2026/01902", borrower: "Deccan Cold Chain LLP", location: "Hyderabad, Telangana", product: "Cold-chain expansion", amount: "₹2.10 Cr", stage: "Appraisal", owner: "S. Menon", sla: "31h remaining", slaUsed: 36, priority: "standard", exceptions: 0},
  {id: "MSME/AP/2026/02741", borrower: "Rayalaseema Millet Foods", location: "Anantapur, Andhra Pradesh", product: "Plant and machinery", amount: "₹1.45 Cr", stage: "Appraisal", owner: "K. Rao", sla: "22h remaining", slaUsed: 65, priority: "standard", exceptions: 0},
  {id: "MSME/TN/2026/01186", borrower: "Kaveri Packaging Works", location: "Hosur, Tamil Nadu", product: "Term loan", amount: "₹0.85 Cr", stage: "Pre-screen", owner: "Unassigned", sla: "40h remaining", slaUsed: 28, priority: "standard", exceptions: 0},
];

const lakshmiRow: QueueItem = {id: "AGRI/AP/2026/04109", borrower: "Lakshmi Devi G.", location: "Gudupalle, Andhra Pradesh", product: "Dairy investment credit", amount: "₹1.60 L", stage: "Intake", owner: "Unassigned", sla: "47h remaining", slaUsed: 8, priority: "exception", exceptions: 2, lakshmi: true};

export function WorkQueue() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimed = useProductStore((state) => state.claimed);
  const lakshmiCreated = useProductStore((state) => state.lakshmiCreated);
  const act = useProductStore((state) => state.act);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const [stage, setStage] = useState("All stages");
  const [ownership, setOwnership] = useState("All ownership");
  const [priorityOnly, setPriorityOnly] = useState(searchParams.get("priority") === "exception");

  const rows = lakshmiCreated ? [...baseRows, lakshmiRow] : baseRows;
  const filteredRows = rows.filter((row) => {
    const owner = row.anchor && claimed ? "K. Rao" : row.owner;
    const matchesQuery = !deferredQuery || `${row.id} ${row.borrower} ${row.location} ${row.product}`.toLowerCase().includes(deferredQuery);
    const matchesStage = stage === "All stages" || row.stage === stage;
    const matchesOwner = ownership === "All ownership" || (ownership === "Mine" ? owner === "K. Rao" : owner === "Unassigned");
    return matchesQuery && matchesStage && matchesOwner && (!priorityOnly || row.priority === "exception");
  });
  const filtersActive = stage !== "All stages" || ownership !== "All ownership" || priorityOnly;

  function claimAnchor() {
    if (!claimed) act("Application claimed by K. Rao", {claimed: true});
    router.push("/2/applications/03417");
  }

  function clearFilters() {
    setQuery("");
    setStage("All stages");
    setOwnership("All ownership");
    setPriorityOnly(false);
  }

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-blue-700"><SlidersHorizontal size={14} /> Credit operations</div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Work queue</h1>
          <p className="mt-1 text-sm text-slate-600">Find, claim and progress applications assigned to RCPC Tirupati.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Queue current · simulated</div>
      </div>

      <section className="rounded-lg border border-slate-300 bg-white p-3" aria-label="Queue filters">
        <div className="grid gap-2 lg:grid-cols-[minmax(280px,1fr)_190px_190px_auto]">
          <label className="relative block">
            <span className="sr-only">Search applications</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search LAN, borrower, location or product" className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          </label>
          <SelectFilter label="Filter by stage" value={stage} onChange={setStage} options={["All stages", "Pre-screen", "Appraisal", "Evidence review", "Intake"]} />
          <SelectFilter label="Filter by ownership" value={ownership} onChange={setOwnership} options={["All ownership", "Mine", "Unassigned"]} />
          <button type="button" aria-pressed={priorityOnly} onClick={() => setPriorityOnly((value) => !value)} className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-xs font-bold ${priorityOnly ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"}`}><Filter size={14} /> Exceptions only</button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          <span><b className="text-slate-800">{filteredRows.length}</b> of {rows.length} applications shown</span>
          {filtersActive || query ? <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"><X size={13} /> Clear filters</button> : <span>Sorted by SLA risk</span>}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-300 bg-white" aria-label="Credit application queue">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left">
            <thead className="border-b border-slate-300 bg-slate-50 text-[9px] font-black uppercase tracking-[.14em] text-slate-500">
              <tr><th className="px-4 py-3">Application / borrower</th><th className="px-3 py-3">Product</th><th className="px-3 py-3">Exposure</th><th className="px-3 py-3">Stage</th><th className="px-3 py-3">SLA</th><th className="px-3 py-3">Exceptions</th><th className="px-3 py-3">Owner</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => {
                const owner = row.anchor && claimed ? "K. Rao" : row.owner;
                return <tr key={row.id} className={`align-middle hover:bg-slate-50/80 ${row.anchor ? "bg-blue-50/30" : ""}`}>
                  <td className="px-4 py-3.5"><div className="flex items-start gap-3">{row.anchor ? <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-blue-600" /> : row.lakshmi ? <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-teal-600" /> : null}<div className="min-w-0"><div className="flex items-center gap-2"><span className="font-mono text-[10px] font-bold text-slate-500">{row.id}</span>{row.lakshmi ? <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-teal-700">New intake</span> : null}</div><div className="mt-1 text-sm font-bold text-slate-950">{row.borrower}</div><div className="mt-0.5 text-[10px] text-slate-500">{row.location}</div></div></div></td>
                  <td className="px-3 py-3.5 text-xs font-medium text-slate-700">{row.product}</td>
                  <td className="tabnums px-3 py-3.5 text-xs font-bold text-slate-900">{row.amount}</td>
                  <td className="px-3 py-3.5"><span className="whitespace-nowrap rounded bg-violet-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-violet-800">{row.stage}</span></td>
                  <td className="px-3 py-3.5"><div className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-bold ${row.slaUsed > 80 ? "text-red-700" : row.slaUsed > 60 ? "text-amber-700" : "text-slate-700"}`}><Clock3 size={13} />{row.sla}</div><div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.slaUsed > 80 ? "bg-red-500" : row.slaUsed > 60 ? "bg-amber-500" : "bg-blue-600"}`} style={{width: `${row.slaUsed}%`}} /></div></td>
                  <td className="px-3 py-3.5">{row.exceptions ? <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800"><AlertCircle size={14} />{row.exceptions} open</span> : <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><CheckCircle2 size={14} />Clear</span>}</td>
                  <td className="px-3 py-3.5"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold ${owner === "Unassigned" ? "text-slate-500" : "text-slate-800"}`}>{owner === "K. Rao" ? <UserCheck size={14} className="text-blue-700" /> : null}{owner}</span></td>
                  <td className="px-4 py-3.5 text-right">{row.anchor ? <button type="button" onClick={claimAnchor} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-blue-700 px-3 py-2 text-xs font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{claimed ? "Open application" : "Claim and open"}<ArrowRight size={14} /></button> : <button type="button" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-slate-400 hover:bg-slate-50">View details <ArrowRight size={14} /></button>}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        {filteredRows.length === 0 ? <div className="border-t border-slate-100 px-4 py-12 text-center"><Search size={22} className="mx-auto text-slate-300" /><div className="mt-2 text-sm font-bold text-slate-800">No applications match these filters</div><button type="button" onClick={clearFilters} className="mt-2 text-xs font-bold text-blue-700">Clear filters</button></div> : null}
      </section>
    </div>
  );
}

function SelectFilter({label, value, onChange, options}: {label: string; value: string; onChange: (value: string) => void; options: string[]}) {
  return <label className="relative block"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-xs font-bold text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>;
}
