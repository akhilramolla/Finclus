"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowRight, Check, Clock3, Download, Eye, FileText, FolderCheck, Send} from "lucide-react";
import {ApplicationWorkspace} from "@/components/product/application/ApplicationWorkspace";
import {useApplicationWorkflow} from "@/components/product/application/application-store";
import {useProductStore} from "@/lib/product-store";

const evidence = [
  {id:"identity", label:"Applicant identity and constitution", source:"MCA and LOS", state:"Verified"},
  {id:"consent", label:"Account Aggregator consent artefact", source:"AA consent manager", state:"Verified"},
  {id:"financials", label:"Audited FY25 financial statements", source:"AUD-FY25-03417", state:"Received"},
  {id:"gst", label:"GST turnover returns", source:"GSTN GSTR-3B", state:"Received"},
  {id:"land", label:"Current land-use record", source:"Revenue department", state:"Review required"},
  {id:"approval", label:"CEFPPC sanction letter", source:"MoFPI", state:"Outstanding"},
];

const documents = [
  {id:"dpr", name:"Detailed project report v3", ref:"DPR-03417-v3", date:"11 Aug 2026", available:true},
  {id:"audit", name:"Audited financials FY25", ref:"AUD-FY25-03417", date:"10 Aug 2026", available:true},
  {id:"aa", name:"AA consent and bank statement", ref:"AA-03417-2026", date:"11 Aug 2026", available:true},
  {id:"land-latest", name:"Updated land-use conversion order", ref:"REV-2142B-LATEST", date:"Pending", available:false},
];

export default function ApplicationOverviewPage() {
  const claimed = useProductStore(state => state.claimed);
  const activity = useProductStore(state => state.activity);
  const act = useProductStore(state => state.act);
  const reviewed = useApplicationWorkflow(state => state.evidenceReviewed);
  const opened = useApplicationWorkflow(state => state.documentsOpened);
  const requested = useApplicationWorkflow(state => state.requestedDocuments);
  const toggleEvidence = useApplicationWorkflow(state => state.toggleEvidence);
  const openDocument = useApplicationWorkflow(state => state.openDocument);
  const requestDocument = useApplicationWorkflow(state => state.requestDocument);
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  const claim = () => {
    if (!claimed) act("Application claimed by K. Rao", {claimed:true});
  };
  const reviewEvidence = (id: string, label: string) => {
    const wasReviewed = reviewed.includes(id);
    toggleEvidence(id);
    act(`${label} ${wasReviewed ? "returned to review" : "reviewed"}`);
  };
  const viewDocument = (id: string, name: string, ref: string) => {
    setActiveDocument(activeDocument === id ? null : id);
    if (!opened.includes(id)) {
      openDocument(id);
      act(`${name} opened from application file`);
    }
    if (typeof window !== "undefined") {
      const blob = new Blob([`${name}\nReference: ${ref}\nApplication: MSME/AP/2026/03417\n\nDocument preview record.`], {type:"text/plain"});
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${ref}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    }
  };
  const request = (id: string, name: string) => {
    if (!requested.includes(id)) {
      requestDocument(id);
      act(`Document request sent: ${name}`);
    }
  };

  return <ApplicationWorkspace stage={claimed ? "In appraisal" : "Unassigned"} action={<button onClick={claim} disabled={claimed} className="rounded-md bg-blue-700 px-4 py-2 text-xs font-bold text-white disabled:bg-emerald-700">{claimed ? "Claimed by K. Rao" : "Claim application"}</button>}>
    <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
      <section className="rounded-lg border border-slate-300 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Evidence checklist</div><h2 className="mt-1 text-lg font-black">Application readiness</h2></div><span className="text-xs font-bold text-slate-600">{reviewed.length} of {evidence.length} reviewed</span></div>
        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">{evidence.map(item => {const checked=reviewed.includes(item.id); return <button key={item.id} onClick={() => reviewEvidence(item.id,item.label)} className="grid w-full grid-cols-[24px_1fr_auto] items-center gap-3 py-3 text-left"><span className={`flex h-5 w-5 items-center justify-center rounded border ${checked?"border-emerald-600 bg-emerald-600 text-white":"border-slate-300"}`}>{checked?<Check size={13}/>:null}</span><span><span className="block text-sm font-bold text-slate-900">{item.label}</span><span className="mt-0.5 block text-[11px] text-slate-500">{item.source}</span></span><span className={`rounded px-2 py-1 text-[10px] font-bold ${item.state==="Outstanding"||item.state==="Review required"?"bg-amber-50 text-amber-800":"bg-emerald-50 text-emerald-700"}`}>{item.state}</span></button>})}</div>
      </section>
      <section className="rounded-lg border border-slate-300 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2"><FolderCheck size={17} className="text-blue-700"/><h2 className="text-lg font-black">File status</h2></div>
        <div className="mt-4 grid grid-cols-2 gap-3"><Metric label="Documents" value="18 / 19"/><Metric label="Evidence age" value="1 day"/><Metric label="Consent" value="Valid"/><Metric label="Open issues" value="3" warning/></div>
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950"><b>Primary review item:</b> audited, GSTN and AA turnover records remain unreconciled.</div>
        <Link href="/2/applications/03417/research" className="mt-4 flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-xs font-bold text-white">Start institutional research <ArrowRight size={15}/></Link>
      </section>
    </div>
    <section className="rounded-lg border border-slate-300 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2"><FileText size={17} className="text-blue-700"/><h2 className="text-lg font-black">Documents</h2></div>
      <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-xs"><thead className="border-y border-slate-200 bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-2">Document</th><th className="px-3 py-2">Reference</th><th className="px-3 py-2">Date</th><th className="px-3 py-2">Status</th><th className="px-3 py-2 text-right">Action</th></tr></thead><tbody>{documents.map(document => <tr key={document.id} className="border-b border-slate-100"><td className="px-3 py-3 font-bold">{document.name}</td><td className="px-3 py-3 font-mono text-slate-600">{document.ref}</td><td className="px-3 py-3 text-slate-600">{document.date}</td><td className="px-3 py-3"><span className={`font-bold ${document.available?"text-emerald-700":"text-amber-800"}`}>{document.available?(opened.includes(document.id)?"Opened":"Available"):(requested.includes(document.id)?"Requested":"Missing")}</span></td><td className="px-3 py-3 text-right">{document.available?<button onClick={() => viewDocument(document.id,document.name,document.ref)} className="inline-flex items-center gap-1 rounded border border-slate-300 px-3 py-1.5 font-bold"><Download size={13}/> Open</button>:<button onClick={() => request(document.id,document.name)} disabled={requested.includes(document.id)} className="inline-flex items-center gap-1 rounded bg-amber-100 px-3 py-1.5 font-bold text-amber-900 disabled:opacity-60"><Send size={13}/> {requested.includes(document.id)?"Requested":"Request"}</button>}</td></tr>)}</tbody></table></div>
      {activeDocument?<div className="mt-3 flex items-center gap-2 rounded border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900"><Eye size={14}/> A traceable text copy was downloaded for review.</div>:null}
    </section>
    <section className="rounded-lg border border-slate-300 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2"><Clock3 size={17} className="text-blue-700"/><h2 className="text-lg font-black">Activity</h2></div>
      <ol className="mt-4 space-y-3">{activity.map((event,index) => <li key={`${event}-${index}`} className="grid grid-cols-[16px_1fr_auto] gap-3 text-xs"><span className={`mt-1.5 h-2 w-2 rounded-full ${index===0?"bg-blue-600":"bg-slate-300"}`}/><span className="font-semibold text-slate-800">{event}</span><span className="text-slate-400">{index===0?"Now":"11 Aug"}</span></li>)}</ol>
    </section>
  </ApplicationWorkspace>;
}

function Metric({label,value,warning=false}:{label:string;value:string;warning?:boolean}) {return <div className="rounded-md border border-slate-200 p-3"><div className="text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className={`mt-1 text-sm font-black ${warning?"text-amber-800":"text-slate-900"}`}>{value}</div></div>}
