"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
import { StoryStatus } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Volume2,
  GitFork,
  Heart,
  Eye,
  Clock,
  Bookmark,
  Sparkles,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { MAIN_GENRES } from "@/config/genres";

const GENRE_CATEGORIES = ["All Genres", ...MAIN_GENRES];

export default function ExplorePage() {
  const { filteredStories, filters, setFilters } = useStory();
  const { isBookmarked, toggleBookmark } = useLibrary();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (selectedGenre !== "All Genres" ? 1 : 0) +
    (filters.status && filters.status !== "all" ? 1 : 0) +
    (filters.interactiveOnly ? 1 : 0) +
    (filters.audioOnly ? 1 : 0);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setFilters((prev) => ({
      ...prev,
      genre: genre === "All Genres" ? undefined : genre,
    }));
  };

  const resetFilters = () => {
    setSelectedGenre("All Genres");
    setFilters({
      searchQuery: "",
      genre: undefined,
      tradition: "all",
      status: "all",
      interactiveOnly: false,
      audioOnly: false,
      sortBy: "trending",
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 dark:bg-red-500/20 border border-[#680C07]/20 dark:border-red-500/30 text-[#680C07] dark:text-red-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#680C07] dark:text-red-400" />
            Explore Library
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
            Discover Stories Across Genres
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Search thousands of books by Title, Author, or Genre. Filter by status, audio, and popular releases.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 shrink-0">Sort by:</span>
          <Select
            value={filters.sortBy || "trending"}
            onChange={(val) => setFilters((prev) => ({ ...prev, sortBy: val as any }))}
            options={[
              { value: "trending", label: "🔥 Trending & Popular" },
              { value: "newest", label: "✨ Newest Releases" },
              { value: "most_read", label: "👁️ Most Read" },
              { value: "most_liked", label: "❤️ Most Liked" },
              { value: "readTime", label: "⏱️ Reading Duration" },
            ]}
            className="w-48 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Search Input Bar & Filters Toggle */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="text"
              placeholder="Search by Title, Author name, or Genre..."
              value={filters.searchQuery || ""}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-11 py-6 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs text-sm dark:text-stone-100"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`border-stone-300 dark:border-stone-700 rounded-2xl py-6 px-4 gap-2 transition-all ${
              showAdvancedFilters || activeFiltersCount > 0
                ? "bg-[#680C07]/10 dark:bg-red-500/20 border-[#680C07] dark:border-red-500 text-[#680C07] dark:text-red-400"
                : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#680C07] dark:bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Primary Discovery Categories: Genres */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {GENRE_CATEGORIES.map((genre) => {
            const isSelected = selectedGenre === genre;

            return (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreSelect(genre)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#680C07] dark:bg-red-700 text-white shadow-xs"
                    : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Expanded Filters Drawer */}
        {showAdvancedFilters && (
          <div className="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Refine Search Results
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Reset all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300 block">Publication Status</label>
                <Select
                  value={filters.status || "all"}
                  onChange={(val) =>
                    setFilters((prev) => ({ ...prev, status: val as StoryStatus }))
                  }
                  options={[
                    { value: "all", label: "All Stories (Completed & Ongoing)" },
                    { value: "completed", label: "Completed Books Only" },
                    { value: "ongoing", label: "Ongoing Books Only" },
                  ]}
                  className="dark:bg-stone-900 dark:border-stone-700 dark:text-stone-200"
                />
              </div>

              {/* Format Toggles */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Format Options</label>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400">
                    <input
                      type="checkbox"
                      checked={filters.interactiveOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, interactiveOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-[#680C07] focus:ring-[#680C07]"
                    />
                    <span>Interactive Branching Paths</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400">
                    <input
                      type="checkbox"
                      checked={filters.audioOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, audioOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-[#680C07] focus:ring-[#680C07]"
                    />
                    <span>Audio Narration Available</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Story Grid & Results Count */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>
            Showing <strong className="text-stone-900 dark:text-stone-100">{filteredStories.length}</strong> stories
          </span>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#680C07] dark:text-red-400 hover:underline font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filteredStories.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#680C07]/10 dark:bg-red-500/20 border border-[#680C07]/20 dark:border-red-500/30 text-[#680C07] dark:text-red-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">No stories found</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              We couldn&apos;t find any stories matching your query. Try broadening your keywords or resetting filters.
            </p>
            <Button onClick={resetFilters} variant="outline" className="text-xs border-stone-300 dark:border-stone-700">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredStories.map((story) => {
              const bookmarked = isBookmarked(story.id);

              return (
                <div
                  key={story.id}
                  className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover */}
                  <Link href={`/story/${story.id}`} className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800 block">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <Badge className="bg-[#680C07] text-white backdrop-blur-xs text-[10px] font-medium border-0 shadow-xs">
                        {story.mainGenre}
                      </Badge>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark(story.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                          bookmarked
                            ? "bg-[#680C07] text-white shadow-xs"
                            : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90 hover:text-white"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="flex items-center gap-1 drop-shadow-xs">
                        <Clock className="w-3 h-3 text-red-200" /> {story.estimatedReadTime} min
                      </span>
                      <div className="flex items-center gap-2">
                        {story.hasAudioNarration && (
                          <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-red-200">
                            <Volume2 className="w-2.5 h-2.5" /> Audio
                          </span>
                        )}
                        {story.isInteractive && (
                          <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-red-200">
                            <GitFork className="w-2.5 h-2.5" /> {story.totalBranches} paths
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#680C07] dark:text-red-400 uppercase tracking-wider">
                          {story.mainGenre}
                        </span>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            story.status === "completed"
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                              : "bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30"
                          }`}
                        >
                          {story.status === "completed" ? "Completed" : "Ongoing"}
                        </span>
                      </div>

                      <Link href={`/story/${story.id}`}>
                        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-[#680C07] dark:group-hover:text-red-400 transition-colors font-serif">
                          {story.title}
                        </h3>
                      </Link>

                      <Link
                        href={`/profile/kwame_asante`}
                        className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors block line-clamp-1"
                      >
                        by {story.authorPenName || story.authorName}
                      </Link>

                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {story.synopsis}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          {story.readsCount > 1000
                            ? `${(story.readsCount / 1000).toFixed(1)}k`
                            : story.readsCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-[#680C07] dark:text-red-400 fill-current" />
                          {story.likesCount}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-stone-400">
                        {story.totalChapters} {story.totalChapters === 1 ? "Chap" : "Chaps"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
