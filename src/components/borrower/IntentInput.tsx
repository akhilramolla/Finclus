"use client";

import {ArrowRight, Mic, ShieldCheck, Sparkles} from "lucide-react";
import {Fact} from "@/components/governance/Fact";
import {te} from "@/content/i18n.te";

export function IntentInput({telugu = false}: {telugu?: boolean}) {
  const copy = telugu ? {
    eyebrow: te.intent.eyebrow, title: te.intent.title, prompt: te.intent.prompt, voice: te.intent.voice, consentTitle: te.intent.consentTitle, consent: te.intent.consentBody, details: "డేటా వినియోగ వివరాలు", action: te.intent.continue
  } : {
    eyebrow: "START WITH YOUR WORDS", title: "Find the right support for your business", prompt: "Tell us what you need", voice: "Speak your need", consentTitle: "Your permission comes first", consent: "Before any data pull, we show what is needed and why. You can withdraw permission at any time.", details: "DPDP-ready notice", action: "Start my profile"
  };
  return <section>
    <div className="mb-6"><p className="mb-2 text-[10px] font-black uppercase tracking-[.2em] text-violet-700">{copy.eyebrow}</p><h1 className="text-[28px] font-black leading-[1.05] tracking-tight text-slate-950">{copy.title}</h1></div>
    <label className="mb-2 block text-xs font-bold text-slate-500" htmlFor="borrower-intent">{copy.prompt}</label>
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 focus-within:border-violet-500"><textarea id="borrower-intent" defaultValue={telugu ? "కుప్పంలో నా మామిడి గుజ్జు యూనిట్‌ను విస్తరించాలి." : "I want to expand my mango pulp unit in Kuppam. About ₹5 crore. I have 2 acres. What finance and government support can I get?"} className="min-h-24 w-full resize-none border-0 bg-transparent text-sm leading-6 text-slate-800 outline-none"/><div className="flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-xs text-slate-400">{copy.voice}</span><button className="rounded-full bg-violet-50 p-3 text-violet-700" aria-label={copy.voice}><Mic className="h-5 w-5"/></button></div></div>
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"/><div><h2 className="text-sm font-bold text-slate-900">{copy.consentTitle}</h2><p className="mt-1 text-xs leading-5 text-slate-700">{copy.consent} <Fact id="dpdp.timeline"/></p><button className="mt-2 text-xs font-bold text-amber-800 underline">{copy.details}</button></div></div></div>
    <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-violet-800"><Sparkles className="h-4 w-4"/>{copy.action}<ArrowRight className="h-4 w-4"/></button>
  </section>;
}
