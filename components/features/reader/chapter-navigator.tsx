'use client';

import * as React from "react";
import { Story, StoryChapter } from "@/types";
import { useStoryStore } from "@/hooks/useStory";
import { BookOpen, GitBranch, CheckCircle2, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ChapterNavigator({
  chapters,
  isOpen,
  onClose,
}: {
  chapters: StoryChapter[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeChapterIndex, setChapterIndex } = useStoryStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-stone-200 bg-[#FAF8F5]/98 backdrop-blur-xl p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col text-stone-900">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-folklore-amber" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Chronicles & Chapters</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Chapters list */}
      <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
        {chapters.map((chap, idx) => {
          const isActive = activeChapterIndex === idx;
          const totalNodes = Object.keys(chap.nodes).length;

          return (
            <button
              key={chap.id}
              onClick={() => {
                setChapterIndex(idx);
                onClose();
              }}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5",
                isActive
                  ? "border-amber-400 bg-amber-100/90 shadow-md"
                  : "border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Chapter {chap.number}
                </span>
                <Badge variant="secondary" className="text-[10px] gap-1 py-0 bg-stone-100 text-stone-700">
                  <GitBranch className="h-3 w-3" />
                  {totalNodes} branches
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900">
                  {chap.title}
                </h4>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </div>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {chap.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
        <span>Interactive Choice Map</span>
        <span className="text-folklore-amber font-semibold">All paths recorded</span>
      </div>
    </div>
  );
}
