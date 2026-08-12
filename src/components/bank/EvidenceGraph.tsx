import { ArrowRight, CircleDashed, FileCheck2, GitBranch, ShieldAlert } from "lucide-react";
import { Fact } from "@/components/governance/Fact";

interface GraphNode { id: string; label: string; detail: string; tone: "source" | "claim" | "decision"; factId?: string; }
interface GraphEdge { from: string; to: string; label: string; }

const nodes: GraphNode[] = [
  { id: "audited", label: "Audited FY25", detail: "₹6.90 Cr turnover", tone: "source" },
  { id: "gstn", label: "GSTN GSTR-3B", detail: "₹8.20 Cr turnover", tone: "source" },
  { id: "aa", label: "AA bank credits", detail: "₹7.80 Cr turnover", tone: "source" },
  { id: "scheme", label: "Scheme fit", detail: "CEFPPC pathway to verify", tone: "source", factId: "pmksy.cefppc" },
  { id: "reconcile", label: "Turnover reconciliation", detail: "18.8% variance", tone: "claim" },
  { id: "eligibility", label: "Eligibility map", detail: "Pathways + explicit rule-outs", tone: "claim" },
  { id: "credit", label: "Credit review", detail: "Human authority required", tone: "decision" },
  { id: "cp", label: "Conditions precedent", detail: "Carry unresolved items", tone: "decision" },
];

const edges: GraphEdge[] = [
  { from: "audited", to: "reconcile", label: "extract" }, { from: "gstn", to: "reconcile", label: "normalise" }, { from: "aa", to: "reconcile", label: "consent + compare" },
  { from: "scheme", to: "eligibility", label: "check thresholds" }, { from: "reconcile", to: "credit", label: "route conflict" }, { from: "eligibility", to: "cp", label: "carry conditions" },
];

const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node])) as Record<string, GraphNode>;

export function EvidenceGraph({ conflict = true }: { conflict?: boolean }) {
  return <div className="card overflow-hidden">
    <div className="border-b border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-bold"><GitBranch size={17} className="text-violet-700" /> Evidence graph</div><p className="mt-1 text-xs text-slate-500">Sources left · claims middle · decision authority right. Every edge names its transformation.</p></div>
    <div className="grid gap-4 p-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
      <div className="space-y-3">{nodes.filter((node) => node.tone === "source").map((node) => <GraphCard key={node.id} node={node} />)}</div>
      <ArrowRight className="hidden text-slate-300 lg:block" />
      <div className="space-y-3">{nodes.filter((node) => node.tone === "claim").map((node) => <GraphCard key={node.id} node={node} />)}{conflict && <div className="rounded border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950"><div className="flex items-center gap-2 font-bold"><ShieldAlert size={15} /> Conflict carried forward</div><div className="mt-1 leading-5">No source is silently promoted. Credit review receives the disagreement intact.</div></div>}</div>
      <ArrowRight className="hidden text-slate-300 lg:block" />
      <div className="space-y-3">{nodes.filter((node) => node.tone === "decision").map((node) => <GraphCard key={node.id} node={node} />)}</div>
    </div>
    <div className="border-t border-slate-100 bg-white px-4 pb-4"><div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2 lg:grid-cols-3">{edges.map((edge) => <div key={`${edge.from}-${edge.to}`} className="flex items-center gap-2"><CircleDashed size={12} className="shrink-0 text-violet-600" /><span><b>{nodeById[edge.from].label}</b> → <b>{nodeById[edge.to].label}</b>: {edge.label}</span></div>)}</div></div>
  </div>;
}

function GraphCard({ node }: { node: GraphNode }) {
  const className = node.tone === "source" ? "border-blue-200 bg-blue-50" : node.tone === "claim" ? "border-violet-200 bg-violet-50" : "border-teal-200 bg-teal-50";
  return <div className={`rounded border p-3 ${className}`}><div className="flex items-center gap-2 text-xs font-bold">{node.tone === "source" ? <FileCheck2 size={14} /> : node.tone === "claim" ? <GitBranch size={14} /> : <ShieldAlert size={14} />}{node.label}</div><div className="mt-1 text-sm font-semibold text-slate-900">{node.factId ? <Fact id={node.factId} /> : node.detail}</div>{node.factId && <div className="mt-1 text-[11px] text-slate-500">{node.detail}</div>}</div>;
}
