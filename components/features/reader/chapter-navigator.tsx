'use client';

import * as React from "react";
import { StoryChapter } from "@/types";
import { useStoryStore } from "@/hooks/useStory";
import { BookOpen, GitBranch, ChevronRight, X, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ChapterNavigatorProps {
  chapters: StoryChapter[];
  isOpen?: boolean;
  onClose?: () => void;
  currentChapterNumber?: number;
  onSelectChapter?: (chapterNumber: number) => void;
}

export function ChapterNavigator({
  chapters,
  isOpen: propIsOpen,
  onClose: propOnClose,
  currentChapterNumber,
  onSelectChapter,
}: ChapterNavigatorProps) {
  const { activeChapterIndex, setChapterIndex } = useStoryStore();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = propIsOpen !== undefined;
  const isCurrentlyOpen = isControlled ? propIsOpen : internalOpen;

  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  const handleChapterClick = (chap: StoryChapter, idx: number) => {
    if (onSelectChapter) {
      onSelectChapter(chap.number);
    } else {
      setChapterIndex(idx);
    }
    handleClose();
  };

  return (
    <>
      {/* Floating Trigger Button if rendered directly without external controller */}
      {!isControlled && (
        <div className="fixed bottom-6 left-6 z-40">
          <Button
            onClick={() => setInternalOpen(true)}
            className="bg-stone-900 hover:bg-black text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2 text-xs border border-stone-700"
          >
            <Layers className="w-4 h-4 text-[#680C07]" />
            <span>Chapters ({chapters.length})</span>
          </Button>
        </div>
      )}

      {isCurrentlyOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-stone-200 bg-[#FAF8F5]/98 backdrop-blur-xl p-6 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col text-stone-900">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#680C07]" />
              <h3 className="font-serif text-lg font-bold text-stone-900">Chronicles & Chapters</h3>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chapters list */}
          <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
            {chapters.map((chap, idx) => {
              const isActive =
                currentChapterNumber !== undefined
                  ? currentChapterNumber === chap.number
                  : activeChapterIndex === idx;
              const totalNodes = chap.nodes ? Object.keys(chap.nodes).length : 1;

              return (
                <button
                  key={chap.id || idx}
                  onClick={() => handleChapterClick(chap, idx)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5",
                    isActive
                      ? "border-[#680C07] bg-[#680C07]/10 shadow-md text-[#680C07]"
                      : "border-stone-200 bg-white hover:border-[#680C07]/30 hover:bg-[#680C07]/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Chapter {chap.number}
                    </span>
                    <Badge variant="secondary" className="text-[10px] gap-1 py-0 bg-stone-100 text-stone-700">
                      <GitBranch className="h-3 w-3" />
                      {totalNodes} branches
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      {chap.title}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-stone-400" />
                  </div>

                  {chap.summary && (
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {chap.summary}
                    </p>
                  )}
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
      )}
    </>
  );
}
