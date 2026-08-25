"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Compass, Flame, Volume2, ShieldCheck, ArrowRight, Heart, TrendingUp, Star } from "lucide-react";
import { SupportInkomaBanner } from "@/components/features/discovery/support-inkoma-banner";
import { ContinueReadingBar } from "@/components/features/discovery/continue-reading-bar";
import { CategoryCarousel } from "@/components/features/discovery/category-carousel";
import { StoryShelf } from "@/components/features/discovery/story-shelf";
import { MOCK_STORIES } from "@/config/mock-data";

export default function HomePage() {
  const featuredStories = MOCK_STORIES.filter((s) => s.isFeatured);
  const recentlyUpdated = MOCK_STORIES.filter((s) => s.isRecentlyUpdated || s.status === "ongoing");
  const newReleases = MOCK_STORIES.filter((s) => s.isNewRelease);
  const recommendedStories = MOCK_STORIES.slice(0, 4);
  const trendingStories = [...MOCK_STORIES].sort((a, b) => b.readsCount - a.readsCount).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section: Welcome to INKOMA */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 sm:p-14 text-center space-y-6 shadow-sm transition-colors">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#680C07]/10 dark:bg-red-500/20 border border-[#680C07]/20 dark:border-red-500/30 text-[#680C07] dark:text-red-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#680C07] dark:text-red-400" />
          Welcome to INKOMA
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight font-serif max-w-3xl mx-auto leading-tight">
          Where Stories Come Alive & <span className="text-[#680C07] dark:text-red-400">Imagination Thrives</span>
        </h1>

        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
          A global home for readers and writers. Explore captivating Romance, epic Fantasy, thrilling Mysteries, Sci-Fi adventures, rich Folklore, and immersive choice-driven interactive books.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/explore">
            <Button className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white font-bold px-7 py-6 text-sm rounded-xl shadow-md">
              <Compass className="w-4 h-4 mr-2" />
              Explore Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/studio/new">
            <Button
              variant="outline"
              className="border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold px-6 py-6 text-sm rounded-xl"
            >
              <Flame className="w-4 h-4 mr-2 text-[#680C07] dark:text-red-400" />
              Writer Studio
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-stone-200/80 dark:border-stone-800 text-left">
          <div className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80">
            <BookOpen className="w-5 h-5 text-[#680C07] dark:text-red-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">All Genres</p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Romance to Sci-Fi & Lore</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80">
            <Volume2 className="w-5 h-5 text-[#680C07] dark:text-red-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Audio Narration</p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Listen anytime, anywhere</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80">
            <Heart className="w-5 h-5 text-[#680C07] dark:text-red-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Your Library</p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Bookmarks & saved quotes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80">
            <ShieldCheck className="w-5 h-5 text-[#680C07] dark:text-red-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Author Support</p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Direct creator tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories (Crucial Author Feature Spotlight) */}
      <StoryShelf
        title="Featured Stories"
        subtitle="Editor picks, featured authors, and spotlight masterpieces"
        icon={<Star className="w-5 h-5 text-[#680C07] dark:text-red-400 fill-current" />}
        stories={featuredStories}
        viewAllHref="/explore?sort=trending"
      />

      {/* Recommended / Suggested for You */}
      <StoryShelf
        title="Recommended for You"
        subtitle="Handpicked recommendations based on your reading tastes"
        icon={<Compass className="w-5 h-5 text-[#680C07] dark:text-red-400" />}
        stories={recommendedStories}
        viewAllHref="/explore"
      />

      {/* Support INKOMA Banner */}
      <SupportInkomaBanner />

      {/* Genre & Category Horizontal Carousel Bar */}
      <CategoryCarousel />

      {/* New Releases */}
      <StoryShelf
        title="New Releases"
        subtitle="Fresh books and debut releases hot off the writer press"
        icon={<BookOpen className="w-5 h-5 text-[#680C07] dark:text-red-400" />}
        stories={newReleases}
        viewAllHref="/explore?sort=newest"
      />

      {/* Recently Updated */}
      <StoryShelf
        title="Recently Updated"
        subtitle="Latest chapters added by authors actively updating their ongoing books"
        icon={<Flame className="w-5 h-5 text-[#680C07] dark:text-red-400" />}
        stories={recentlyUpdated}
        viewAllHref="/explore?status=ongoing"
      />

      {/* Popular / Trending Stories */}
      <StoryShelf
        title="Popular & Trending Stories"
        subtitle="Most read and highly rated books captivating the community right now"
        icon={<TrendingUp className="w-5 h-5 text-[#680C07] dark:text-red-400" />}
        stories={trendingStories}
        viewAllHref="/explore?sort=most_read"
      />
    </div>
  );
}
