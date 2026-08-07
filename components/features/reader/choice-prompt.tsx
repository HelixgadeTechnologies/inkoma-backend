'use client';

import * as React from "react";
import { StoryChoice } from "@/types";
import { GitFork, ArrowRight, Sparkles, Compass, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChoicePrompt({
  choices,
  onSelectChoice,
}: {
  choices: StoryChoice[];
  onSelectChoice: (choice: StoryChoice) => void;
}) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-folklore-amber/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-folklore-gold/20 text-folklore-gold">
          <GitFork className="h-3.5 w-3.5" />
        </div>
        <h3 className="font-serif text-lg font-bold text-folklore-gold">
          What will you decree next, Traveler?
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {choices.map((choice, idx) => (
          <button
            key={choice.id || idx}
            onClick={() => onSelectChoice(choice)}
            className="group relative flex flex-col justify-between rounded-2xl border border-folklore-amber/30 bg-gradient-to-b from-folklore-obsidian to-folklore-night/90 p-5 text-left transition-all duration-300 hover:border-folklore-amber hover:shadow-xl hover:shadow-folklore-amber/10 hover:-translate-y-0.5 active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-folklore-amber/20 text-xs font-bold text-folklore-amber">
                {String.fromCharCode(65 + idx)}
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-folklore-gold group-hover:translate-x-1 transition-all" />
            </div>

            <p className="mt-3 text-base font-serif font-bold text-white group-hover:text-folklore-gold transition-colors leading-snug">
              {choice.label}
            </p>

            {choice.consequenceHint && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-400">
                <Compass className="h-3.5 w-3.5 text-folklore-terracotta shrink-0" />
                <span className="italic">{choice.consequenceHint}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
