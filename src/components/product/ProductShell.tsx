"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Bell, BriefcaseBusiness, ChevronRight, CircleGauge, FileStack, Landmark, Network, Scale, Search, ShieldCheck} from "lucide-react";
import {VersionSwitch} from "@/components/version/VersionSwitch";

const modules = [
  {href:"/2/work-queue", label:"Work Queue", icon:BriefcaseBusiness, match:"/2/work-queue"},
  {href:"/2/applications/03417", label:"Applications", icon:FileStack, match:"/2/applications"},
  {href:"/2/accounts/03417", label:"Accounts", icon:Landmark, match:"/2/accounts"},
  {href:"/2/early-warning/03417", label:"Early Warning", icon:CircleGauge, match:"/2/early-warning"},
  {href:"/2/clusters/annapurna", label:"Cluster Origination", icon:Network, match:"/2/clusters"},
  {href:"/2/governance", label:"Governance", icon:Scale, match:"/2/governance"}
];

export function ProductShell({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  return <div className="min-h-screen bg-[#edf0f5] text-slate-900">
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-slate-700 bg-slate-950 px-4 text-white">
      <Link href="/2" className="mr-8 min-w-40"><span className="font-black tracking-tight">FINCLUS<span className="text-violet-400">.</span></span><span className="ml-2 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">Credit OS</span></Link>
      <div className="hidden min-w-0 flex-1 items-center md:flex"><div className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"><Search size={14}/><span>Search LAN, CIF, borrower or lead</span><kbd className="ml-auto rounded border border-slate-700 px-1.5 py-0.5 text-[9px]">/</kbd></div></div>
      <div className="ml-auto flex items-center gap-3"><span className="hidden rounded-full border border-amber-500/40 bg-amber-400/10 px-2.5 py-1 text-[10px] font-black tracking-wider text-amber-300 sm:inline">SIMULATED</span><Bell size={17} className="text-slate-300"/><VersionSwitch dark/><div className="hidden border-l border-slate-700 pl-3 text-right sm:block"><div className="text-xs font-bold">K. Rao</div><div className="text-[9px] text-slate-400">Credit Officer · RCPC</div></div></div>
    </header>
    <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-56 border-r border-slate-300 bg-white lg:block">
      <nav className="p-3" aria-label="Product modules">
        <div className="mb-2 px-3 py-2 text-[9px] font-black uppercase tracking-[.18em] text-slate-400">Credit Operations</div>
        {modules.map(({href,label,icon:Icon,match}) => {const active=pathname.startsWith(match); return <Link key={href} href={href} className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold ${active?"bg-blue-50 text-blue-800":"text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><Icon size={17}/>{label}{active&&<ChevronRight size={14} className="ml-auto"/>}</Link>})}
      </nav>
      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3"><div className="flex items-center gap-2 text-xs font-black text-emerald-800"><ShieldCheck size={15}/>Controls active</div><p className="mt-1 text-[10px] leading-4 text-emerald-900">Maker-checker · evidence lineage · human authority</p></div>
    </aside>
    <main className="pt-14 lg:ml-56"><div className="mx-auto max-w-[1500px] p-4 sm:p-5">{children}</div></main>
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-300 bg-white lg:hidden" aria-label="Mobile product navigation">{modules.slice(0,5).map(({href,label,icon:Icon,match})=><Link key={href} href={href} aria-label={label} className={`flex flex-col items-center gap-1 p-2 text-[9px] font-bold ${pathname.startsWith(match)?"text-blue-700":"text-slate-500"}`}><Icon size={18}/><span className="max-w-16 truncate">{label}</span></Link>)}</nav>
  </div>;
}
