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
        className="gap-1.5 h-9 rounded-xl border border-stone-200 text-stone-800 bg-white hover:bg-stone-50 text-xs shadow-sm"
      >
        <Type className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Appearance</span>
      </Button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl animate-in zoom-in-95 text-stone-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Reading Parchment & Size
          </h4>

          {/* Size buttons */}
          <div className="mb-4">
            <span className="text-xs text-stone-700 font-medium block mb-1.5">Font Scale</span>
            <div className="grid grid-cols-4 gap-1">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={cn(
                    "rounded-lg py-1.5 text-xs font-bold transition-all",
                    fontSize === s
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  )}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Parchment background themes */}
          <div>
            <span className="text-xs text-stone-700 font-medium block mb-1.5">Theme Palette</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setReadingTheme('parchment')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'parchment'
                    ? "border-amber-600 bg-[#F1E9DB] text-amber-950 font-bold shadow-sm"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Parchment</span>
              </button>

              <button
                onClick={() => setReadingTheme('night')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'night'
                    ? "border-stone-800 bg-stone-900 text-white font-bold shadow-sm"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                )}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Night Lore</span>
              </button>

              <button
                onClick={() => setReadingTheme('sandstone')}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] border transition-all",
                  readingTheme === 'sandstone'
                    ? "border-amber-800 bg-amber-900 text-amber-100 font-bold shadow-sm"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
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
