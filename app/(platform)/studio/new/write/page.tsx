"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List as ListIcon,
  ListOrdered,
  Minus,
  Sparkles,
  Undo,
  Redo,
  Eye,
  Edit3,
  Save,
  Check,
  ChevronRight,
  BookOpen,
  Volume2,
  Clock,
  Columns,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoryChapter, StoryStatus } from "@/types";
import { ProseRenderer } from "@/components/features/editor/prose-renderer";
import { calculateReadTime } from "@/components/features/editor/chapter-list-builder";

export default function DedicatedChapterWriterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E0D12] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500 font-serif">Opening Writing Studio...</p>
          </div>
        </div>
      }
    >
      <DedicatedChapterWriterContent />
    </React.Suspense>
  );
}

function DedicatedChapterWriterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialChapterId = searchParams.get("chapterId");

  // Story & Chapters state loaded from localStorage
  const [storyTitle, setStoryTitle] = React.useState<string>("Untitled Story");
  const [chapters, setChapters] = React.useState<StoryChapter[]>([]);
  const [selectedChapterId, setSelectedChapterId] = React.useState<string>(initialChapterId || "");
  const [activeTab, setActiveTab] = React.useState<"write" | "preview" | "split">("write");
  const [isSaved, setIsSaved] = React.useState(true);
  const [saveToast, setSaveToast] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  // Load draft story from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("inkoma_draft_story");
      if (stored) {
        const draft = JSON.parse(stored);
        if (draft.title) setStoryTitle(draft.title);
        if (Array.isArray(draft.chapters) && draft.chapters.length > 0) {
          setChapters(draft.chapters);
          if (initialChapterId && draft.chapters.some((c: StoryChapter) => c.id === initialChapterId)) {
            setSelectedChapterId(initialChapterId);
          } else {
            setSelectedChapterId(draft.selectedChapterId || draft.chapters[0].id);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [initialChapterId]);

  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0] || {
    id: "chapter-1",
    number: 1,
    chapterNumber: 1,
    title: "Chapter 1: The Gathering",
    content: "",
    synopsis: "",
    estimatedReadTime: 1,
  };

  const activeContent = activeChapter?.content || "";
  const wordCount = activeContent.trim().split(/\s+/).filter(Boolean).length;
  const charCount = activeContent.length;
  const readTime = calculateReadTime(activeContent);

  // Update active chapter field
  const updateActiveChapter = (field: keyof StoryChapter, value: any) => {
    setIsSaved(false);
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id === activeChapter.id) {
          const updated = { ...c, [field]: value };
          if (field === "content") {
            updated.estimatedReadTime = calculateReadTime(value);
          }
          return updated;
        }
        return c;
      })
    );
  };

  // Save current progress to localStorage
  const saveProgress = (destinationStep?: number) => {
    try {
      const stored = localStorage.getItem("inkoma_draft_story");
      const currentDraft = stored ? JSON.parse(stored) : {};
      const updatedDraft = {
        ...currentDraft,
        title: storyTitle,
        chapters: chapters,
        selectedChapterId: activeChapter.id,
        activeStep: destinationStep !== undefined ? destinationStep : currentDraft.activeStep || 3,
      };
      localStorage.setItem("inkoma_draft_story", JSON.stringify(updatedDraft));
      setIsSaved(true);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    } catch {
      // ignore
    }
  };

  // Text formatting insertion helpers
  const applyFormatting = (prefix: string, suffix: string = "", defaultPlaceholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = activeContent;

    const selectedText = currentVal.substring(start, end) || defaultPlaceholder;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const nextVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    updateActiveChapter("content", nextVal);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const insertBlock = (blockText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const currentVal = activeContent;
    const isAtNewLine = start === 0 || currentVal[start - 1] === "\n";
    const insertion = isAtNewLine ? `${blockText}\n` : `\n\n${blockText}\n`;

    const nextVal = currentVal.substring(0, start) + insertion + currentVal.substring(start);
    updateActiveChapter("content", nextVal);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + insertion.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 10);
  };

  // Handle hotkeys (Ctrl+B, Ctrl+I, Ctrl+U)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyFormatting("**", "**", "bold text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      applyFormatting("*", "*", "italic text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
      e.preventDefault();
      applyFormatting("<u>", "</u>", "underlined text");
    }
  };

  const handleReturnToStudio = () => {
    saveProgress(3); // return to Step 3: Chapters
    router.push("/studio/new");
  };

  const handleGoToReaderPreview = () => {
    saveProgress(4); // navigate to Step 4: Preview!
    router.push("/studio/new");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E0D12] text-stone-900 dark:text-stone-100 flex flex-col font-sans">
      {/* ── Top Header Navigation Bar ── */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#141318]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReturnToStudio}
            className="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white rounded-xl gap-1.5 text-xs font-semibold px-2.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Story Setup</span>
          </Button>

          <div className="h-4 w-[1px] bg-stone-300 dark:bg-stone-700 hidden sm:block" />

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white truncate font-serif">
              {storyTitle || "Untitled Story"}
            </h1>
            <p className="text-[11px] text-stone-500 truncate flex items-center gap-1.5">
              <span>Ch. {activeChapter.chapterNumber || activeChapter.number}: {activeChapter.title}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#D4AF37]"></span>
              <span>{isSaved ? "Saved" : "Unsaved changes"}</span>
            </p>
          </div>
        </div>

        {/* Chapter Switcher & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {chapters.length > 1 && (
            <select
              value={activeChapter.id}
              onChange={(e) => {
                saveProgress();
                setSelectedChapterId(e.target.value);
              }}
              className="bg-stone-100 dark:bg-[#1c1b22] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 rounded-xl px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37] max-w-[140px] sm:max-w-[180px] truncate"
            >
              {chapters.map((chap) => (
                <option key={chap.id} value={chap.id}>
                  Ch. {chap.chapterNumber || chap.number}: {chap.title}
                </option>
              ))}
            </select>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGoToReaderPreview}
            className="rounded-xl border-[#D4AF37]/50 text-[#B8860B] dark:text-[#E5C158] hover:bg-[#D4AF37]/10 text-xs font-bold gap-1.5 px-3"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview as Reader</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleReturnToStudio}
            className="bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 text-xs font-extrabold rounded-xl gap-1.5 px-4 shadow-sm"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Save &amp; Return</span>
          </Button>
        </div>
      </header>

      {/* ── Main Writer Container ── */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Chapter Title & Summary Editor Card */}
        <div className="bg-white dark:bg-[#141318] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Chapter Title
              </label>
              <Input
                value={activeChapter.title}
                onChange={(e) => updateActiveChapter("title", e.target.value)}
                placeholder="e.g. Chapter 1: The Awakening of the Spirits"
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-serif font-bold text-sm sm:text-base rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Chapter Teaser / Summary
              </label>
              <Input
                value={activeChapter.synopsis || activeChapter.summary || ""}
                onChange={(e) => {
                  updateActiveChapter("synopsis", e.target.value);
                  updateActiveChapter("summary", e.target.value);
                }}
                placeholder="Brief teaser for readers..."
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white text-xs rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* ── Proper Text Formatting Toolbar & Editor Canvas ── */}
        <div className="bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm flex flex-col">
          {/* Formatting Toolbar Header */}
          <div className="bg-stone-50 dark:bg-[#18171e] border-b border-stone-200 dark:border-stone-800 p-2.5 flex flex-wrap items-center justify-between gap-2">
            {/* Toolbar Buttons */}
            <div className="flex flex-wrap items-center gap-1">
              {/* Bold */}
              <button
                type="button"
                onClick={() => applyFormatting("**", "**", "bold text")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>

              {/* Italic */}
              <button
                type="button"
                onClick={() => applyFormatting("*", "*", "italic text")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>

              {/* Underline */}
              <button
                type="button"
                onClick={() => applyFormatting("<u>", "</u>", "underlined text")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Underline (Ctrl+U)"
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>

              {/* Strikethrough */}
              <button
                type="button"
                onClick={() => applyFormatting("~~", "~~", "strikethrough text")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </button>

              <div className="h-4 w-[1px] bg-stone-300 dark:bg-stone-700 mx-1" />

              {/* Headings */}
              <button
                type="button"
                onClick={() => insertBlock("# Section Title")}
                className="px-2 py-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1 transition-colors"
                title="Heading 1"
              >
                <Heading1 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertBlock("## Chapter Subtitle")}
                className="px-2 py-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1 transition-colors"
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => insertBlock("### Lore Note")}
                className="px-2 py-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1 transition-colors"
                title="Heading 3"
              >
                <Heading3 className="w-4 h-4" />
              </button>

              <div className="h-4 w-[1px] bg-stone-300 dark:bg-stone-700 mx-1" />

              {/* Quote / Ancestral Proverb */}
              <button
                type="button"
                onClick={() => insertBlock('> "When the roots of a tree begin to decay, it spreads death to the branches." — Ancient Akan Proverb')}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Insert Proverb / Quote"
              >
                <Quote className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* Bullet list */}
              <button
                type="button"
                onClick={() => insertBlock("- First omen of the sunset\n- Second warning of the elders\n- The whispered talisman")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Bulleted List"
              >
                <ListIcon className="w-4 h-4" />
              </button>

              {/* Numbered list */}
              <button
                type="button"
                onClick={() => insertBlock("1. The gathering at dawn\n2. The crossing of the sacred river\n3. The awakening of the shrine")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>

              {/* Scene Divider */}
              <button
                type="button"
                onClick={() => insertBlock("***")}
                className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                title="Scene Divider (✦ ✦ ✦)"
              >
                <Minus className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* Oral Lore Callout */}
              <button
                type="button"
                onClick={() => insertBlock(":::lore\nAmong the Yoruba griots, this chapter of the myth is traditionally accompanied by the soft rhythm of the bata drum.\n:::")}
                className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#B8860B] dark:text-[#E5C158] font-bold text-xs flex items-center gap-1 transition-colors border border-[#D4AF37]/30"
                title="Insert Oral Lore Cultural Note"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Oral Lore Box</span>
              </button>
            </div>

            {/* View Mode Switcher (Write / Preview / Split) */}
            <div className="flex items-center gap-1 bg-stone-200/80 dark:bg-stone-800/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "write"
                    ? "bg-white dark:bg-[#141318] text-stone-950 dark:text-white shadow-2xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                Write
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "preview"
                    ? "bg-white dark:bg-[#141318] text-stone-950 dark:text-white shadow-2xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                Formatted
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("split")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all hidden md:flex items-center ${
                  activeTab === "split"
                    ? "bg-white dark:bg-[#141318] text-stone-950 dark:text-white shadow-2xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
              >
                <Columns className="w-3.5 h-3.5 mr-1" />
                Split
              </button>
            </div>
          </div>

          {/* ── Editor Canvas / Input Field ── */}
          <div className="flex-1 min-h-[420px] flex flex-col md:flex-row">
            {/* Write Textarea */}
            {(activeTab === "write" || activeTab === "split") && (
              <div className={`p-4 sm:p-6 flex-1 flex flex-col ${activeTab === "split" ? "md:border-r border-stone-200 dark:border-stone-800" : ""}`}>
                <textarea
                  ref={textareaRef}
                  value={activeContent}
                  onChange={(e) => updateActiveChapter("content", e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Begin writing your chapter prose here... Use the formatting toolbar above or shortcuts like Ctrl+B for bold, Ctrl+I for italic, > for proverbs."
                  className="w-full flex-1 min-h-[380px] bg-transparent text-stone-900 dark:text-white font-serif text-base sm:text-lg leading-relaxed sm:leading-loose focus:outline-none resize-y placeholder:text-stone-400 dark:placeholder:text-stone-600"
                />
              </div>
            )}

            {/* Formatted Preview */}
            {(activeTab === "preview" || activeTab === "split") && (
              <div className="p-4 sm:p-8 flex-1 bg-[#FAF6EE]/50 dark:bg-[#121115] overflow-y-auto max-h-[600px] border-t md:border-t-0 border-stone-200 dark:border-stone-800">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="border-b border-[#D4AF37]/30 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      Live Reader Preview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
                      {activeChapter.title}
                    </h2>
                  </div>
                  <ProseRenderer content={activeContent} />
                </div>
              </div>
            )}
          </div>

          {/* Statistics Bottom Bar */}
          <div className="bg-stone-50 dark:bg-[#18171e] border-t border-stone-200 dark:border-stone-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-4 font-mono">
              <span><strong>{wordCount}</strong> words</span>
              <span><strong>{charCount}</strong> characters</span>
              <span className="flex items-center gap-1 text-[#D4AF37] font-sans font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> ~{readTime} min read
              </span>
            </div>

            <div className="flex items-center gap-3">
              {saveToast && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in text-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Draft Saved to Local Storage
                </span>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => saveProgress()}
                className="h-8 text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-[#D4AF37]" /> Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
