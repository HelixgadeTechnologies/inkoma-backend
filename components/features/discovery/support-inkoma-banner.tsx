"use client";

import { useState } from "react";
import { Heart, Sparkles, X, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupportInkomaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white p-6 sm:p-8 shadow-lg border border-amber-800/40">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 rounded-full bg-orange-600/10 blur-xl pointer-events-none" />

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 transition-colors p-1"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Support Living African Lore
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-amber-50">
            Empower Independent African Griots & Storytellers
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Inkoma is 100% committed to digitizing oral traditions, indigenous dialects, and branching interactive mythology. Your patron support directly funds creator stipends, elder audio recording sessions, and open folklore archives.
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-200/80 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Paystack Patron
            </span>
            <span>• Direct Creator Royalties</span>
            <span>• Zero Subscription Paywalls</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href="https://paystack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold px-6 py-5 shadow-md">
              <Sparkles className="w-4 h-4 mr-2" />
              Support INKOMA
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
