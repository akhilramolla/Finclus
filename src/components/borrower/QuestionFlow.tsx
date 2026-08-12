"use client";

import {ArrowRight, CheckCircle2} from "lucide-react";
import {useState} from "react";
import {te} from "@/content/i18n.te";

const questions = [
  {label: "What are you building or expanding?", value: "Mango & tomato pulp processing + cold storage", te: "మీరు ఏ వ్యాపారాన్ని నిర్మిస్తున్నారు లేదా విస్తరిస్తున్నారు?"},
  {label: "Where is the project?", value: "Kuppam mandal, Chittoor district", te: "ప్రాజెక్ట్ ఎక్కడ ఉంది?"},
  {label: "How much will the project cost?", value: "₹5.00 Cr project cost · ₹3.75 Cr finance sought", te: "ప్రాజెక్ట్ ఖర్చు ఎంత?"},
  {label: "What can you contribute?", value: "₹1.25 Cr promoter contribution · 2.00 acres owned", te: "మీరు ఎంత పెట్టుబడి పెట్టగలరు?"},
  {label: "When do you need the first disbursement?", value: "After approvals and a documented project start", te: "మొదటి రుణ విడుదల ఎప్పుడు కావాలి?"}
] as const;

export function QuestionFlow({telugu = false}: {telugu?: boolean}) {
  const [current, setCurrent] = useState(0);
  const question = questions[current];
  return <section><p className="mb-2 text-[10px] font-black uppercase tracking-[.2em] text-violet-700">{telugu ? te.profile.eyebrow : "PROJECT PROFILE"}</p><div className="mb-5 flex items-end justify-between"><h1 className="text-[28px] font-black leading-none text-slate-950">{telugu ? te.profile.title : "Five useful questions"}</h1><span className="tabnums text-xs font-bold text-slate-500">0{current + 1} / 05</span></div><div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-violet-700 transition-all" style={{width: `${((current + 1) / questions.length) * 100}%`}}/></div><div className="min-h-[290px] rounded-2xl border border-slate-200 bg-white p-5"><p className="text-lg font-bold leading-7 text-slate-900">{telugu ? question.te : question.label}</p><button className="mt-6 flex w-full items-center justify-between rounded-xl border-2 border-violet-200 bg-violet-50 px-4 py-4 text-left text-sm font-bold text-violet-950"><span>{question.value}</span><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600"/></button><p className="mt-4 text-xs leading-5 text-slate-500">We use this answer to explain pathways, not to make an automated decision.</p></div><button onClick={() => setCurrent(Math.min(current + 1, questions.length - 1))} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">{current === questions.length - 1 ? (telugu ? te.profile.finish : "View my project profile") : (telugu ? te.profile.next : "Next question")}<ArrowRight className="h-4 w-4"/></button>{current === questions.length - 1 && <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">Profile ready: expansion, food processing, rural AP, ₹5.00 Cr.</div>}</section>;
}
