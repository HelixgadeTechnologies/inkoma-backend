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
  Sparkles,
  RotateCcw,
  BookOpen,
  User,
  Tag,
  Grid,
  List,
  Filter,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const TRADITIONS: { name: Tradition | "all"; label: string; icon: string }[] = [
  { name: "all", label: "All Traditions", icon: "🌍" },
  { name: "Ashanti/Akan", label: "Ashanti / Akan", icon: "🕷️" },
  { name: "Yoruba", label: "Yoruba Orisha", icon: "⚡" },
  { name: "Zulu", label: "Zulu Epics", icon: "🛡️" },
  { name: "Dogon", label: "Dogon Astronomy", icon: "✨" },
  { name: "Swahili", label: "Swahili Coast", icon: "⛵" },
  { name: "Kikuyu", label: "Kikuyu Lore", icon: "🏔️" },
  { name: "Nubian", label: "Nubian Kingdom", icon: "🏺" },
  { name: "Pan-African", label: "Pan-African Myth", icon: "☀️" },
];

const GENRE_CATEGORIES = [
  { id: "All", name: "All Genres", icon: "📜", desc: "Complete folklore collection" },
  { id: "Trickster Lore", name: "Trickster Tales", icon: "🕷️", desc: "Anansi, Tortoise, cunning wit" },
  { id: "Historical Epics", name: "Historical Epics", icon: "👑", desc: "Sundiata, Shaka, Sahel kings" },
  { id: "Spiritual Lore", name: "Spiritual & Deities", icon: "🌊", desc: "Orishas, Mami Wata, spirits" },
  { id: "Cosmology & Astronomy", name: "Cosmology & Stars", icon: "✨", desc: "Dogon secrets & star myths" },
  { id: "Animal Fables", name: "Animal Fables", icon: "🦁", desc: "Moral lessons from wildlife" },
  { id: "Love & Courtship", name: "Love & Courtship", icon: "🕊️", desc: "Ancient ballads & romance" },
  { id: "Proverbs & Philosophy", name: "Proverbs & Wisdom", icon: "💡", desc: "Riddles & elder philosophy" },
];

type SearchScope = "all" | "title" | "author" | "genre";

export default function BrowsePage() {
  const { filteredStories, filters, setFilters } = useStory();
  const { isBookmarked, toggleBookmark } = useLibrary();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const activeScope: SearchScope = filters.searchScope || "all";

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.titleSearch ? 1 : 0) +
    (filters.authorSearch ? 1 : 0) +
    (filters.genreSearch ? 1 : 0) +
    (filters.tradition && filters.tradition !== "all" ? 1 : 0) +
    (filters.genre && filters.genre !== "All Genres" ? 1 : 0) +
    (filters.status && filters.status !== "all" ? 1 : 0) +
    (filters.interactiveOnly ? 1 : 0) +
    (filters.audioOnly ? 1 : 0);

  const resetAllFilters = () => {
    setFilters({
      searchQuery: "",
      searchScope: "all",
      titleSearch: "",
      authorSearch: "",
      genreSearch: "",
      tradition: "all",
      genre: undefined,
      status: "all",
      interactiveOnly: false,
      audioOnly: false,
      sortBy: "trending",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Folklore Search Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
            Browse & Search Stories
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl">
            Explore traditional African myths, interactive choice quests, and legendary epics. Search by title, author pen name, genre category, or cultural lineage.
          </p>
        </div>

        {/* View Mode & Sorting Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggles */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-[#D4AF37] text-stone-950 shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-[#D4AF37] text-stone-950 shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 shrink-0 hidden sm:inline">Sort:</span>
            <Select
              value={filters.sortBy || "trending"}
              onChange={(val) => setFilters((prev) => ({ ...prev, sortBy: val as any }))}
              options={[
                { value: "trending", label: "🔥 Trending & Popular" },
                { value: "newest", label: "✨ Newest Releases" },
                { value: "most_read", label: "👁️ Most Read" },
                { value: "most_liked", label: "❤️ Most Liked" },
                { value: "readTime", label: "⏱️ Read Time" },
              ]}
              className="w-48 bg-white border-stone-200 text-xs font-medium shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Main Search & Search Scope Section */}
      <div className="space-y-4">
        {/* Search Scope Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-[#D4AF37]" /> Scope:
          </span>
          {[
            { id: "all", label: "All Fields", icon: Search },
            { id: "title", label: "Search by Title", icon: BookOpen },
            { id: "author", label: "Search by Author", icon: User },
            { id: "genre", label: "Search by Genre", icon: Tag },
          ].map((scope) => {
            const Icon = scope.icon;
            const isSelected = activeScope === scope.id;
            return (
              <button
                key={scope.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    searchScope: scope.id as SearchScope,
                  }))
                }
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#D4AF37] text-stone-950 shadow-xs font-bold"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{scope.label}</span>
              </button>
            );
          })}
        </div>

        {/* Primary Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="text"
              placeholder={
                activeScope === "title"
                  ? "Type a story title (e.g., Anansi, Sundiata)..."
                  : activeScope === "author"
                  ? "Type an author pen name (e.g., Kwame Asante)..."
                  : activeScope === "genre"
                  ? "Type a genre or subgenre (e.g., Trickster, Epics)..."
                  : "Search stories by title, author, genre, or keywords..."
              }
              value={filters.searchQuery || ""}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-11 py-6 bg-white border-stone-300 rounded-2xl shadow-xs text-sm focus:ring-[#D4AF37] focus:border-[#D4AF37]"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs bg-stone-100 px-2.5 py-1 rounded-md font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`border-stone-300 rounded-2xl py-6 px-5 gap-2 transition-all shrink-0 ${
              showAdvancedFilters || activeFiltersCount > 0
                ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] font-bold"
                : "bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Advanced Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Advanced Targeted Filters Panel */}
        {showAdvancedFilters && (
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-md space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Targeted Search & Feature Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs text-stone-500 hover:text-[#D4AF37] flex items-center gap-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
              </button>
            </div>

            {/* Targeted Field Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Search by Specific Title
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Anansi & the Sacred..."
                  value={filters.titleSearch || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, titleSearch: e.target.value }))}
                  className="bg-stone-50 border-stone-300 text-xs py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Search by Author Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Kwame Asante..."
                  value={filters.authorSearch || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, authorSearch: e.target.value }))}
                  className="bg-stone-50 border-stone-300 text-xs py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Search by Specific Genre
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Trickster, Epics..."
                  value={filters.genreSearch || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, genreSearch: e.target.value }))}
                  className="bg-stone-50 border-stone-300 text-xs py-2.5"
                />
              </div>
            </div>

            {/* Select Dropdowns & Format Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-stone-100">
              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Genre Category
                </label>
                <Select
                  value={filters.genre || "All Genres"}
                  onChange={(val) =>
                    setFilters((prev) => ({
                      ...prev,
                      genre: val === "All Genres" ? undefined : val,
                    }))
                  }
                  options={GENRE_CATEGORIES.map((g) => ({ value: g.name, label: `${g.icon} ${g.name}` }))}
                  className="bg-stone-50 border-stone-300 text-xs"
                />
              </div>

              {/* Status Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Story Status
                </label>
                <Select
                  value={filters.status || "all"}
                  onChange={(val) =>
                    setFilters((prev) => ({ ...prev, status: val as StoryStatus }))
                  }
                  options={[
                    { value: "all", label: "All Statuses" },
                    { value: "completed", label: "Completed Stories" },
                    { value: "ongoing", label: "Ongoing Manuscripts" },
                  ]}
                  className="bg-stone-50 border-stone-300 text-xs"
                />
              </div>

              {/* Format Toggles */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Special Format Features
                </label>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                    <input
                      type="checkbox"
                      checked={filters.interactiveOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, interactiveOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <GitFork className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Interactive Branching Paths</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                    <input
                      type="checkbox"
                      checked={filters.audioOnly || false}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, audioOnly: e.target.checked }))
                      }
                      className="rounded border-stone-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Oral Audio Narration</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {GENRE_CATEGORIES.map((cat) => {
            const isSelected =
              (cat.name === "All Genres" && !filters.genre) || filters.genre === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    genre: cat.name === "All Genres" ? undefined : cat.name,
                  }))
                }
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-[#D4AF37] text-stone-950 border-[#D4AF37] shadow-sm font-bold"
                    : "bg-white border-stone-200/90 text-stone-700 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <span className="text-[11px] font-bold leading-tight">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cultural Tradition Chips */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Cultural Lineages & Traditions
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TRADITIONS.map((trad) => {
            const isSelected =
              (trad.name === "all" && (!filters.tradition || filters.tradition === "all")) ||
              filters.tradition === trad.name;

            return (
              <button
                key={trad.name}
                onClick={() => setFilters((prev) => ({ ...prev, tradition: trad.name }))}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span>{trad.icon}</span>
                <span>{trad.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-200/80">
        <span>
          Showing <strong className="text-stone-900">{filteredStories.length}</strong> stories
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-[#D4AF37] font-bold hover:underline"
          >
            Clear all filters ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Results Grid / List */}
      {filteredStories.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-stone-900">No matching stories found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn&apos;t find any folklore tales matching your title, author, or category filters. Try clearing your search query or resetting filters.
            </p>
          </div>
          <Button onClick={resetAllFilters} variant="folklore" size="sm" className="px-6">
            Reset All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredStories.map((story) => {
            const bookmarked = isBookmarked(story.id);

            return (
              <div
                key={story.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cover Image */}
                <Link href={`/story/${story.id}`} className="relative h-48 w-full overflow-hidden bg-stone-100 block">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/50" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <Badge className="bg-[#D4AF37] text-stone-950 backdrop-blur-xs text-[10px] font-bold border-0 shadow-xs">
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
                          ? "bg-[#D4AF37] text-stone-950 shadow-xs font-bold"
                          : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90 hover:text-white"
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-stone-950 text-stone-950" : ""}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1 drop-shadow-xs">
                      <Clock className="w-3 h-3 text-amber-200" /> {story.estimatedReadTime} min
                    </span>
                    <div className="flex items-center gap-2">
                      {story.hasAudioNarration && (
                        <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-200">
                          <Volume2 className="w-2.5 h-2.5" /> Audio
                        </span>
                      )}
                      {story.isInteractive && (
                        <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md text-[10px] text-amber-200">
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
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        {story.mainGenre}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          story.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                        }`}
                      >
                        {story.status === "completed" ? "Completed" : "Ongoing"}
                      </span>
                    </div>

                    <Link href={`/story/${story.id}`}>
                      <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-[#D4AF37] transition-colors font-serif">
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
                        <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
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
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-3 gap-4"
            >
              <Link href={`/story/${story.id}`} className="relative h-40 sm:h-auto sm:w-44 flex-shrink-0 rounded-xl overflow-hidden block bg-stone-100">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between py-1 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#D4AF37] text-stone-950 font-bold text-[10px] border-0">
                      {story.tradition}
                    </Badge>
                    <span className="text-[11px] font-bold text-stone-500 uppercase">
                      {story.mainGenre}
                    </span>
                  </div>

                  <Link href={`/story/${story.id}`}>
                    <h3 className="text-lg font-bold font-serif text-stone-900 hover:text-[#D4AF37] transition-colors">
                      {story.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-500 font-medium">
                    By {story.authorPenName || story.authorName}
                  </p>

                  <p className="text-xs text-stone-600 line-clamp-2 pt-1">
                    {story.synopsis}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 gap-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" /> {story.estimatedReadTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-stone-400" /> {story.readsCount} reads
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#D4AF37]" /> {story.likesCount} likes
                    </span>
                  </div>

                  <Link href={`/story/${story.id}`}>
                    <Button size="sm" variant="folklore" className="text-xs h-8 px-4">
                      Read Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
