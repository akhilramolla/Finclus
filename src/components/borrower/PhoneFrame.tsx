"use client";

import {Globe2, ShieldCheck, Sparkles} from "lucide-react";
import {useState} from "react";
import type {ReactNode} from "react";
import type {BorrowerLanguage} from "@/content/i18n.te";

export function PhoneFrame({
  step,
  english,
  telugu
}: {step: string; english: ReactNode; telugu: ReactNode}) {
  const [language, setLanguage] = useState<BorrowerLanguage>("en");
  return <main className="flex min-h-[calc(100vh-40px)] items-center justify-center px-4 py-8">
    <div className="w-full max-w-[860px]">
      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-violet-700"/>Borrower view</span>
        <span className="tabnums">{step} / 04</span>
      </div>
      <div className="mx-auto w-full max-w-[390px] rounded-[42px] border-[10px] border-slate-900 bg-slate-900 p-1 shadow-[0_18px_50px_rgba(22,32,46,.18)]">
        <div className="relative min-h-[700px] overflow-hidden rounded-[31px] bg-[#f8fafc]">
          <div className="absolute left-1/2 top-0 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-900" aria-hidden="true" />
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 pb-3 pt-8">
            <div><div className="text-sm font-black tracking-[.14em] text-slate-900">FINCLUS<span className="text-violet-700">.</span></div><div className="text-[10px] text-slate-500">your lending guide</div></div>
            <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-slate-500" aria-hidden="true"/><div className="flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-bold"><button className={`rounded-full px-2 py-1 ${language === "en" ? "bg-slate-900 text-white" : "text-slate-500"}`} onClick={() => setLanguage("en")}>EN</button><button className={`rounded-full px-2 py-1 ${language === "te" ? "bg-slate-900 text-white" : "text-slate-500"}`} onClick={() => setLanguage("te")}>తెలుగు</button></div></div>
          </header>
          <div className="px-5 py-5">{language === "en" ? english : telugu}</div>
          <footer className="absolute bottom-0 flex w-full items-center gap-2 border-t border-slate-200 bg-white px-5 py-3 text-[10px] text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600"/>Your decision stays with you. AI only helps explain options.</footer>
        </div>
      </div>
    </div>
  </main>;
}
