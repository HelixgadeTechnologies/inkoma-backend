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
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-folklore-amber/20 bg-folklore-obsidian/95 backdrop-blur-xl p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-folklore-gold" />
          <h3 className="font-serif text-lg font-bold">Chronicles & Chapters</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white"
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
                  ? "border-folklore-amber bg-folklore-amber/15 shadow-lg shadow-folklore-amber/5"
                  : "border-white/10 bg-folklore-night/50 hover:border-folklore-amber/40 hover:bg-white/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-folklore-amber uppercase tracking-wider">
                  Chapter {chap.number}
                </span>
                <Badge variant="secondary" className="text-[10px] gap-1 py-0">
                  <GitBranch className="h-3 w-3" />
                  {totalNodes} branches
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-bold text-white group-hover:text-folklore-gold">
                  {chap.title}
                </h4>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </div>

              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {chap.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between">
        <span>Interactive Choice Map</span>
        <span className="text-folklore-gold font-medium">All paths recorded</span>
      </div>
    </div>
  );
}
