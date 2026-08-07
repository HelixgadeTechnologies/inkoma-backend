"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
import { Tradition, StoryStatus } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Volume2,
  GitFork,
  Heart,
  Eye,
  Clock,
  Bookmark,
  X,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TRADITIONS: (Tradition | "all")[] = [
  "all",
  "Ashanti/Akan",
  "Yoruba",
  "Zulu",
  "Dogon",
  "Pan-African",
  "Swahili",
  "Kikuyu",
  "Nubian",
];

const GENRES = [
  "All Genres",
  "Trickster Lore",
  "Historical Epics",
  "Spiritual Lore",
  "Cosmology & Astronomy",
  "Animal Fables",
  "Love & Courtship",
  "Proverbs & Philosophy",
];

export default function ExplorePage() {
  const { filteredStories, filters, setFilters } = useStory();
  const { isBookmarked, toggleBookmark } = useLibrary();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.tradition && filters.tradition !== "all" ? 1 : 0) +
    (filters.genre && filters.genre !== "All Genres" ? 1 : 0) +
    (filters.status && filters.status !== "all" ? 1 : 0) +
    (filters.interactiveOnly ? 1 : 0) +
    (filters.audioOnly ? 1 : 0);

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      tradition: "all",
      genre: undefined,
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Folklore Archive
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
            Browse & Discover Tales
          </h1>
          <p className="text-sm text-stone-600">
            Search by title, author pen name, oral tradition, or interactive branching paths.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500 shrink-0">Sort by:</span>
          <select
            value={filters.sortBy || "trending"}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="text-xs font-semibold bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
          >
            <option value="trending">🔥 Trending & Popular</option>
            <option value="newest">✨ Newest Releases</option>
            <option value="most_read">👁️ Most Read</option>
            <option value="most_liked">❤️ Most Liked</option>
            <option value="readTime">⏱️ Shortest Read Time</option>
          </select>
        </div>
      </div>

      {/* Search Bar & Filter Toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="text"
              placeholder="Search by story title, pen name, keywords, or characters (e.g., Anansi, Sundiata, Mami Wata)..."
              value={filters.searchQuery || ""}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-10 pr-10 py-6 bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 rounded-2xl shadow-xs"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`border-stone-300 rounded-2xl py-6 px-4 gap-2 transition-all ${
              showAdvancedFilters || activeFiltersCount > 0
                ? "bg-amber-50 border-amber-400 text-amber-900"
                : "bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Tradition Horizontal Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TRADITIONS.map((tradition) => {
            const isSelected =
              (tradition === "all" && (!filters.tradition || filters.tradition === "all")) ||
              filters.tradition === tradition;

            return (
              <button
                key={tradition}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, tradition }))}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                {tradition === "all" ? "All Traditions" : tradition}
              </button>
            );
          })}
        </div>

        {/* Expanded Filters Drawer */}
        {showAdvancedFilters && (
          <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Refine Search Results
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Reset all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Genre Selector */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700">Genre Category</label>
                <select
                  value={filters.genre || "All Genres"}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      genre: e.target.value === "All Genres" ? undefined : e.target.value,
                    }))
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700">Story Status</label>
                <select
                  value={filters.status || "all"}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value as StoryStatus }))
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed Stories</option>
                  <option value="ongoing">Ongoing Manuscripts</option>
                </select>
              </div>

              {/* Format Toggles */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700">Format & Features</label>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-600">
                    <input
                      type="checkbox"
                      checked={filters.interactiveOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, interactiveOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Interactive Branches Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-stone-600">
                    <input
                      type="checkbox"
                      checked={filters.audioOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, audioOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Oral Audio Narration Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Story Grid & Results Count */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing <strong className="text-stone-900">{filteredStories.length}</strong> folklore tales
          </span>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-amber-700 hover:underline font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filteredStories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">No tales found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn&apos;t find any stories matching your query. Try broadening your keywords or resetting filters.
            </p>
            <Button onClick={resetFilters} variant="outline" className="text-xs">
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
                  className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover */}
                  <Link href={`/story/${story.id}`} className="relative h-48 w-full overflow-hidden bg-stone-100 block">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <Badge className="bg-amber-600/90 text-white backdrop-blur-xs text-[10px] font-medium border-0 shadow-xs">
                        {story.tradition}
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
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90 hover:text-white"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="flex items-center gap-1 drop-shadow-xs">
                        <Clock className="w-3 h-3 text-amber-300" /> {story.estimatedReadTime} min
                      </span>
                      <div className="flex items-center gap-2">
                        {story.hasAudioNarration && (
                          <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-300">
                            <Volume2 className="w-2.5 h-2.5" /> Audio
                          </span>
                        )}
                        {story.isInteractive && (
                          <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-300">
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
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          {story.mainGenre}
                        </span>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            story.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {story.status === "completed" ? "Completed" : "Ongoing"}
                        </span>
                      </div>

                      <Link href={`/story/${story.id}`}>
                        <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors font-serif">
                          {story.title}
                        </h3>
                      </Link>

                      <Link
                        href={`/profile/kwame_asante`}
                        className="text-xs text-stone-500 hover:text-stone-800 transition-colors block line-clamp-1"
                      >
                        by {story.authorPenName || story.authorName}
                      </Link>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {story.synopsis}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          {story.readsCount > 1000
                            ? `${(story.readsCount / 1000).toFixed(1)}k`
                            : story.readsCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-amber-600" />
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
