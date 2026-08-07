"use client";

import * as React from "react";
import { Plus, Trash2, Edit3, Volume2, Clock, FileText, ChevronDown, ChevronUp, GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoryChapter } from "@/types";

interface ChapterListBuilderProps {
  chapters: StoryChapter[];
  onChange: (chapters: StoryChapter[]) => void;
  onSelectChapterToEdit?: (chapter: StoryChapter) => void;
}

export function ChapterListBuilder({
  chapters,
  onChange,
  onSelectChapterToEdit,
}: ChapterListBuilderProps) {
  const [editingChapterId, setEditingChapterId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");
  const [editingSummary, setEditingSummary] = React.useState("");
  const [editingReadTime, setEditingReadTime] = React.useState(10);
  const [editingAudioUrl, setEditingAudioUrl] = React.useState("");

  const handleAddChapter = () => {
    const nextChapterNum = chapters.length + 1;
    const newChap: StoryChapter = {
      id: `chapter-${Date.now()}`,
      storyId: "draft-story",
      chapterNumber: nextChapterNum,
      title: `Chapter ${nextChapterNum}: The Awakening of the Spirits`,
      synopsis: "The journey continues as ancient omens reveal hidden choices ahead.",
      content: "Draft your chapter choices and oral narration prose here...",
      estimatedReadTime: 12,
      publishedAt: new Date().toISOString().split("T")[0],
      isInteractive: true,
      hasAudioNarration: false,
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
      rootNodeId: `node-${Date.now()}`,
      nodes: {
        [`node-${Date.now()}`]: {
          id: `node-${Date.now()}`,
          title: "The Crossroad of Destiny",
          content: "You stand before the sacred baobab tree...",
          choices: [],
        },
      },
    };

    const updated = [...chapters, newChap];
    onChange(updated);
    startEditing(newChap);
  };

  const startEditing = (chap: StoryChapter) => {
    setEditingChapterId(chap.id);
    setEditingTitle(chap.title);
    setEditingSummary(chap.synopsis || "");
    setEditingReadTime(chap.estimatedReadTime || 10);
    setEditingAudioUrl(chap.audioNarrationUrl || "");
  };

  const handleSaveEdit = (chapId: string) => {
    const updated = chapters.map((c) => {
      if (c.id === chapId) {
        return {
          ...c,
          title: editingTitle,
          synopsis: editingSummary,
          estimatedReadTime: editingReadTime,
          audioNarrationUrl: editingAudioUrl,
          hasAudioNarration: Boolean(editingAudioUrl.trim()),
        };
      }
      return c;
    });
    onChange(updated);
    setEditingChapterId(null);
  };

  const handleDeleteChapter = (chapId: string) => {
    if (chapters.length <= 1) return; // keep at least 1
    const filtered = chapters
      .filter((c) => c.id !== chapId)
      .map((c, idx) => ({ ...c, chapterNumber: idx + 1 }));
    onChange(filtered);
  };

  const moveChapter = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= chapters.length) return;

    const list = [...chapters];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // re-number
    const renumbered = list.map((c, idx) => ({ ...c, chapterNumber: idx + 1 }));
    onChange(renumbered);
  };

  return (
    <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 font-serif">
            Chapters & Episodes ({chapters.length})
          </h3>
          <p className="text-xs text-stone-500">
            Structure your folklore story episodes, audio narration, and decision trees.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleAddChapter}
          className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-1.5 px-4"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Episode / Chapter
        </Button>
      </div>

      <div className="space-y-3">
        {chapters.map((chap, idx) => {
          const isEditing = editingChapterId === chap.id;

          return (
            <div
              key={chap.id}
              className={`rounded-2xl border transition-all ${
                isEditing
                  ? "border-[#680C07] bg-stone-50/70 p-4 space-y-4 shadow-sm"
                  : "border-stone-200 bg-white p-4 hover:border-stone-300 shadow-xs"
              }`}
            >
              {!isEditing ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex flex-col items-center justify-center text-stone-300 hover:text-stone-600">
                      <button
                        type="button"
                        onClick={() => moveChapter(idx, "up")}
                        disabled={idx === 0}
                        className="p-0.5 disabled:opacity-20"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveChapter(idx, "down")}
                        disabled={idx === chapters.length - 1}
                        className="p-0.5 disabled:opacity-20"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                      Ch.{chap.chapterNumber}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-sm font-bold text-stone-900 truncate font-serif">
                        {chap.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" /> {chap.estimatedReadTime} min
                        </span>
                        {chap.hasAudioNarration && (
                          <span className="flex items-center gap-1 text-[#680C07] font-semibold">
                            <Volume2 className="w-3 h-3 text-[#680C07]" /> Audio Attached
                          </span>
                        )}
                        <span>•</span>
                        <span>{Object.keys(chap.nodes || {}).length} node paths</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {onSelectChapterToEdit && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectChapterToEdit(chap)}
                        className="text-xs rounded-xl border-stone-300 text-stone-700 hover:bg-stone-100"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1 text-[#680C07]" /> Node Editor
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(chap)}
                      className="text-xs rounded-xl border-stone-300 text-stone-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1 text-stone-500" /> Edit Metadata
                    </Button>

                    {chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteChapter(chap.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-[#680C07] hover:bg-[#680C07]/10 transition-colors"
                        title="Remove Chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Inline Editor Form */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-bold text-[#680C07] uppercase tracking-wider">
                      Editing Chapter {chap.chapterNumber}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleSaveEdit(chap.id)}
                      className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-1 px-3"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Chapter Title</label>
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        placeholder="e.g. Chapter 1: The Gathering of Chiefs"
                        className="bg-white border-stone-300 text-stone-900 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Est. Read Time (mins)</label>
                      <Input
                        type="number"
                        value={editingReadTime}
                        onChange={(e) => setEditingReadTime(Number(e.target.value))}
                        className="bg-white border-stone-300 text-stone-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Chapter Teaser / Summary</label>
                    <textarea
                      rows={2}
                      value={editingSummary}
                      onChange={(e) => setEditingSummary(e.target.value)}
                      placeholder="Brief teaser for readers navigating the chapter list..."
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-[#680C07]" /> Oral Narration Audio URL (Optional)
                    </label>
                    <Input
                      type="url"
                      value={editingAudioUrl}
                      onChange={(e) => setEditingAudioUrl(e.target.value)}
                      placeholder="https://storage.googleapis.com/inkoma-audio/chapter-1.mp3"
                      className="bg-white border-stone-300 text-stone-900 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
