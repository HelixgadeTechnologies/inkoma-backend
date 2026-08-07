'use client';

import * as React from "react";
import { Type, Moon, Sun, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoryStore } from "@/hooks/useStory";
import { cn } from "@/lib/utils";

export function TypographyCustomizer() {
  const { fontSize, setFontSize, readingTheme, setReadingTheme } = useStoryStore();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-1.5 h-9 rounded-xl border-white/10 text-xs"
      >
        <Type className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Appearance</span>
      </Button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-folklore-amber/30 bg-folklore-obsidian p-4 shadow-2xl animate-in zoom-in-95 text-white">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Reading Parchment & Size
          </h4>

          {/* Size buttons */}
          <div className="mb-4">
            <span className="text-xs text-neutral-300 block mb-1.5">Font Scale</span>
            <div className="grid grid-cols-4 gap-1">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={cn(
                    "rounded-lg py-1.5 text-xs font-bold transition-all",
                    fontSize === s
                      ? "bg-folklore-amber text-folklore-night"
                      : "bg-white/5 text-neutral-300 hover:bg-white/10"
                  )}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Parchment background themes */}
          <div>
            <span className="text-xs text-neutral-300 block mb-1.5">Theme Palette</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setReadingTheme('night')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'night'
                    ? "border-folklore-gold bg-folklore-night text-folklore-gold font-bold"
                    : "border-white/10 bg-folklore-night/50 text-neutral-400"
                )}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Night Lore</span>
              </button>

              <button
                onClick={() => setReadingTheme('parchment')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'parchment'
                    ? "border-folklore-terracotta bg-[#F1E9DB] text-amber-950 font-bold"
                    : "border-white/10 bg-[#F1E9DB]/20 text-neutral-300"
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Parchment</span>
              </button>

              <button
                onClick={() => setReadingTheme('sandstone')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'sandstone'
                    ? "border-folklore-amber bg-[#231A14] text-amber-200 font-bold"
                    : "border-white/10 bg-[#231A14]/40 text-neutral-400"
                )}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Sahara</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
