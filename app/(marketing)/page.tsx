"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Compass, Flame, Volume2, ShieldCheck, ArrowRight } from "lucide-react";
import { SupportInkomaBanner } from "@/components/features/discovery/support-inkoma-banner";
import { ContinueReadingBar } from "@/components/features/discovery/continue-reading-bar";
import { StoryShelf } from "@/components/features/discovery/story-shelf";
import { MOCK_STORIES } from "@/config/mock-data";

export default function HomePage() {
  const featuredStories = MOCK_STORIES.filter((s) => s.isFeatured);
  const recentlyUpdated = MOCK_STORIES.filter((s) => s.isRecentlyUpdated || s.status === "ongoing");
  const newReleases = MOCK_STORIES.filter((s) => s.isNewRelease);
  const recommendedStories = MOCK_STORIES.slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#F5EFEB] to-white border border-stone-200 p-8 sm:p-14 text-center space-y-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          The Living Hearth of African Mythology
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight font-serif max-w-3xl mx-auto leading-tight">
          Where Ancient Lore Meets <span className="text-amber-700">Interactive Destiny</span>
        </h1>

        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Step into centuries of African oral traditions, mythological epics, and trickster wisdom. Read, listen with authentic Griot voice narration, and forge your own path through branching moral choices.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/explore">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-7 py-6 text-sm rounded-xl shadow-md">
              <Compass className="w-4 h-4 mr-2" />
              Explore Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/studio">
            <Button
              variant="outline"
              className="border-stone-300 text-stone-800 hover:bg-stone-100 font-semibold px-6 py-6 text-sm rounded-xl"
            >
              <Flame className="w-4 h-4 mr-2 text-amber-600" />
              Griot Story Studio
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-stone-200/80 text-left">
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-stone-200">
            <Volume2 className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Oral Griot Audio</p>
              <p className="text-[10px] text-stone-500">Traditional cadence</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-stone-200">
            <Compass className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Branching Tales</p>
              <p className="text-[10px] text-stone-500">Choice-driven endings</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-stone-200">
            <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Living Library</p>
              <p className="text-[10px] text-stone-500">Save quotes & lore</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-stone-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Creator Support</p>
              <p className="text-[10px] text-stone-500">Direct Paystack tip</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support INKOMA Banner */}
      <SupportInkomaBanner />

      {/* Continue Reading Shelf */}
      <ContinueReadingBar />

      {/* Featured Stories Shelf */}
      <StoryShelf
        title="Featured Folklore"
        subtitle="Celebrated epics and essential community favorites"
        icon={<Sparkles className="w-5 h-5 text-amber-600" />}
        stories={featuredStories}
        viewAllHref="/explore?sort=trending"
      />

      {/* Recently Updated Shelf */}
      <StoryShelf
        title="Recently Updated"
        subtitle="Fresh chapters and branching updates penned by master griots"
        icon={<Flame className="w-5 h-5 text-orange-600" />}
        stories={recentlyUpdated}
        viewAllHref="/explore?status=ongoing"
      />

      {/* New Releases */}
      <StoryShelf
        title="New Releases"
        subtitle="Newly preserved oral accounts and modern African fantasy"
        icon={<BookOpen className="w-5 h-5 text-amber-700" />}
        stories={newReleases}
        viewAllHref="/explore?sort=newest"
      />

      {/* Recommended for You */}
      <StoryShelf
        title="Recommended for You"
        subtitle="Curated based on traditional roots and philosophical depth"
        icon={<Compass className="w-5 h-5 text-amber-600" />}
        stories={recommendedStories}
        viewAllHref="/explore"
      />
    </div>
  );
}
