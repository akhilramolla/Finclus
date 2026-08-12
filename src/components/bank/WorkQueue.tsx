"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, CheckCircle2, CircleAlert, Clock3, ShieldAlert } from "lucide-react";
import { useDemoStore } from "@/lib/store";

interface QueueRow {
  lan: string;
  borrower: string;
  product: string;
  amount: string;
  sla: number;
  slaText: string;
  flags: string;
  owner: string;
  status: "review" | "clean" | "consent";
}

const rows: QueueRow[] = [
  { lan: "MSME/AP/2026/03417", borrower: "Sri Annapurna Foods Private Limited", product: "Term loan + WC", amount: "₹3.75 Cr", sla: 72, slaText: "18h remaining", flags: "3 risks · 4 approvals pending", owner: "K. Rao · RCPC Tirupati", status: "review" },
  { lan: "MSME/TG/2026/01902", borrower: "Deccan Cold Chain LLP", product: "Cold-chain expansion", amount: "₹2.10 Cr", sla: 36, slaText: "31h remaining", flags: "No open flags", owner: "S. Menon · Hyderabad", status: "clean" },
  { lan: "MSME/AP/2026/03008", borrower: "Godavari Agro FPO", product: "Working capital", amount: "₹2.00 Cr", sla: 89, slaText: "6h remaining", flags: "Consent incomplete", owner: "A. Prasad · Vijayawada", status: "consent" },
];

const statusLabel = { review: "AI PRE-SCREEN", clean: "CLEAN", consent: "CONSENT HOLD" };

export function WorkQueue() {
  const router = useRouter();
  const set = useDemoStore((state) => state.set);
  const openAnchor = () => {
    set({ current: 11 });
    router.push("/bank/los/03417");
  };

  return <div className="card overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-[980px] w-full text-left">
        <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-[.16em] text-slate-500">
          <tr><th className="p-4">LAN / borrower</th><th className="p-4">Product</th><th className="p-4">Amount</th><th className="p-4">SLA</th><th className="p-4">Flags</th><th className="p-4">Owner</th><th className="p-4">State</th></tr>
        </thead>
        <tbody>{rows.map((row, index) => <tr key={row.lan} className="border-t border-slate-100 align-top">
          <td className="p-4"><button onClick={index === 0 ? openAnchor : undefined} className={`text-left ${index === 0 ? "group" : "cursor-default"}`}><div className="font-mono text-xs text-slate-500">{row.lan}</div><div className="mt-1 font-bold text-slate-900 group-hover:text-blue-700">{row.borrower}{index === 0 && <ArrowUpRight className="ml-1 inline-block" size={15} />}</div></button></td>
          <td className="p-4 text-sm text-slate-700">{row.product}</td>
          <td className="p-4 tabnums text-sm font-bold text-slate-900">{row.amount}</td>
          <td className="p-4"><div className="flex min-w-32 items-center gap-2 text-sm font-semibold"><Clock3 size={15} className="text-blue-700" />{row.slaText}</div><div className="mt-2 h-1.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.sla > 80 ? "bg-amber-500" : "bg-blue-600"}`} style={{ width: `${row.sla}%` }} /></div></td>
          <td className="p-4 text-sm"><div className={`flex items-center gap-2 font-semibold ${row.status === "clean" ? "text-emerald-700" : row.status === "consent" ? "text-amber-700" : "text-red-700"}`}>{row.status === "clean" ? <CheckCircle2 size={15} /> : row.status === "consent" ? <ShieldAlert size={15} /> : <CircleAlert size={15} />}{row.flags}</div></td>
          <td className="p-4 text-sm text-slate-600">{row.owner}</td>
          <td className="p-4"><span className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ${row.status === "clean" ? "bg-emerald-50 text-emerald-700" : row.status === "consent" ? "bg-amber-50 text-amber-800" : "bg-violet-50 text-violet-800"}`}>{statusLabel[row.status]}</span></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
