import Link from "next/link";
import { ArrowRight, Landmark, Presentation, Workflow } from "lucide-react";

export default function VersionHome() {
  return <main className="min-h-screen bg-[#e9edf4] p-5 sm:p-10">
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between border-b border-slate-300 pb-5">
        <div><div className="text-xl font-black tracking-tight">FINCLUS<span className="text-violet-700">.</span></div><div className="text-[10px] font-bold uppercase tracking-[.24em] text-slate-500">Intelligence Fabric</div></div>
        <div className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-600">SIMULATED WORKSHOP ENVIRONMENT</div>
      </header>
      <section className="grid min-h-[calc(100vh-150px)] items-center gap-10 py-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <div className="text-xs font-bold uppercase tracking-[.24em] text-violet-700">Choose the experience</div>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-.04em] text-slate-950 sm:text-6xl">One lending fabric.<br/>Two ways to inspect it.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Use the workshop to understand the thesis. Use the product workspace to operate the same case from application to rural origination.</p>
          <div className="mt-7 flex items-center gap-3 text-sm text-slate-600"><Landmark size={18} className="text-blue-700"/>Sri Annapurna Foods · Chittoor · one continuous synthetic case</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/1" className="group rounded-xl border border-slate-300 bg-white p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600">
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><Presentation size={22}/></span><span className="tabnums text-3xl font-black text-slate-200">01</span></div>
            <h2 className="mt-8 text-2xl font-black">Workshop Demo</h2>
            <p className="mt-3 min-h-24 text-sm leading-6 text-slate-600">The current 60-minute presenter-led story, regulatory frame, borrower journey, four governed reveals and pilot close.</p>
            <span className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700">Open Version 1 <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></span>
          </Link>
          <Link href="/2" className="group rounded-xl border border-slate-800 bg-slate-950 p-6 text-white transition-transform duration-200 hover:-translate-y-1 hover:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400">
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300"><Workflow size={22}/></span><span className="tabnums text-3xl font-black text-slate-700">02</span></div>
            <h2 className="mt-8 text-2xl font-black">Product Workspace</h2>
            <p className="mt-3 min-h-24 text-sm leading-6 text-slate-300">An operational credit workspace where each next screen follows a banker action: queue, appraisal, sanction, EWS and cluster origination.</p>
            <span className="mt-8 inline-flex items-center gap-2 font-bold text-violet-300">Open Version 2 <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></span>
          </Link>
        </div>
      </section>
    </div>
  </main>;
}
