"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Check,
  BookOpen,
  Volume2,
  Send,
  Clock,
  ChevronRight,
  ChevronLeft,
  FileText,
  Plus,
  Wand2,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { StoryCoverPicker, FOLKLORE_COVER_PRESETS } from "@/components/features/editor/story-cover-picker";
import { ChapterListBuilder, calculateReadTime } from "@/components/features/editor/chapter-list-builder";
import { StoryChapter, StoryStatus } from "@/types";
import { MAIN_GENRES, SUB_GENRES, TRIGGER_WARNINGS } from "@/config/genres";

export default function StudioNewStoryPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3>(1);

  // --- Step 1: Story Metadata State ---
  const [title, setTitle] = React.useState("Whispers of the Velvet Night");
  const [subtitle, setSubtitle] = React.useState("A Tale of Unexpected Alliances");
  const [coverImage, setCoverImage] = React.useState(FOLKLORE_COVER_PRESETS[0].url);
  const [synopsis, setSynopsis] = React.useState(
    "In a city divided by rivalry, two strangers uncover a hidden secret that could alter the course of their lives forever."
  );
  const [mainGenre, setMainGenre] = React.useState("Romance");
  const [targetAudience, setTargetAudience] = React.useState("Young Adult");
  const [subGenres, setSubGenres] = React.useState<string[]>(["Drama", "Contemporary"]);
  const [selectedTriggerWarnings, setSelectedTriggerWarnings] = React.useState<string[]>(["None"]);
  const [tagInput, setTagInput] = React.useState("");

  // Format Toggles
  const [hasAudioNarration, setHasAudioNarration] = React.useState(false);
  const [enableTips, setEnableTips] = React.useState(true);
  const [status, setStatus] = React.useState<StoryStatus>("ongoing");

  // --- Step 2: Book Chapters State ---
  const defaultInitialContent = `The rain beat steadily against the windowpane as Clara adjusted her coat. Outside, the streetlights cast long amber shadows across the wet cobblestones...`;

  const [chapters, setChapters] = React.useState<StoryChapter[]>([
    {
      id: "chapter-1",
      storyId: "draft-story",
      number: 1,
      chapterNumber: 1,
      title: "Chapter 1: Rain in the Metropolis",
      summary: "Clara meets Julian under unexpected circumstances during a stormy evening.",
      synopsis: "Clara meets Julian under unexpected circumstances during a stormy evening.",
      content: defaultInitialContent,
      status: "draft",
      estimatedReadTime: calculateReadTime(defaultInitialContent),
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      hasAudioNarration: false,
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
    },
  ]);

  // Selected Chapter for Editing
  const [selectedChapterId, setSelectedChapterId] = React.useState<string>("chapter-1");
  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  // Writing Assistance State
  const [showWritingAssistant, setShowWritingAssistant] = React.useState(true);

  // --- Actions ---
  const [saved, setSaved] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !subGenres.includes(tagInput.trim())) {
      setSubGenres([...subGenres, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSubGenres(subGenres.filter((t) => t !== tag));
  };

  const toggleTriggerWarning = (tw: string) => {
    if (tw === "None") {
      setSelectedTriggerWarnings(["None"]);
    } else {
      const filtered = selectedTriggerWarnings.filter((item) => item !== "None");
      if (filtered.includes(tw)) {
        const next = filtered.filter((item) => item !== tw);
        setSelectedTriggerWarnings(next.length === 0 ? ["None"] : next);
      } else {
        setSelectedTriggerWarnings([...filtered, tw]);
      }
    }
  };

  const handleAddNewChapter = () => {
    const nextNum = chapters.length + 1;
    const defaultContent = `The morning brought a fragile quiet over the city as Chapter ${nextNum} began...`;
    const newChap: StoryChapter = {
      id: `chapter-${Date.now()}`,
      storyId: "draft-story",
      number: nextNum,
      chapterNumber: nextNum,
      title: `Chapter ${nextNum}: Unspoken Words`,
      summary: "A new revelation changes everything Clara thought she knew.",
      synopsis: "A new revelation changes everything Clara thought she knew.",
      content: defaultContent,
      estimatedReadTime: calculateReadTime(defaultContent),
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      hasAudioNarration: false,
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
    };

    setChapters((prev) => [...prev, newChap]);
    setSelectedChapterId(newChap.id);
  };

  const handleUpdateActiveChapter = (field: keyof StoryChapter, value: any) => {
    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id === selectedChapterId) {
          const updated = {
            ...chap,
            [field]: value,
          };
          if (field === "content") {
            updated.estimatedReadTime = calculateReadTime(value);
          }
          return updated;
        }
        return chap;
      })
    );
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setSaved(true);
      router.push("/studio");
    }, 1200);
  };

  // Content analysis for Writing Assistant
  const activeContent = activeChapter?.content || "";
  const activeWordCount = activeContent.trim().split(/\s+/).filter(Boolean).length;
  const activeReadTime = calculateReadTime(activeContent);

  // Simple grammar check heuristic suggestions
  const grammarSuggestions = React.useMemo(() => {
    const suggestions: { text: string; hint: string; type: "spelling" | "style" | "readability" }[] = [];
    if (activeContent.includes("very ")) {
      suggestions.push({
        text: "Consider replacing 'very'",
        hint: "Use stronger verbs or descriptive adjectives instead of modifying with 'very'.",
        type: "style",
      });
    }
    if (activeContent.includes("  ")) {
      suggestions.push({
        text: "Multiple consecutive spaces detected",
        hint: "Clean up double spacing between words.",
        type: "spelling",
      });
    }
    if (activeWordCount > 150 && activeWordCount < 300) {
      suggestions.push({
        text: "Good chapter opening length",
        hint: "Your narrative rhythm flow looks well-balanced.",
        type: "readability",
      });
    }
    return suggestions;
  }, [activeContent, activeWordCount]);

  return (
    <div className="space-y-8 pb-24 w-full">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <Link
          href="/studio"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-[#680C07] dark:hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Writer Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
            className="gap-1.5 text-xs border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300"
          >
            {saved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{saved ? "Draft Saved!" : "Save Draft"}</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold gap-1.5 rounded-xl px-5 shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isPublishing ? "Publishing..." : "Publish Book"}</span>
          </Button>
        </div>
      </div>

      {/* Header & Step Wizard Bar */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#680C07] dark:text-red-400">
            INKOMA Writer Studio
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight mt-0.5">
            Create & Publish New Book
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Fill in your story metadata, write your chapters with real-time writing assistance, and publish to readers worldwide.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800">
          {[
            { step: 1, label: "1. Story Identity", icon: FileText },
            { step: 2, label: "2. Chapters & Writing Assistant", icon: BookOpen },
            { step: 3, label: "3. Review & Publish", icon: Check },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.step;
            const isDone = activeStep > s.step;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step as any)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
                    : isDone
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: STORY IDENTITY & METADATA */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Cover Artwork Picker */}
          <StoryCoverPicker value={coverImage} onChange={(url) => setCoverImage(url)} />

          {/* Story Identity Fields */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif border-b border-stone-100 dark:border-stone-800 pb-3">
              Story Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Book Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Whispers of the Velvet Night"
                  className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-serif font-bold text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Subtitle (Optional)
                </label>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. A Tale of Unexpected Alliances"
                  className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                />
              </div>
            </div>

            {/* Genre & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                  Main Genre *
                </label>
                <Select
                  value={mainGenre}
                  onChange={(val) => setMainGenre(val)}
                  options={MAIN_GENRES.map((g) => ({ value: g, label: g }))}
                  className="dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                  Target Audience *
                </label>
                <Select
                  value={targetAudience}
                  onChange={(val) => setTargetAudience(val)}
                  options={[
                    { value: "All Ages", label: "All Ages" },
                    { value: "Young Adult (YA)", label: "Young Adult (YA)" },
                    { value: "New Adult", label: "New Adult" },
                    { value: "Adult", label: "Adult (18+)" },
                  ]}
                  className="dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100"
                />
              </div>
            </div>

            {/* Subgenres */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Subgenres
              </label>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Select
                  value=""
                  onChange={(val) => {
                    if (val && !subGenres.includes(val)) {
                      setSubGenres([...subGenres, val]);
                    }
                  }}
                  options={[
                    { value: "", label: "-- Select from Preset Subgenres --" },
                    ...SUB_GENRES.map((sg) => ({ value: sg, label: sg })),
                  ]}
                  className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-xs dark:text-stone-100 max-w-xs"
                />

                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Or type a custom subgenre..."
                    className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-xs dark:text-stone-100"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    className="text-xs rounded-xl border-stone-300 dark:border-stone-700"
                  >
                    Add Custom
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {subGenres.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30 text-xs font-semibold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-stone-900 dark:hover:text-white font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Full Synopsis */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Full Synopsis *
              </label>
              <textarea
                rows={4}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Write a compelling synopsis summarizing your story's plot, central conflict, and hook..."
                className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                required
              />
            </div>

            {/* Trigger Warnings (Optional) */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                  Content & Trigger Warnings ({selectedTriggerWarnings.length} selected)
                </label>
                {selectedTriggerWarnings.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTriggerWarnings(["None"])}
                    className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-semibold"
                  >
                    Reset Warnings
                  </button>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto p-3 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-wrap gap-2 scrollbar-thin">
                {TRIGGER_WARNINGS.map((tw) => {
                  const isChecked = selectedTriggerWarnings.includes(tw);
                  return (
                    <button
                      key={tw}
                      type="button"
                      onClick={() => toggleTriggerWarning(tw)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isChecked
                          ? "bg-[#680C07] dark:bg-red-700 text-white border-[#680C07] dark:border-red-700 shadow-xs"
                          : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      {tw}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={() => setActiveStep(2)}
              className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Continue to Chapters & Writing Assistant <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: BOOK CHAPTERS & WRITING ASSISTANT */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Chapter Manager List */}
          <ChapterListBuilder
            chapters={chapters}
            onChange={(updatedChaps) => setChapters(updatedChaps)}
            onSelectChapterToEdit={(chap) => setSelectedChapterId(chap.id)}
          />

          {/* Chapter Content & Prose Editor with Writing Assistant */}
          {activeChapter && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Editor (2 Cols) */}
              <div className="lg:col-span-2 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#680C07] dark:text-red-400">
                      Chapter Editor
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                      {activeChapter.title}
                    </h3>
                  </div>
                  <Badge className="bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 text-[10px]">
                    Chapter {activeChapter.chapterNumber} Selected
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Chapter Title *
                  </label>
                  <Input
                    value={activeChapter.title}
                    onChange={(e) => handleUpdateActiveChapter("title", e.target.value)}
                    placeholder="e.g. Chapter 1: Rain in the Metropolis"
                    className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-serif font-bold text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Chapter Summary / Teaser
                  </label>
                  <Input
                    value={activeChapter.synopsis || activeChapter.summary || ""}
                    onChange={(e) => {
                      handleUpdateActiveChapter("synopsis", e.target.value);
                      handleUpdateActiveChapter("summary", e.target.value);
                    }}
                    placeholder="Brief teaser for readers in table of contents..."
                    className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>

                {/* Prose Text Area */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Chapter Content & Story Text
                    </label>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {activeWordCount} words • ~{activeReadTime} min read
                    </span>
                  </div>
                  <textarea
                    rows={14}
                    value={activeChapter.content || ""}
                    onChange={(e) => handleUpdateActiveChapter("content", e.target.value)}
                    placeholder="Write or paste your chapter text here. Unlimited word count supported..."
                    className="w-full bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 text-sm text-stone-900 dark:text-stone-100 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-center">
                  <Button
                    type="button"
                    onClick={handleAddNewChapter}
                    className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl gap-2 px-6 py-5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Chapter {chapters.length + 1} to Book</span>
                  </Button>
                </div>
              </div>

              {/* Writing Assistant Panel (1 Col) */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-[#680C07] dark:text-red-400" />
                      <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
                        Writing Assistant
                      </h3>
                    </div>
                    <Badge className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 text-[10px]">
                      Live Helper
                    </Badge>
                  </div>

                  {/* Chapter Stats */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Word Count</span>
                      <strong className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">{activeWordCount}</strong>
                    </div>
                    <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Read Time</span>
                      <strong className="text-lg font-bold text-[#680C07] dark:text-red-400 font-serif">~{activeReadTime} min</strong>
                    </div>
                  </div>

                  {/* Suggestions List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                      Spelling & Style Insights
                    </span>

                    {grammarSuggestions.length === 0 ? (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Prose looks clean and well-structured!</span>
                      </div>
                    ) : (
                      grammarSuggestions.map((s, idx) => (
                        <div key={idx} className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{s.text}</span>
                          </div>
                          <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed">
                            {s.hint}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveStep(1)}
              className="text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Story Identity
            </Button>

            <Button
              type="button"
              onClick={() => setActiveStep(3)}
              className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Continue to Review & Publish <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & PUBLISH */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Story Card Preview */}
            <div>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-2">
                Explore Card Preview
              </span>
              <div className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-md">
                <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800">
                  <Image src={coverImage} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <Badge className="bg-[#680C07] text-white backdrop-blur-xs text-[10px] font-medium border-0">
                      {mainGenre}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1 drop-shadow-xs">
                      <Clock className="w-3 h-3 text-red-200" /> ~{activeReadTime} min
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-red-200">
                      <BookOpen className="w-2.5 h-2.5" /> {chapters.length} chapters
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#680C07] dark:text-red-400 uppercase tracking-wider block">
                    {mainGenre}
                  </span>
                  <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif leading-tight">{title}</h4>
                  {subtitle && <p className="text-xs text-stone-500 dark:text-stone-400 italic">{subtitle}</p>}
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">{synopsis}</p>
                </div>
              </div>
            </div>

            {/* Publishing Controls */}
            <div className="md:col-span-2 space-y-5 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif border-b border-stone-100 dark:border-stone-800 pb-3">
                Publishing Status & Patron Support
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                    Publication Status
                  </label>
                  <Select
                    value={status}
                    onChange={(val) => setStatus(val as StoryStatus)}
                    options={[
                      { value: "ongoing", label: "Ongoing Book (Publishing chapters progressively)" },
                      { value: "completed", label: "Completed Book (All chapters finished)" },
                      { value: "draft", label: "Private Draft" },
                    ]}
                    className="max-w-sm dark:bg-stone-950 dark:border-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Summary Checklist */}
              <div className="p-4 bg-[#680C07]/5 dark:bg-red-500/10 rounded-2xl border border-[#680C07]/20 dark:border-red-500/20 space-y-2 text-xs text-stone-800 dark:text-stone-200">
                <span className="font-bold text-[#680C07] dark:text-red-400 block uppercase tracking-wider text-[11px]">
                  Book Summary Checklist
                </span>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Main Genre: <strong>{mainGenre}</strong> • Target Audience: <strong>{targetAudience}</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{chapters.length}</strong> Book Chapter(s) configured</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trigger Warnings: <strong>{selectedTriggerWarnings.join(", ")}</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(2)}
                  className="text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Chapters
                </Button>

                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl gap-2 px-8 py-6 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPublishing ? "Publishing Book..." : "Publish Book to INKOMA"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
