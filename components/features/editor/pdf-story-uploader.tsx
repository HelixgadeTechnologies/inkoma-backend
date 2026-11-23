"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileUp,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Loader2,
  Layers,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Story, StoryChapter } from "@/types";
import {
  parsePdfManuscript,
  importPdfManuscript,
  ParsedPdfResult,
  ParsedPdfChapter,
} from "@/src/services/storyService";

interface PdfStoryUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadedToEditor?: (data: { title: string; chapters: StoryChapter[] }) => void;
  onImportedSuccess?: (story: Story) => void;
}

export function PdfStoryUploader({
  open,
  onOpenChange,
  onLoadedToEditor,
  onImportedSuccess,
}: PdfStoryUploaderProps) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [step, setStep] = React.useState<"upload" | "parsing" | "preview" | "importing" | "success">("upload");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [parseResult, setParseResult] = React.useState<ParsedPdfResult | null>(null);
  const [editedTitle, setEditedTitle] = React.useState<string>("");
  const [parsingStatus, setParsingStatus] = React.useState<string>("Extracting document text stream...");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [createdStory, setCreatedStory] = React.useState<Story | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [expandedChapter, setExpandedChapter] = React.useState<number | null>(1);

  // Reset state when dialog opens/closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("upload");
        setSelectedFile(null);
        setParseResult(null);
        setEditedTitle("");
        setErrorMessage(null);
        setCreatedStory(null);
        setExpandedChapter(1);
      }, 200);
    }
  }, [open]);

  const handleSelectFile = async (file: File) => {
    setErrorMessage(null);

    // Client-side validations
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage("File exceeds the maximum limit of 25MB. Please choose a smaller manuscript PDF.");
      return;
    }

    if (file.type && file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Invalid file format. Please upload a standard PDF manuscript file (.pdf).");
      return;
    }

    setSelectedFile(file);
    setStep("parsing");

    // Dynamic parsing status messages
    setParsingStatus("Extracting document text streams...");
    const t1 = setTimeout(() => {
      setParsingStatus("Detecting chapter headings, acts, and narrative structure...");
    }, 1200);
    const t2 = setTimeout(() => {
      setParsingStatus("Computing word counts and estimated reading metrics...");
    }, 2400);

    try {
      const result = await parsePdfManuscript(file);
      clearTimeout(t1);
      clearTimeout(t2);

      if (!result.chapters || result.chapters.length === 0) {
        throw new Error(
          "No text content or chapters could be detected. If this is a scanned manuscript, please ensure it has an OCR text layer."
        );
      }

      setParseResult(result);
      setEditedTitle(result.detectedTitle || file.name.replace(/\.[^/.]+$/, ""));
      setStep("preview");
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      console.error("[PdfUploader] Parse error:", err);
      setErrorMessage(
        err?.message ||
          "Unable to extract text from this PDF. Please verify that the PDF is not encrypted, password-protected, or a scanned image without an OCR layer."
      );
      setStep("upload");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleSelectFile(files[0]);
    }
  };

  // Option 1: Load into Studio wizard (in-memory & local draft)
  const handleLoadToStudio = () => {
    if (!parseResult) return;

    const formattedChapters: StoryChapter[] = parseResult.chapters.map((c, idx) => ({
      id: `chapter-${c.number || idx + 1}-${Date.now()}`,
      storyId: "draft-story",
      number: c.number || idx + 1,
      chapterNumber: c.number || idx + 1,
      title: c.title || `Chapter ${idx + 1}`,
      summary: c.summary || c.synopsis || c.content.slice(0, 250),
      synopsis: c.summary || c.synopsis || c.content.slice(0, 250),
      content: c.content,
      status: "draft",
      estimatedReadTime: c.readTime || c.estimatedReadTime || Math.ceil(c.wordCount / 200),
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      hasAudioNarration: false,
      readsCount: 0,
      likesCount: 0,
      commentsCount: 0,
    }));

    if (onLoadedToEditor) {
      onLoadedToEditor({
        title: editedTitle.trim() || parseResult.detectedTitle || "Untitled Story",
        chapters: formattedChapters,
      });
      onOpenChange(false);
    } else {
      // Store in localStorage for Studio hydration
      try {
        const draft = {
          title: editedTitle.trim() || parseResult.detectedTitle || "Untitled Story",
          chapters: formattedChapters,
          selectedChapterId: formattedChapters[0]?.id || "chapter-1",
          activeStep: 1,
        };
        localStorage.setItem("inkoma_draft_story", JSON.stringify(draft));
      } catch {}
      onOpenChange(false);
      router.push("/studio/new?source=pdf");
    }
  };

  // Option 2: Directly import and save as draft in MongoDB
  const handleDirectImport = async () => {
    if (!selectedFile) return;

    setStep("importing");
    setErrorMessage(null);

    try {
      const story = await importPdfManuscript(selectedFile, {
        title: editedTitle.trim() || parseResult?.detectedTitle || "Untitled Story",
        status: "draft",
      });

      setCreatedStory(story);
      setStep("success");
      if (onImportedSuccess) {
        onImportedSuccess(story);
      }
    } catch (err: any) {
      console.error("[PdfUploader] Direct import error:", err);
      setErrorMessage(
        err?.message || "Failed to create draft story in the database. Please try loading into the editor instead."
      );
      setStep("preview");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-2xl">
        {/* Header Banner */}
        <div className="bg-[#FAF8F5] border-b border-stone-200/80 px-6 py-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#B8860B] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              PDF Manuscript Extraction
            </div>
            <DialogTitle className="text-xl font-bold font-serif text-stone-950">
              {step === "upload" && "Upload Story Manuscript"}
              {step === "parsing" && "Extracting & Segmenting..."}
              {step === "preview" && "Manuscript Preview & Segmentation"}
              {step === "importing" && "Saving Draft Story..."}
              {step === "success" && "Manuscript Imported Successfully!"}
            </DialogTitle>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Manuscript Processing Error</span>
              </div>
              <p className="text-rose-700 leading-relaxed pl-5">{errorMessage}</p>
            </div>
          )}

          {/* ── STEP 1: UPLOAD DROPZONE ── */}
          {step === "upload" && (
            <div className="space-y-5">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                  isDragging
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]"
                    : "border-stone-300 hover:border-[#D4AF37]/60 hover:bg-[#FAF8F5]/80 bg-stone-50/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      handleSelectFile(files[0]);
                    }
                  }}
                />

                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] flex items-center justify-center shadow-xs">
                  <FileUp className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-stone-900 font-serif">
                    Drag and drop your manuscript PDF here
                  </p>
                  <p className="text-xs text-stone-500">
                    or <span className="text-[#B8860B] font-bold underline">browse files</span> from your computer
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-stone-400">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 font-mono">
                    PDF format only
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 font-mono">
                    Max 25 MB
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 font-mono">
                    Auto chapter detection
                  </span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Multi-Pattern Detection</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Auto-matches Chapters, Acts, Parts, Prologues, and Epilogues.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Smart Analytics</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Computes per-chapter word counts and estimated reading minutes.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Layers className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Fallback Chunking</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Auto-splits novels without headings at natural paragraph breaks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: PARSING IN PROGRESS ── */}
          {step === "parsing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-[#D4AF37]/15 flex items-center justify-center text-[#B8860B] animate-pulse">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-stone-950 text-white flex items-center justify-center">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                </div>
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-base font-bold font-serif text-stone-900">
                  Parsing {selectedFile?.name}
                </h3>
                <p className="text-xs text-[#B8860B] font-medium animate-pulse">
                  {parsingStatus}
                </p>
                <p className="text-[11px] text-stone-400">
                  Scanning text streams, regex chapter markers, and reading metrics...
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 3: PREVIEW & SEGMENTATION BREAKDOWN ── */}
          {step === "preview" && parseResult && (
            <div className="space-y-5 animate-in fade-in">
              {/* Detected Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span>Detected Story Title</span>
                  <span className="text-[11px] font-normal text-stone-400">Click to edit if needed</span>
                </label>
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Story Title..."
                  className="font-serif font-bold text-base bg-stone-50 border-stone-300 focus:border-[#D4AF37]"
                />
              </div>

              {/* Manuscript Metrics Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-center">
                  <span className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">
                    Chapters
                  </span>
                  <span className="text-xl font-bold font-serif text-stone-900">
                    {parseResult.totalChapters}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-center">
                  <span className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">
                    Word Count
                  </span>
                  <span className="text-xl font-bold font-serif text-stone-900">
                    {parseResult.totalWordCount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-center">
                  <span className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">
                    Total Read Time
                  </span>
                  <span className="text-xl font-bold font-serif text-[#B8860B]">
                    ~{parseResult.estimatedTotalReadTime} min
                  </span>
                </div>
              </div>

              {/* Chapter Segmentation List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Segmented Chapters ({parseResult.chapters.length})
                  </h4>
                  <span className="text-[11px] text-stone-400">Preview excerpts</span>
                </div>

                <div className="max-h-[240px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {parseResult.chapters.map((chap) => {
                    const isExpanded = expandedChapter === chap.number;
                    return (
                      <div
                        key={chap.number}
                        className="p-3 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 transition-all text-left"
                      >
                        <div
                          onClick={() => setExpandedChapter(isExpanded ? null : chap.number)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-[#D4AF37]/15 text-[#B8860B] font-bold text-xs flex items-center justify-center shrink-0">
                              {chap.number}
                            </span>
                            <span className="text-xs font-bold text-stone-900 truncate">
                              {chap.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] text-stone-500 font-mono">
                              {chap.wordCount.toLocaleString()} words
                            </span>
                            <span className="text-[11px] text-[#B8860B] font-mono">
                              ~{chap.readTime || chap.estimatedReadTime || Math.ceil(chap.wordCount / 200)}m
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="mt-2.5 pt-2 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-sans bg-stone-50/80 p-2.5 rounded-xl">
                            <p className="line-clamp-3 italic">
                              "{chap.summary || chap.content.slice(0, 260)}..."
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={handleLoadToStudio}
                  className="w-full sm:flex-1 bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold py-5 rounded-2xl shadow-md text-xs sm:text-sm gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Load into Studio Editor</span>
                </Button>

                <Button
                  onClick={handleDirectImport}
                  variant="outline"
                  className="w-full sm:flex-1 border-stone-300 text-stone-800 hover:bg-stone-100 font-bold py-5 rounded-2xl text-xs sm:text-sm gap-2"
                >
                  <FileText className="w-4 h-4 text-stone-600" />
                  <span>Save as Draft Directly</span>
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 4: IMPORTING DIRECTLY ── */}
          {step === "importing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
              <div className="space-y-1">
                <h3 className="text-base font-bold font-serif text-stone-900">
                  Creating Draft Story...
                </h3>
                <p className="text-xs text-stone-500">
                  Saving all segmented chapters and metadata into MongoDB.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 5: SUCCESS ── */}
          {step === "success" && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  Draft Story Created!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  <span className="font-bold text-stone-900">"{editedTitle}"</span> has been imported with{" "}
                  {parseResult?.totalChapters} chapters and {parseResult?.totalWordCount.toLocaleString()} words.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={() => {
                    onOpenChange(false);
                    if (createdStory?.id) {
                      router.push(`/story/${createdStory.slug || createdStory.id}`);
                    } else {
                      router.push("/studio");
                    }
                  }}
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
                >
                  View Story Details
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    router.push("/studio");
                  }}
                  className="border-stone-300 text-stone-700 hover:bg-stone-100 px-6 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Return to Studio
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
