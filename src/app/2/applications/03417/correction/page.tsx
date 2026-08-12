"use client";

import Link from "next/link";
import {ChangeEvent} from "react";
import {AlertTriangle, ArrowRight, CheckCircle2, FileUp, History, Undo2} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {useApplicationWorkflow} from "@/components/product/application/application-store";
import {useProductStore} from "@/lib/product-store";

export default function CorrectionPage() {
  const retracted = useProductStore(state=>state.retracted);
  const activity = useProductStore(state=>state.activity);
  const act = useProductStore(state=>state.act);
  const challenged = useApplicationWorkflow(state=>state.correctionChallenged);
  const reason = useApplicationWorkflow(state=>state.correctionReason);
  const attachment = useApplicationWorkflow(state=>state.correctionAttachment);
  const setCorrectionReason = useApplicationWorkflow(state=>state.setCorrectionReason);
  const recordChallenge = useApplicationWorkflow(state=>state.recordChallenge);
  const attachCorrection = useApplicationWorkflow(state=>state.attachCorrection);

  const attach = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    attachCorrection({name:file.name,size:file.size,attachedAt:new Date().toISOString()});
    act(`Correction evidence attached: ${file.name}`);
  };
  const challenge = () => {
    if (!reason.trim()) return;
    recordChallenge(reason.trim());
    if (!challenged) act(`Land-use assertion challenged: ${reason.trim()}`);
  };
  const retract = () => {
    if (!challenged||!attachment||retracted) return;
    act("Stale land-use assertion retracted; conversion-pending CP added", {retracted:true});
  };

  return <ApplicationWorkspace stage={retracted?"Correction recorded":challenged?"Challenge open":"Evidence correction"} action={<Link href="/2/applications/03417/decision" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-bold">Open decision <ArrowRight size={14}/></Link>}>
    <section className={`rounded-lg border p-5 ${retracted?"border-emerald-300 bg-emerald-50":"border-amber-300 bg-amber-50"}`}>
      <div className="flex gap-3">{retracted?<CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700"/>:<AlertTriangle className="mt-0.5 shrink-0 text-amber-700"/>}<div><div className={`text-[10px] font-black uppercase tracking-[.16em] ${retracted?"text-emerald-800":"text-amber-800"}`}>{retracted?"Retracted assertion":"Original assertion · confidence 0.91"}</div><h2 className={`mt-2 text-xl font-black ${retracted?"text-emerald-950":"text-amber-950"}`}>{retracted?"Land-use conversion is pending.":"Land parcel 214/2B is industrial; land-use conversion is complete."}</h2><p className="mt-2 text-sm leading-6">{retracted?"The corrected 02 Jun 2026 revenue record now governs CP #3 and the subsidy-linked drawdown.":"Source: district land-record extract dated 14 Mar 2026. A later record and field inspection conflict with this claim."}</p></div></div>
    </section>
    <div className="grid gap-4 lg:grid-cols-[1fr_.72fr]">
      <section className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-blue-700"><Undo2 size={15}/> Governed correction</div><label htmlFor="reason" className="mt-4 block text-xs font-black text-slate-700">Challenge reason</label><textarea id="reason" value={reason} onChange={event=>setCorrectionReason(event.target.value)} disabled={challenged||retracted} className="mt-2 min-h-24 w-full rounded-md border border-slate-300 p-3 text-sm disabled:bg-slate-50"/><button onClick={challenge} disabled={challenged||retracted||!reason.trim()} className="mt-3 rounded-md bg-slate-950 px-4 py-2.5 text-xs font-bold text-white disabled:bg-slate-300">{challenged?"Challenge recorded":"Record challenge"}</button>
        <div className="mt-5 border-t border-slate-200 pt-5"><label className={`flex cursor-pointer items-center gap-3 rounded-md border border-dashed p-4 ${attachment?"border-emerald-300 bg-emerald-50":"border-slate-300 bg-slate-50"}`}><FileUp size={20} className={attachment?"text-emerald-700":"text-slate-500"}/><span><span className="block text-xs font-black">{attachment?attachment.name:"Attach corrected source"}</span><span className="mt-1 block text-[10px] text-slate-500">{attachment?`${Math.max(1,Math.round(attachment.size/1024))} KB · attachment record persisted`:"PDF, image or office document"}</span></span><input type="file" onChange={attach} disabled={retracted} className="sr-only"/></label></div>
        <button onClick={retract} disabled={!challenged||!attachment||retracted} className="mt-5 w-full rounded-md bg-red-700 px-4 py-3 text-sm font-bold text-white disabled:bg-slate-300">{retracted?"Retraction recorded":"Retract original assertion"}</button>
      </section>
      <section className="rounded-lg border border-slate-300 bg-white p-5"><div className="flex items-center gap-2"><History size={16} className="text-blue-700"/><h2 className="text-sm font-black">Correction activity</h2></div><ol className="mt-4 space-y-3">{activity.filter(event=>/correction|land-use|challenge|retract/i.test(event)).map((event,index)=><li key={`${event}-${index}`} className="border-l-2 border-slate-200 pl-3 text-xs leading-5"><b>{event}</b><div className="text-[10px] text-slate-400">K. Rao · application 03417</div></li>)}{!activity.some(event=>/correction|land-use|challenge|retract/i.test(event))?<li className="text-xs text-slate-500">No correction events recorded.</li>:null}</ol></section>
    </div>
  </ApplicationWorkspace>;
}
