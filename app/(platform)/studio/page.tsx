"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Story } from "@/types";
import { MOCK_STORIES, MOCK_CURRENT_USER } from "@/config/mock-data";
import {
  Plus,
  Eye,
  Heart,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  List,
  StickyNote,
  Users,
  Globe,
  FileText,
  HelpCircle,
  GraduationCap,
  PenLine,
  BookOpen,
  Pencil,
} from "lucide-react";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function formatWords(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

// Progress bar for each story — derived from status
function storyProgress(story: Story): number {
  if (story.status === "completed") return 100;
  if (story.status === "ongoing") {
    // use chapters as rough proxy capped at 90%
    const total = story.totalChapters || 1;
    return Math.min(90, Math.round((total / (total + 2)) * 100));
  }
  return 35; // draft
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  ongoing: {
    label: "ONGOING",
    className:
      "bg-[#D4AF37]/15 text-[#B8860B] border border-[#D4AF37]/40 font-bold",
  },
  completed: {
    label: "PUBLISHED",
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold",
  },
  draft: {
    label: "DRAFT",
    className:
      "bg-stone-100 text-stone-600 border border-stone-300 font-bold",
  },
};

// ─── Writer Tools ──────────────────────────────────────────────────────────────

const WRITER_TOOLS = [
  { icon: List, label: "Outline" },
  { icon: StickyNote, label: "Notes" },
  { icon: Users, label: "Characters" },
  { icon: Globe, label: "Worldbuilding" },
  { icon: FileText, label: "Templates" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudioPage() {
  const [overviewPeriod, setOverviewPeriod] = useState("This Month");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const stories = MOCK_STORIES.slice(0, 3); // show first 3 as "my stories"
  const user = MOCK_CURRENT_USER;

  const statsStories = user.writingStats?.storiesPublished ?? 3;
  const statsChapters = user.writingStats?.totalChaptersPublished ?? 24;
  const statsWords = 18700;
  const statsReaders = user.followersCount ?? 152;

  return (
    <div className="space-y-6 pb-20">

      {/* ── 1. Page Header ── */}
      <div className="space-y-0.5 pt-2">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
          Studio
        </h1>
        <p className="text-sm text-stone-500 font-medium">
          Write. Create. Inspire.
        </p>
      </div>

      {/* ── 2. Quick Action Cards ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Create New Story */}
        <Link href="/studio/new">
          <div className="group flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
              <PenLine className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-stone-900 leading-tight">
                Create New Story
              </p>
              <p className="text-xs text-stone-500 leading-tight mt-0.5">
                Start writing your next masterpiece.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
        </Link>

        {/* Continue Writing */}
        <Link href="/studio/new">
          <div className="group flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-stone-900 leading-tight">
                Continue Writing
              </p>
              <p className="text-xs text-stone-500 leading-tight mt-0.5">
                Pick up where you left off.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
        </Link>
      </div>

      {/* ── 3. Writing Overview ── */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Your Writing Overview
          </h2>
          <button
            onClick={() => setShowPeriodMenu((p) => !p)}
            className="relative flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#B8860B] transition-colors"
          >
            {overviewPeriod}
            <ChevronDown className="w-3.5 h-3.5" />
            {showPeriodMenu && (
              <div className="absolute top-6 right-0 bg-white border border-stone-200 rounded-xl shadow-lg z-10 py-1 min-w-[120px]">
                {["This Week", "This Month", "All Time"].map((p) => (
                  <button
                    key={p}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOverviewPeriod(p);
                      setShowPeriodMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-stone-50 transition-colors ${
                      p === overviewPeriod
                        ? "text-[#D4AF37] font-bold"
                        : "text-stone-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Stories */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-stone-400" />
              <span className="text-xl font-extrabold text-stone-900 font-serif">
                {statsStories}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Stories
            </span>
          </div>

          {/* Chapters */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-stone-400" />
              <span className="text-xl font-extrabold text-stone-900 font-serif">
                {statsChapters}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Chapters
            </span>
          </div>

          {/* Words Written */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <Pencil className="w-4 h-4 text-stone-400" />
              <span className="text-xl font-extrabold text-stone-900 font-serif">
                {formatWords(statsWords)}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium text-center leading-tight">
              Words Written
            </span>
          </div>

          {/* Readers */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              {/* star icon proxy */}
              <svg
                className="w-4 h-4 text-stone-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.019 6.218a1 1 0 00.95.69h6.536c.969 0 1.371 1.24.588 1.81l-5.293 3.846a1 1 0 00-.364 1.118l2.019 6.218c.3.921-.755 1.688-1.54 1.118l-5.293-3.846a1 1 0 00-1.176 0l-5.293 3.846c-.785.57-1.84-.197-1.54-1.118l2.019-6.218a1 1 0 00-.364-1.118L2.43 11.645c-.783-.57-.381-1.81.588-1.81h6.536a1 1 0 00.95-.69l2.019-6.218z"
                />
              </svg>
              <span className="text-xl font-extrabold text-stone-900 font-serif">
                {statsReaders}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Readers
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. My Stories ── */}
      <div className="space-y-3">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 font-serif">
            My Stories
          </h2>
          <Link
            href="/studio"
            className="flex items-center gap-0.5 text-xs font-semibold text-[#D4AF37] hover:text-[#B8860B] transition-colors"
          >
            View all
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Story cards */}
        <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden divide-y divide-stone-100">
          {stories.map((story) => {
            const progress = storyProgress(story);
            const statusCfg =
              STATUS_CONFIG[story.status] ?? STATUS_CONFIG.draft;
            const updatedLabel =
              story.status === "ongoing"
                ? "Last updated 2 days ago"
                : story.status === "completed"
                ? "Last updated 1 week ago"
                : "Last updated 3 days ago";

            return (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="block p-4 space-y-3 hover:bg-stone-50/70 active:bg-stone-100 transition-colors cursor-pointer group"
              >
                {/* Top row: cover + info + actions */}
                <div className="flex items-start gap-3">
                  {/* Cover image */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 group-hover:border-[#D4AF37]/40 transition-colors">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        •{" "}
                        {story.totalChapters ||
                          story.chapters?.length ||
                          1}{" "}
                        Chapters
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 font-serif leading-snug truncate group-hover:text-[#B8860B] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-[11px] text-stone-400">{updatedLabel}</p>
                  </div>

                  {/* Stats + overflow menu */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{formatCount(story.readsCount)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{formatCount(story.likesCount)}</span>
                    </div>
                    {/* Overflow button — stops propagation so it doesn't trigger the Link */}
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-1 rounded-lg hover:bg-stone-200 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-stone-400" />
                    </button>
                  </div>
                </div>

                {/* Progress bar row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 shrink-0">
                    {progress}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 5. Writer Tools ── */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900 font-serif">
          Writer Tools
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {WRITER_TOOLS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-50 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors border border-stone-200 group-hover:border-[#D4AF37]/30">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-semibold text-stone-600 text-center leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 6. Resources & Help ── */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900 font-serif">
          Resources &amp; Help
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Help Centre */}
          <div className="group flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 leading-tight">
                Help Centre
              </p>
              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                Get answers to common questions about writing and publishing.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>

          {/* Writer Tips */}
          <div className="group flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all">
              <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 leading-tight">
                Writer Tips
              </p>
              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                Practical guides and tips to improve your writing.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
        </div>
      </div>

    </div>
  );
}
