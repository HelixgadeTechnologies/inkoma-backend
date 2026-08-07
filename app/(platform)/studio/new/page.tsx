"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Sparkles,
  GitBranch,
  GitFork,
  Play,
  Check,
  Eye,
  BookOpen,
  Volume2,
  Users,
  Send,
  Layers,
  HelpCircle,
  Clock,
  Heart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { StoryCoverPicker, FOLKLORE_COVER_PRESETS } from "@/components/features/editor/story-cover-picker";
import { ChapterListBuilder } from "@/components/features/editor/chapter-list-builder";
import { BranchNodeCreator } from "@/components/features/editor/branch-node-creator";
import { CharacterTree } from "@/components/features/editor/character-tree";
import { TRADITIONS, GENRES } from "@/config/genres";
import { StoryChapter, StoryNode, StoryStatus } from "@/types";

export default function StudioNewStoryPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4>(1);

  // --- Step 1: Story Metadata State ---
  const [title, setTitle] = React.useState("The Legend of the Golden Stool");
  const [subtitle, setSubtitle] = React.useState("The Sunsum of the Seven Clans");
  const [coverImage, setCoverImage] = React.useState(FOLKLORE_COVER_PRESETS[1].url);
  const [synopsis, setSynopsis] = React.useState(
    "High priest Okomfo Anokye summons the solid gold stool from the clouds, uniting the sovereign clans of the Ashanti under an unbreakable oath."
  );
  const [tradition, setTradition] = React.useState("Ashanti/Akan");
  const [mainGenre, setMainGenre] = React.useState("Ancestral Legend");
  const [targetAudience, setTargetAudience] = React.useState("All Ages");
  const [subGenres, setSubGenres] = React.useState<string[]>(["Folklore", "Heroic Epics"]);
  const [tagInput, setTagInput] = React.useState("");

  // Format Toggles
  const [isInteractive, setIsInteractive] = React.useState(true);
  const [hasAudioNarration, setHasAudioNarration] = React.useState(true);
  const [enableTips, setEnableTips] = React.useState(true);
  const [status, setStatus] = React.useState<StoryStatus>("ongoing");

  // --- Step 2: Chapters State ---
  const [chapters, setChapters] = React.useState<StoryChapter[]>([
    {
      id: "chapter-1",
      storyId: "draft-story",
      chapterNumber: 1,
      title: "Episode 1: The Gathering at Kumasi",
      synopsis: "The paramount chiefs gather under the sacred silk-cotton tree to witness the miracle of Okomfo Anokye.",
      content: "High priest Okomfo Anokye struck his golden staff upon the sacred soil of Kumasi...",
      estimatedReadTime: 10,
      publishedAt: new Date().toISOString().split("T")[0],
      isInteractive: true,
      hasAudioNarration: true,
      audioNarrationUrl: "https://example.com/audio-episode-1.mp3",
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
      rootNodeId: "node-root",
      nodes: {
        "node-root": {
          id: "node-root",
          title: "The Descent from the Clouds",
          content: `High priest Okomfo Anokye struck his golden staff upon the sacred soil of Kumasi. A fierce storm gathered overhead as the clouds parted to reveal a solid gold stool descending from the heavens.`,
          choices: [
            {
              id: "choice-1",
              label: "Proclaim the stool as the sacred soul (Sunsum) of the entire Ashanti nation",
              targetNodeId: "node-sunsum-unite",
              consequenceHint: "Unites the seven royal clans under one unified destiny...",
            },
            {
              id: "choice-2",
              label: "Bury the golden swords around the tree to seal an eternal pact",
              targetNodeId: "node-swords-covenant",
              consequenceHint: "Tests the loyalty of the paramount chiefs...",
            },
          ],
        },
      },
    },
  ]);

  // Selected Chapter for Node Editing
  const [selectedChapterId, setSelectedChapterId] = React.useState<string>("chapter-1");
  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  // Active node inside active chapter
  const activeRootNode = activeChapter?.nodes?.[activeChapter?.rootNodeId || "node-root"] || {
    id: "node-root",
    title: "Chapter Entry Node",
    content: "Draft your chapter choices here...",
    choices: [],
  };

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

  const handleUpdateNode = (updatedNode: StoryNode) => {
    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id === selectedChapterId) {
          return {
            ...chap,
            nodes: {
              ...chap.nodes,
              [updatedNode.id]: updatedNode,
            },
          };
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

  return (
    <div className="space-y-8 pb-24 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <Link
          href="/studio"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#680C07] transition-colors"
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
            className="gap-1.5 text-xs border-stone-300 text-stone-700"
          >
            {saved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{saved ? "Draft Saved!" : "Save Draft"}</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold gap-1.5 rounded-xl px-5 shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isPublishing ? "Publishing..." : "Publish to Archive"}</span>
          </Button>
        </div>
      </div>

      {/* Header & Step Wizard Bar */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#680C07]">
            Inkoma Story Studio
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight mt-0.5">
            Create & Publish Folklore Epic
          </h1>
          <p className="text-sm text-stone-600">
            Pen traditional oral narratives, build branching interactive paths, attach audio episodes, and manage character lore.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          {[
            { step: 1, label: "1. Story Identity", icon: BookOpen },
            { step: 2, label: "2. Episodes & Branches", icon: GitBranch },
            { step: 3, label: "3. Character Lore", icon: Users },
            { step: 4, label: "4. Review & Publish", icon: Check },
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
                    ? "bg-[#680C07] text-white shadow-sm"
                    : isDone
                    ? "bg-white text-stone-900 border border-stone-200"
                    : "text-stone-500 hover:text-stone-800"
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

          {/* Titles & Synopsis Form */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              Story Identity & Narrative Synopsis
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Story Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Legend of the Golden Stool"
                  className="bg-white border-stone-200 text-stone-900 font-serif font-bold text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Subtitle / Tagline (Optional)
                </label>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. The Sunsum of the Seven Clans"
                  className="bg-white border-stone-200 text-stone-900 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Full Synopsis & Moral Premise *
              </label>
              <textarea
                rows={4}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Describe the central folklore dilemma, characters involved, and cultural wisdom readers will discover..."
                className="w-full bg-white border border-stone-200 rounded-2xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                required
              />
            </div>
          </div>

          {/* Heritage, Genre & Format Controls */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              Cultural Categorization & Format
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Tradition Heritage *
                </label>
                <Select
                  value={tradition}
                  onChange={(val) => setTradition(val)}
                  options={TRADITIONS}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Primary Genre *
                </label>
                <Select
                  value={mainGenre}
                  onChange={(val) => setMainGenre(val)}
                  options={GENRES.map((g) => ({ value: g.label, label: g.label }))}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Target Audience
                </label>
                <Select
                  value={targetAudience}
                  onChange={(val) => setTargetAudience(val)}
                  options={[
                    { value: "All Ages", label: "All Ages" },
                    { value: "Children & Youth", label: "Children & Youth" },
                    { value: "Young Adult", label: "Young Adult" },
                    { value: "Elders & Scholars", label: "Elders & Scholars" },
                  ]}
                />
              </div>
            </div>

            {/* Custom Sub-genre Tags */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Sub-genres & Custom Folklore Tags
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g. Royal Ancestors, Spiritual Pact, Anansi"
                  className="bg-white border-stone-200 text-xs max-w-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTag}
                  className="text-xs rounded-xl"
                >
                  Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {subGenres.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 text-xs font-semibold"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-stone-900 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Format Toggles */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-bold text-stone-900 text-xs block">Interactive Branching Paths</span>
                  <span className="text-[11px] text-stone-500">Allow readers to make choice decisions shaping the story</span>
                </div>
                <input
                  type="checkbox"
                  checked={isInteractive}
                  onChange={(e) => setIsInteractive(e.target.checked)}
                  className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-bold text-stone-900 text-xs block">Audio Narration Enabled</span>
                  <span className="text-[11px] text-stone-500">Attach audio tracks for traditional oral listening</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasAudioNarration}
                  onChange={(e) => setHasAudioNarration(e.target.checked)}
                  className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Navigation Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={() => setActiveStep(2)}
              className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Continue to Episodes & Branches <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: EPISODES & INTERACTIVE BRANCHES */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Chapter Manager List */}
          <ChapterListBuilder
            chapters={chapters}
            onChange={(updatedChaps) => setChapters(updatedChaps)}
            onSelectChapterToEdit={(chap) => setSelectedChapterId(chap.id)}
          />

          {/* Interactive Branch Node Editor */}
          {activeChapter && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#680C07]">
                    Branch Node Editor • {activeChapter.title}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Interactive Path & Choices
                  </h3>
                </div>
                <Badge variant="gold" className="text-[10px]">
                  {Object.keys(activeChapter.nodes || {}).length} Node Choices
                </Badge>
              </div>

              <BranchNodeCreator
                node={activeRootNode}
                onChange={(updatedNode) => handleUpdateNode(updatedNode)}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveStep(1)}
              className="text-xs rounded-xl border-stone-300 text-stone-700 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Metadata
            </Button>

            <Button
              type="button"
              onClick={() => setActiveStep(3)}
              className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Continue to Character Lore <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: CHARACTER LORE & WORLDBUILDING */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#680C07]">
                Worldbuilding Tree
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Character Lore & Ancestral Archetypes
              </h3>
              <p className="text-xs text-stone-500">
                Define traditional characters, deities, elders, and trickster archetypes present in this story.
              </p>
            </div>

            <CharacterTree />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveStep(2)}
              className="text-xs rounded-xl border-stone-300 text-stone-700 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Episodes
            </Button>

            <Button
              type="button"
              onClick={() => setActiveStep(4)}
              className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Review & Finalize <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & PUBLISH */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Story Card Simulation */}
            <div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                Explore Shelf Card Preview
              </span>
              <div className="flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md">
                <div className="relative h-48 w-full bg-stone-100">
                  <Image src={coverImage} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <Badge className="bg-[#680C07] text-white backdrop-blur-xs text-[10px] font-medium border-0">
                      {tradition}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1 drop-shadow-xs">
                      <Clock className="w-3 h-3 text-red-200" /> 10 min
                    </span>
                    <div className="flex items-center gap-2">
                      {hasAudioNarration && (
                        <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-red-200">
                          <Volume2 className="w-2.5 h-2.5" /> Audio
                        </span>
                      )}
                      {isInteractive && (
                        <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-red-200">
                          <GitFork className="w-2.5 h-2.5" /> {chapters.length} episodes
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#680C07] uppercase tracking-wider block">
                    {mainGenre}
                  </span>
                  <h4 className="text-base font-bold text-stone-900 font-serif leading-tight">{title}</h4>
                  {subtitle && <p className="text-xs text-stone-500 italic">{subtitle}</p>}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{synopsis}</p>
                </div>
              </div>
            </div>

            {/* Publishing Settings & Summary */}
            <div className="md:col-span-2 space-y-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
                Publishing Controls & Patron Support
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Publishing Status
                  </label>
                  <Select
                    value={status}
                    onChange={(val) => setStatus(val as StoryStatus)}
                    options={[
                      { value: "ongoing", label: "Ongoing Manuscript (Publishing chapters progressively)" },
                      { value: "completed", label: "Completed Epic (All episodes ready)" },
                      { value: "draft", label: "Private Draft (Visible only to you)" },
                    ]}
                    className="max-w-sm"
                  />
                </div>

                <label className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">Enable Patron Tip Button</span>
                    <span className="text-[11px] text-stone-500">Allow readers to support you directly via Paystack on this story</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableTips}
                    onChange={(e) => setEnableTips(e.target.checked)}
                    className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
                  />
                </label>
              </div>

              {/* Story Summary checklist */}
              <div className="p-4 bg-[#680C07]/5 rounded-2xl border border-[#680C07]/20 space-y-2 text-xs text-stone-800">
                <span className="font-bold text-[#680C07] block uppercase tracking-wider text-[11px]">
                  Manuscript Summary
                </span>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{chapters.length}</strong> Chapter(s) configured</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tradition: <strong>{tradition}</strong> • Genre: <strong>{mainGenre}</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Format: <strong>{isInteractive ? "Interactive Branching" : "Linear Narrative"}</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(3)}
                  className="text-xs rounded-xl border-stone-300 text-stone-700 gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Characters
                </Button>

                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl gap-2 px-8 py-6 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPublishing ? "Publishing Manuscript..." : "Publish to Inkoma Archive"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
