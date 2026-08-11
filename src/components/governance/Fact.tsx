"use client";
import {factById} from "@/content/facts"; import {useDemoStore} from "@/lib/store";
export function Fact({id}:{id:string}){const f=factById[id]; const set=useDemoStore(s=>s.set); if(!f)return <span className="text-red-600">[missing fact: {id}]</span>; return <button className="inline-flex items-center gap-1 font-medium underline decoration-dotted" onClick={()=>set({governance:true})} title={f.sourceName}><span className={`status-dot ${f.confidence==='simulated'?'sim-dot':''} ${f.confidence==='illustrative'?'amber-dot':''}`}/>{f.value}</button>}
