"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  BookOpen,
  Send,
  ChevronRight,
  ChevronLeft,
  FileText,
  Plus,
  Wand2,
  Info,
  Lock,
  ArrowRight,
  UploadCloud,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { ChapterListBuilder, calculateReadTime } from "@/components/features/editor/chapter-list-builder";
import { StoryChapter, StoryStatus } from "@/types";
import { MAIN_GENRES, SUB_GENRES, TRIGGER_WARNINGS } from "@/config/genres";

// SafeImage component to guarantee NO broken image displays
function SafeImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full min-h-[100px] bg-stone-100 dark:bg-[#1c1b22] border border-[#D4AF37]/30 flex flex-col items-center justify-center p-2 text-center space-y-1">
        <BookOpen className="w-6 h-6 text-[#D4AF37]" />
        <span className="text-[10px] font-bold text-stone-700 dark:text-stone-200 line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      unoptimized
    />
  );
}

// Cover Templates List
const COVER_TEMPLATES = [
  {
    id: "tpl-romance-1",
    title: "Sunset Embrace",
    category: "Romance",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-fantasy-1",
    title: "Dragon Fire",
    category: "Fantasy",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-thriller-1",
    title: "City in Shadows",
    category: "Thriller",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-mystery-1",
    title: "Foggy Woodland",
    category: "Mystery",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-scifi-1",
    title: "Cyber Metropolis",
    category: "Sci-Fi",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-historical-1",
    title: "Golden Crown",
    category: "Historical",
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-romance-2",
    title: "Blossom Portrait",
    category: "Romance",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-fantasy-2",
    title: "Floating Citadel",
    category: "Fantasy",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-thriller-2",
    title: "Metropolis Alley",
    category: "Thriller",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-scifi-2",
    title: "Lunar Explorer",
    category: "Sci-Fi",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-mystery-2",
    title: "Gothic Archway",
    category: "Mystery",
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tpl-horror-1",
    title: "Haunted Woods",
    category: "Horror",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
  },
];

export default function StudioNewStoryPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4>(1);

  // --- Step 1: Story Details State ---
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [synopsis, setSynopsis] = React.useState("");
  const [mainGenre, setMainGenre] = React.useState("");
  const [subGenres, setSubGenres] = React.useState<string[]>([]);
  const [storyLanguage, setStoryLanguage] = React.useState("English");
  const [targetAudience, setTargetAudience] = React.useState("");
  const [ageRating, setAgeRating] = React.useState("");
  const [selectedTriggerWarnings, setSelectedTriggerWarnings] = React.useState<string[]>([]);

  // --- Step 2: Cover Selection State ---
  const [coverImage, setCoverImage] = React.useState(COVER_TEMPLATES[0].url);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Status State
  const [status, setStatus] = React.useState<StoryStatus>("ongoing");

  // --- Step 3: Book Chapters State ---
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

  const [selectedChapterId, setSelectedChapterId] = React.useState<string>("chapter-1");
  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const [saved, setSaved] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  // Drag and Drop Upload Handler
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCoverImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const toggleTriggerWarning = (tw: string) => {
    if (selectedTriggerWarnings.includes(tw)) {
      setSelectedTriggerWarnings(selectedTriggerWarnings.filter((t) => t !== tw));
    } else {
      setSelectedTriggerWarnings([...selectedTriggerWarnings, tw]);
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

  // Filter templates by category & search query
  const filteredTemplates = COVER_TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === "All" || tpl.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeContent = activeChapter?.content || "";
  const activeWordCount = activeContent.trim().split(/\s+/).filter(Boolean).length;
  const activeReadTime = calculateReadTime(activeContent);

  return (
    <div className="space-y-6 pb-24 w-full text-stone-900 dark:text-stone-100 font-sans">
      {/* STEPPER BAR (1 - Story Details, 2 - Cover, 3 - Chapters, 4 - Publish) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between max-w-xl mx-auto py-3">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className="flex flex-col items-center space-y-1.5 flex-1 relative group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeStep > 1
                  ? "bg-[#D4AF37] text-black"
                  : activeStep === 1
                  ? "bg-[#D4AF37] text-black"
                  : "border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#141318]"
              }`}
            >
              {activeStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : 1}
            </div>
            <span
              className={`text-xs font-bold transition-colors ${
                activeStep >= 1 ? "text-[#D4AF37]" : "text-stone-500 dark:text-stone-500"
              }`}
            >
              Story Details
            </span>
          </button>

          <div className={`h-[1.5px] flex-1 -mt-5 transition-colors ${activeStep >= 2 ? "bg-[#D4AF37]" : "bg-stone-200 dark:bg-stone-800"}`} />

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className="flex flex-col items-center space-y-1.5 flex-1 relative group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeStep > 2
                  ? "bg-[#D4AF37] text-black"
                  : activeStep === 2
                  ? "bg-[#D4AF37] text-black"
                  : "border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#141318]"
              }`}
            >
              {activeStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : 2}
            </div>
            <span
              className={`text-xs font-bold transition-colors ${
                activeStep >= 2 ? "text-[#D4AF37]" : "text-stone-500 dark:text-stone-500"
              }`}
            >
              Cover
            </span>
          </button>

          <div className={`h-[1.5px] flex-1 -mt-5 transition-colors ${activeStep >= 3 ? "bg-[#D4AF37]" : "bg-stone-200 dark:bg-stone-800"}`} />

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className="flex flex-col items-center space-y-1.5 flex-1 relative group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeStep > 3
                  ? "bg-[#D4AF37] text-black"
                  : activeStep === 3
                  ? "bg-[#D4AF37] text-black"
                  : "border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#141318]"
              }`}
            >
              {activeStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : 3}
            </div>
            <span
              className={`text-xs font-bold transition-colors ${
                activeStep >= 3 ? "text-[#D4AF37]" : "text-stone-500 dark:text-stone-500"
              }`}
            >
              Chapters
            </span>
          </button>

          <div className={`h-[1.5px] flex-1 -mt-5 transition-colors ${activeStep >= 4 ? "bg-[#D4AF37]" : "bg-stone-200 dark:bg-stone-800"}`} />

          {/* Step 4 */}
          <button
            type="button"
            onClick={() => setActiveStep(4)}
            className="flex flex-col items-center space-y-1.5 flex-1 relative group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeStep === 4
                  ? "bg-[#D4AF37] text-black"
                  : "border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#141318]"
              }`}
            >
              4
            </div>
            <span
              className={`text-xs font-bold transition-colors ${
                activeStep >= 4 ? "text-[#D4AF37]" : "text-stone-500 dark:text-stone-500"
              }`}
            >
              Publish
            </span>
          </button>
        </div>
      </div>

      {/* STEP 1: STORY DETAILS FORM CARD */}
      {activeStep === 1 && (
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Create Your Story
          </h1>

          <div className="bg-white dark:bg-[#141318] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm dark:shadow-2xl">
            {/* Card Title */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100 dark:border-stone-800">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Story Details</h2>
            </div>

            {/* Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">
                  Title <span className="text-[#D4AF37]">*</span>
                </label>
                <span className="text-stone-500 font-mono text-[11px]">{title.length}/150</span>
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 150))}
                placeholder="Enter your story title..."
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-[#D4AF37]"
              />
            </div>

            {/* Subtitle Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">Subtitle (Optional)</label>
                <span className="text-stone-500 font-mono text-[11px]">{subtitle.length}/150</span>
              </div>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value.slice(0, 150))}
                placeholder="Add a subtitle for your story..."
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-[#D4AF37]"
              />
            </div>

            {/* Main Genre & Sub-Genres (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                  Main Genre <span className="text-[#D4AF37]">*</span>
                </label>
                <Select
                  value={mainGenre}
                  onChange={(val) => setMainGenre(val)}
                  options={[
                    { value: "", label: "Select main genre" },
                    ...MAIN_GENRES.map((g) => ({ value: g, label: g })),
                  ]}
                  className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                  Sub-Genres (Optional)
                </label>
                <Select
                  value=""
                  onChange={(val) => {
                    if (val && !subGenres.includes(val)) {
                      setSubGenres([...subGenres, val]);
                    }
                  }}
                  options={[
                    { value: "", label: "Select one or more" },
                    ...SUB_GENRES.map((sg) => ({ value: sg, label: sg })),
                  ]}
                  className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
                />
              </div>
            </div>

            {/* Synopsis Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">
                  Synopsis <span className="text-[#D4AF37]">*</span>
                </label>
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value.slice(0, 2000))}
                  placeholder="Write a summary of your story..."
                  className="w-full bg-[#faf8f5] dark:bg-[#1c1b22] border border-stone-300 dark:border-stone-800 rounded-xl p-3.5 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-[#D4AF37] pb-7"
                />
                <span className="absolute bottom-2.5 right-3 text-[11px] font-mono text-stone-500">
                  {synopsis.length}/2000
                </span>
              </div>
            </div>

            {/* Story Language & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                  Story Language <span className="text-[#D4AF37]">*</span>
                </label>
                <Select
                  value={storyLanguage}
                  onChange={(val) => setStoryLanguage(val)}
                  options={[
                    { value: "English", label: "English" },
                    { value: "Swahili", label: "Swahili" },
                    { value: "Yoruba", label: "Yoruba" },
                    { value: "Zulu", label: "Zulu" },
                    { value: "French", label: "French" },
                  ]}
                  className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                  Target Audience <span className="text-[#D4AF37]">*</span>
                </label>
                <Select
                  value={targetAudience}
                  onChange={(val) => setTargetAudience(val)}
                  options={[
                    { value: "", label: "Select target audience" },
                    { value: "All Ages", label: "All Ages" },
                    { value: "Young Adult (YA)", label: "Young Adult (YA)" },
                    { value: "New Adult", label: "New Adult" },
                    { value: "Adult", label: "Adult (18+)" },
                  ]}
                  className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
                />
              </div>
            </div>

            {/* Age Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">
                  Age Rating <span className="text-[#D4AF37]">*</span>
                </label>
                <Info className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 cursor-pointer" />
              </div>
              <Select
                value={ageRating}
                onChange={(val) => setAgeRating(val)}
                options={[
                  { value: "", label: "Select age rating" },
                  { value: "Everyone (G)", label: "Everyone (G)" },
                  { value: "Teen (13+)", label: "Teen (13+)" },
                  { value: "Mature (17+)", label: "Mature (17+)" },
                  { value: "Adults Only (18+)", label: "Adults Only (18+)" },
                ]}
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
              />
            </div>

            {/* Trigger Warnings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">Trigger Warnings (Optional)</label>
                <Info className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 cursor-pointer" />
              </div>
              <Select
                value=""
                onChange={(val) => {
                  if (val && !selectedTriggerWarnings.includes(val)) {
                    setSelectedTriggerWarnings([...selectedTriggerWarnings, val]);
                  }
                }}
                options={[
                  { value: "", label: "Select one or more" },
                  ...TRIGGER_WARNINGS.map((tw) => ({ value: tw, label: tw })),
                ]}
                className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 rounded-xl text-xs py-2.5"
              />

              <p className="text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                Choose any themes that exist in your story.
              </p>

              {/* Theme Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Violence", "Strong Language", "Mature Themes", "Gore", "Bullying"].map((theme) => {
                  const isSelected = selectedTriggerWarnings.includes(theme);
                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => toggleTriggerWarning(theme)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-stone-100 dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-700"
                      }`}
                    >
                      {theme}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {}}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-[#1c1b22] border border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-700"
                >
                  + More
                </button>
              </div>
            </div>
          </div>

          {/* Action Button & Lock Subtext */}
          <div className="space-y-3 pt-2">
            <Button
              type="button"
              onClick={() => setActiveStep(2)}
              className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-[#0c0b0e] font-extrabold text-sm py-6 rounded-xl shadow-md gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Save &amp; Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>You can save as draft and continue later.</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: GET YOUR COVER */}
      {activeStep === 2 && (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
          {/* Headline & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">Get Your Cover</h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Upload your own cover or choose from our templates.
            </p>
          </div>

          {/* Top Upload Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                : "border-[#D4AF37]/40 hover:border-[#D4AF37] bg-white dark:bg-[#141318] hover:bg-stone-50 dark:hover:bg-[#18171f]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                <UploadCloud className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white">Upload from your device</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Upload your own cover image</p>
              </div>
              {uploadedFileName && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Uploaded: {uploadedFileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Pick Template */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Pick Template</h3>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-white dark:bg-[#141318] border border-stone-300 dark:border-stone-800 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {["All", "Romance", "Fantasy", "Thriller", "Mystery", "Sci-Fi", "Horror", "Historical", "Other"].map(
                (category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-[#D4AF37] text-black font-extrabold shadow-sm"
                          : "bg-white dark:bg-[#141318] border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-700 hover:text-stone-900 dark:hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                }
              )}
            </div>

            {/* Gallery Grid of Templates */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
              {filteredTemplates.map((tpl) => {
                const isSelected = coverImage === tpl.url;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      setCoverImage(tpl.url);
                      setUploadedFileName(null);
                    }}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden border text-left transition-all group ${
                      isSelected
                        ? "border-[#D4AF37] ring-2 ring-[#D4AF37] shadow-xl scale-[1.02]"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 opacity-90 hover:opacity-100"
                    }`}
                  >
                    <SafeImage
                      src={tpl.url}
                      alt={tpl.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-[#0c0b0e]/80 text-white z-10">
                      <p className="text-[10px] font-bold truncate leading-tight">{tpl.title}</p>
                      <span className="text-[9px] text-stone-300 block truncate">{tpl.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveStep(1)}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl px-6 py-3.5 text-xs font-bold gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Details</span>
              </Button>

              <Button
                type="button"
                onClick={() => setActiveStep(3)}
                className="bg-[#D4AF37] hover:bg-[#c49f27] text-black font-extrabold rounded-xl px-8 py-3.5 text-xs sm:text-sm gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Save &amp; Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>You can always change your cover later.</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: BOOK CHAPTERS */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <ChapterListBuilder
            chapters={chapters}
            onChange={(updatedChaps) => setChapters(updatedChaps)}
            onSelectChapterToEdit={(chap) => setSelectedChapterId(chap.id)}
          />

          {activeChapter && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      Chapter Editor
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white">
                      {activeChapter.title}
                    </h3>
                  </div>
                  <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px]">
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
                    className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-bold text-sm"
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
                    className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Chapter Content & Prose
                    </label>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      {activeWordCount} words • ~{activeReadTime} min read
                    </span>
                  </div>
                  <textarea
                    rows={12}
                    value={activeChapter.content || ""}
                    onChange={(e) => handleUpdateActiveChapter("content", e.target.value)}
                    placeholder="Write your chapter text here..."
                    className="w-full bg-[#faf8f5] dark:bg-[#1c1b22] border border-stone-300 dark:border-stone-800 rounded-2xl p-4 text-sm text-stone-900 dark:text-white leading-relaxed focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-center">
                  <Button
                    type="button"
                    onClick={handleAddNewChapter}
                    className="bg-[#D4AF37] hover:bg-[#c49f27] text-black text-xs font-bold rounded-xl gap-2 px-6 py-5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Chapter {chapters.length + 1}</span>
                  </Button>
                </div>
              </div>

              {/* Writing Assistant Panel */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white">Writing Assistant</h3>
                    </div>
                    <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px]">
                      Live Helper
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 dark:bg-[#1c1b22] rounded-2xl border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Word Count</span>
                      <strong className="text-lg font-bold text-stone-900 dark:text-white">{activeWordCount}</strong>
                    </div>
                    <div className="p-3 bg-stone-50 dark:bg-[#1c1b22] rounded-2xl border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Read Time</span>
                      <strong className="text-lg font-bold text-[#D4AF37]">~{activeReadTime} min</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveStep(2)}
              className="text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Cover
            </Button>

            <Button
              type="button"
              onClick={() => setActiveStep(4)}
              className="bg-[#D4AF37] hover:bg-[#c49f27] text-black text-xs font-bold rounded-xl gap-1.5 px-6 py-5"
            >
              Continue to Publish <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: PUBLISH */}
      {activeStep === 4 && (
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
              Publishing Options & Final Summary
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
                  className="bg-[#faf8f5] dark:bg-[#1c1b22] border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-200 text-xs"
                />
              </div>

              <div className="p-4 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/30 space-y-2 text-xs text-stone-900 dark:text-stone-200">
                <span className="font-bold text-[#D4AF37] block uppercase tracking-wider text-[11px]">
                  Book Summary Checklist
                </span>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Title: <strong>{title || "Untitled Story"}</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Main Genre: <strong>{mainGenre || "Not set"}</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span><strong>{chapters.length}</strong> Chapter(s) configured</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(3)}
                  className="text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Chapters
                </Button>

                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-black text-xs font-extrabold rounded-xl gap-2 px-8 py-6 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPublishing ? "Publishing..." : "Publish Book to INKOMA"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
