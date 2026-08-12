import {Suspense} from "react";
import {WorkQueue} from "@/components/product/queue/WorkQueue";

export default function WorkQueuePage() {
  return <Suspense fallback={<div className="rounded-lg border border-slate-300 bg-white p-8 text-sm text-slate-500">Loading work queue…</div>}><WorkQueue /></Suspense>;
}
