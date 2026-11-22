"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
import {
  getTrendingStories,
  getHighestRatedStories,
  getStoryTraditions,
  listStories,
  TraditionItem,
} from "@/src/services/storyService";
import { getTopAuthors, TopAuthor } from "@/src/services/userService";
import { Story } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Award,
  Bookmark,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Volume2,
  Sparkles,
  Heart,
  Clock,
  Loader2,
  Compass,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CategoryCarousel } from "@/components/features/discovery/category-carousel";
import { AuthGuard } from "@/components/shared/auth-guard";

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
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full min-h-[100px] bg-stone-100 border border-[#D4AF37]/30 flex flex-col items-center justify-center p-3 text-center space-y-1">
        <BookOpen className="w-6 h-6 text-[#B8860B]" />
        <span className="text-[10px] font-bold text-stone-800 line-clamp-1">{alt}</span>
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

// Genre Badge Styles for Highest Rated & Cards
function getGenreBadgeClass(genre: string) {
  const g = (genre || "").toUpperCase();
  switch (g) {
    case "ROMANCE":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "DRAMA":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "PARANORMAL":
    case "MYSTERY":
      return "bg-teal-50 text-teal-700 border-teal-200";
    case "FANTASY":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "HISTORICAL":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "MYTHOLOGY":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case "EPIC":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "THRILLER":
      return "bg-red-50 text-red-700 border-red-200";
    case "SCI-FI":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-stone-100 text-stone-700 border-stone-200";
  }
}

// Genre Pill Options
const GENRE_PILLS = [
  { id: "all", label: "All", icon: "" },
  { id: "romance", label: "Romance", icon: "♡" },
  { id: "fantasy", label: "Fantasy", icon: "⚔️" },
  { id: "thriller", label: "Thriller", icon: "🖊️" },
  { id: "mystery", label: "Mystery", icon: "🔍" },
  { id: "scifi", label: "Sci-Fi", icon: "🪐" },
  { id: "folklore", label: "Folklore", icon: "✨" },
  { id: "afrofuturism", label: "Afrofuturism", icon: "☀️" },
];

export default function ExplorePage() {
  const { stories: localStories } = useStory();
  const { isBookmarked, toggleBookmark } = useLibrary();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedTradition, setSelectedTradition] = useState<string>("all");
  const [audioOnly, setAudioOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "most_read" | "most_liked" | "highest_rated">("trending");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sections Remote State
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);
  const [highestRatedStories, setHighestRatedStories] = useState<Story[]>([]);
  const [traditions, setTraditions] = useState<TraditionItem[]>([]);
  const [topAuthors, setTopAuthors] = useState<TopAuthor[]>([]);

  // Main Discovery Feed State
  const [feedStories, setFeedStories] = useState<Story[]>([]);
  const [feedTotal, setFeedTotal] = useState(0);
  const [feedPage, setFeedPage] = useState(1);
  const [feedTotalPages, setFeedTotalPages] = useState(1);
  const [feedLoading, setFeedLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const trendingScrollRef = useRef<HTMLDivElement>(null);
  const topAuthorsScrollRef = useRef<HTMLDivElement>(null);
  const discoveryFeedRef = useRef<HTMLDivElement>(null);

  // 1. Fetch remote sections on mount
  useEffect(() => {
    let mounted = true;

    // Trending Stories (GET /api/v1/stories/trending)
    getTrendingStories()
      .then((data) => {
        if (!mounted) return;
        if (data.length > 0) {
          setTrendingStories(data);
        } else if (localStories.length > 0) {
          // Fallback to local stories engagement sort
          const sorted = [...localStories]
            .sort((a, b) => ((b.readsCount || 0) + (b.likesCount || 0)) - ((a.readsCount || 0) + (a.likesCount || 0)))
            .slice(0, 10);
          setTrendingStories(sorted);
        }
      })
      .catch(() => {});

    // Highest Rated Stories (GET /api/v1/stories/highest-rated)
    getHighestRatedStories()
      .then((data) => {
        if (!mounted) return;
        if (data.length > 0) {
          setHighestRatedStories(data);
        } else if (localStories.length > 0) {
          const sorted = [...localStories]
            .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
            .slice(0, 10);
          setHighestRatedStories(sorted);
        }
      })
      .catch(() => {});

    // Traditions with manuscript counts (GET /api/v1/stories/traditions)
    getStoryTraditions()
      .then((data) => {
        if (mounted && data.length > 0) {
          setTraditions(data);
        }
      })
      .catch(() => {});

    // Top Authors Leaderboard (GET /api/v1/users/top-authors)
    getTopAuthors()
      .then((data) => {
        if (!mounted) return;
        if (data.length > 0) {
          setTopAuthors(data);
        } else if (localStories.length > 0) {
          const authorMap = new Map<string, TopAuthor>();
          localStories.forEach((s) => {
            const authorId = s.authorId || s.authorName;
            if (!authorId) return;
            const existing = authorMap.get(authorId);
            const reads = (existing?.totalReads || 0) + (s.readsCount || 0);
            authorMap.set(authorId, {
              id: authorId,
              name: s.authorPenName || s.authorName,
              penName: s.authorPenName || s.authorName,
              avatarUrl: s.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
              avatar: s.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
              totalReads: reads,
              reads: `${reads} Reads`,
            });
          });
          const list = Array.from(authorMap.values())
            .sort((a, b) => (b.totalReads || 0) - (a.totalReads || 0))
            .slice(0, 10)
            .map((a, idx) => ({ ...a, rank: idx + 1 }));
          setTopAuthors(list);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [localStories]);

  // 2. Fetch Main Discovery Feed (GET /api/v1/stories)
  const fetchDiscoveryFeed = useCallback(
    async (pageToLoad: number, append = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setFeedLoading(true);
      }

      try {
        const res = await listStories({
          search: searchQuery.trim() || undefined,
          mainGenre: selectedGenre !== "all" ? selectedGenre : undefined,
          tradition: selectedTradition !== "all" ? selectedTradition : undefined,
          hasAudioNarration: audioOnly ? true : undefined,
          sortBy,
          page: pageToLoad,
          limit: 12,
        });

        if (append) {
          setFeedStories((prev) => {
            const existingIds = new Set(prev.map((s) => s.id));
            const newStories = res.stories.filter((s) => !existingIds.has(s.id));
            return [...prev, ...newStories];
          });
        } else {
          // If backend returns empty array and no search filters applied, fallback to localStories
          if (res.stories.length === 0 && !searchQuery && selectedGenre === "all" && selectedTradition === "all" && localStories.length > 0) {
            setFeedStories(localStories);
            setFeedTotal(localStories.length);
            setFeedTotalPages(1);
          } else {
            setFeedStories(res.stories);
            setFeedTotal(res.total || res.stories.length);
            setFeedTotalPages(res.totalPages || 1);
          }
        }
        setFeedPage(res.page || pageToLoad);
      } catch (err) {
        console.warn("[ExplorePage] Error fetching discovery feed:", err);
        if (!append && localStories.length > 0) {
          setFeedStories(localStories);
          setFeedTotal(localStories.length);
          setFeedTotalPages(1);
        }
      } finally {
        setFeedLoading(false);
        setIsLoadingMore(false);
      }
    },
    [searchQuery, selectedGenre, selectedTradition, audioOnly, sortBy, localStories]
  );

  // Trigger discovery search on filter changes with slight debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDiscoveryFeed(1, false);
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchDiscoveryFeed]);

  const handleLoadMore = () => {
    if (feedPage < feedTotalPages && !isLoadingMore) {
      fetchDiscoveryFeed(feedPage + 1, true);
    }
  };

  const handleSelectTradition = (traditionName: string) => {
    setSelectedTradition(traditionName);
    discoveryFeedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedTradition("all");
    setAudioOnly(false);
    setSortBy("trending");
  };

  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
    amount = 320
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -amount : amount;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <AuthGuard featureName="Folklore Discovery">
      <div className="max-w-7xl mx-auto space-y-8 pb-20 text-stone-900 font-sans">
        {/* 1. PAGE TITLE */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black font-serif text-stone-950 tracking-tight">
            Explore Stories
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Discover ancient oral myths, African speculative fiction, and epic folklore manuscripts.
          </p>
        </div>

        {/* 2. SEARCH BAR & FILTERS TOGGLE */}
        <div className="space-y-4">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                type="text"
                placeholder="Search stories, authors, traditions, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-16 py-6 bg-white border-stone-200 rounded-2xl shadow-xs text-sm text-stone-900 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs bg-stone-100 px-2 py-1 rounded-md font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-3.5 rounded-2xl border transition-all shrink-0 ${
                showAdvancedFilters
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#B8860B]"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
              title="Toggle Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* 3. GENRE PILLS ROW (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GENRE_PILLS.map((pill) => {
              const isSelected = selectedGenre.toLowerCase() === pill.label.toLowerCase() || (pill.id === "all" && selectedGenre === "all");

              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setSelectedGenre(pill.id === "all" ? "all" : pill.label);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-[#D4AF37] text-stone-950 shadow-sm"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {pill.icon && <span className="text-xs">{pill.icon}</span>}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* 4. SORT BY & ADVANCED FILTERS PANEL */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Sort by</span>
              <Select
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                options={[
                  { value: "trending", label: "Trending" },
                  { value: "newest", label: "Newest" },
                  { value: "most_read", label: "Most Read" },
                  { value: "most_liked", label: "Most Liked" },
                  { value: "highest_rated", label: "Highest Rated" },
                ]}
                className="w-38 bg-white border-stone-200 text-xs font-bold shadow-xs py-1.5 rounded-xl text-stone-900"
              />
            </div>

            <div className="flex items-center gap-2">
              {(selectedTradition !== "all" || selectedGenre !== "all" || searchQuery || audioOnly) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="border-stone-200 text-stone-800 hover:bg-stone-50 rounded-xl px-3.5 py-1.5 h-9 text-xs font-bold gap-1.5 bg-white shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Filters {showAdvancedFilters ? "▲" : "▼"}</span>
              </Button>
            </div>
          </div>

          {/* Collapsible Advanced Filters Drawer */}
          {showAdvancedFilters && (
            <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> Tradition
                </label>
                <Select
                  value={selectedTradition}
                  onChange={(val) => setSelectedTradition(val)}
                  options={[
                    { value: "all", label: "All Traditions" },
                    { value: "Ashanti/Akan", label: "Ashanti / Akan" },
                    { value: "Yoruba", label: "Yoruba Orisha" },
                    { value: "Dogon", label: "Dogon Cosmology" },
                    { value: "Zulu", label: "Zulu & Southern Epics" },
                    { value: "Swahili", label: "Swahili Coastal Tales" },
                    { value: "Dominican Republic", label: "Dominican & Taíno Lore" },
                    { value: "Pan-African", label: "Pan-African Epics" },
                  ]}
                  className="w-full bg-stone-50 border-stone-200 text-xs font-medium rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Genre
                </label>
                <Select
                  value={selectedGenre}
                  onChange={(val) => setSelectedGenre(val)}
                  options={[
                    { value: "all", label: "All Genres" },
                    { value: "Folklore", label: "Folklore" },
                    { value: "Fantasy", label: "Fantasy" },
                    { value: "Romance", label: "Romance" },
                    { value: "Thriller", label: "Thriller" },
                    { value: "Mystery", label: "Mystery" },
                    { value: "Sci-Fi", label: "Sci-Fi" },
                    { value: "Afrofuturism", label: "Afrofuturism" },
                    { value: "Historical Epics", label: "Historical Epics" },
                  ]}
                  className="w-full bg-stone-50 border-stone-200 text-xs font-medium rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={audioOnly}
                    onChange={(e) => setAudioOnly(e.target.checked)}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-stone-900 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> Audio Narration Only
                    </span>
                    <span className="text-[10px] text-stone-500">Only stories with voice audio</span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* EXPLORE FOLKLORE CATEGORIES & TRADITIONS (GET /api/v1/stories/traditions) */}
        <CategoryCarousel
          traditions={traditions}
          onSelectTradition={handleSelectTradition}
        />

        {/* SECTION 1: TRENDING STORIES (GET /api/v1/stories/trending) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-950 tracking-tight">
                Trending Stories
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollRow(trendingScrollRef, "left", 320)}
                  className="p-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(trendingScrollRef, "right", 320)}
                  className="p-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSortBy("trending");
                  discoveryFeedRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors pl-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Carousel of Portrait Cards */}
          {trendingStories.length === 0 ? (
            <div className="w-full py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
              No trending stories recorded yet. Be the first to read and like stories!
            </div>
          ) : (
            <div
              ref={trendingScrollRef}
              className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
            >
              {trendingStories.map((story, idx) => {
                const bookmarked = isBookmarked(story.id);
                const rank = idx + 1;

                return (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug || story.id}`}
                    className="group block shrink-0 snap-start w-[180px] sm:w-[210px]"
                  >
                    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3 space-y-2.5 relative">
                      {/* Portrait Cover Image */}
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <SafeImage
                          src={story.coverImage || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Rank Badge #1..10 */}
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#D4AF37] text-stone-950 text-xs font-black flex items-center justify-center shadow-md">
                          {rank}
                        </div>

                        {/* Bookmark Icon Top Right */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(story.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                            bookmarked
                              ? "bg-[#D4AF37] text-stone-950 font-bold shadow-xs"
                              : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90"
                          }`}
                          aria-label="Bookmark"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              bookmarked ? "fill-stone-950 text-stone-950" : ""
                            }`}
                          />
                        </button>

                        {/* Floating Genre Tag */}
                        <div className="absolute bottom-2 left-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${getGenreBadgeClass(
                              story.mainGenre || "Folklore"
                            )}`}
                          >
                            {story.mainGenre || "Folklore"}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1 font-serif">
                          {story.title}
                        </h3>
                        <p className="text-[11px] text-stone-500 font-medium truncate">
                          {story.authorPenName || story.authorName || "Storyteller"}
                        </p>
                      </div>

                      {/* Bottom Stats Line */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-1 border-t border-stone-100">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-stone-400" />
                          {story.readsCount || 0}
                        </span>
                        <span className="flex items-center gap-1 text-[#B8860B] font-extrabold">
                          <Star className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
                          5.0
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 2: TOP AUTHORS THIS WEEK (GET /api/v1/users/top-authors) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B8860B]" />
              <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-950 tracking-tight">
                Top Authors This Week
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollRow(topAuthorsScrollRef, "left", 260)}
                  className="p-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(topAuthorsScrollRef, "right", 260)}
                  className="p-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Row of Circular Profile Cards */}
          {topAuthors.length === 0 ? (
            <div className="w-full py-6 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
              No storyteller rankings compiled yet.
            </div>
          ) : (
            <div
              ref={topAuthorsScrollRef}
              className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
            >
              {topAuthors.map((author, idx) => (
                <Link
                  key={author.id || idx}
                  href={`/profile/${(author.username || author.name).toLowerCase().replace(/\s+/g, "_")}`}
                  className="group block text-center shrink-0 snap-start w-[105px] sm:w-[125px]"
                >
                  <div className="flex flex-col items-center space-y-2 p-1">
                    {/* Circular Avatar Container with Gold Ring & Number Badge */}
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] p-1 bg-white shadow-sm overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                        <SafeImage
                          src={author.avatar || author.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                          alt={author.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      {/* Rank Badge #1..10 */}
                      <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D4AF37] text-stone-950 text-xs font-black flex items-center justify-center shadow-md">
                        {author.rank || idx + 1}
                      </div>
                    </div>

                    <div className="space-y-0.5 w-full">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate w-full font-serif">
                        {author.penName || author.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate">
                        {author.reads || `${author.totalReads || author.readsCount || 0} Reads`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: HIGHEST RATED THIS WEEK (GET /api/v1/stories/highest-rated) */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-950 tracking-tight">
                Highest Rated This Week
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setSortBy("highest_rated");
                discoveryFeedRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs sm:text-sm font-bold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Vertical List of Highest Rated Stories */}
          {highestRatedStories.length === 0 ? (
            <div className="w-full py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
              No rated stories recorded yet. Be the first to review a story!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {highestRatedStories.slice(0, 8).map((story) => {
                const bookmarked = isBookmarked(story.id);

                return (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug || story.id}`}
                    className="group block"
                  >
                    <div className="bg-white border border-stone-200/85 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 hover:border-[#D4AF37]/60 hover:shadow-xs transition-all duration-200 h-full">
                      {/* Left Side: Thumbnail + Info */}
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
                          <SafeImage
                            src={story.coverImage || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop"}
                            alt={story.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate font-serif">
                            {story.title}
                          </h4>
                          <p className="text-xs text-stone-500 font-medium truncate">
                            {story.authorPenName || story.authorName || "Storyteller"}
                          </p>
                          <div>
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getGenreBadgeClass(
                                story.mainGenre || "Folklore"
                              )}`}
                            >
                              {story.mainGenre || "Folklore"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Stats & Bookmark */}
                      <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
                        <div className="flex flex-col items-end space-y-1 text-right">
                          <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs sm:text-sm">
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                            <span>5.0</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-stone-500 font-medium">
                            <Eye className="w-3.5 h-3.5 text-stone-400" />
                            <span>{story.readsCount || 0}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(story.id);
                          }}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                            bookmarked
                              ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#B8860B]"
                              : "border-stone-200 bg-white text-stone-400 hover:text-stone-900 hover:border-stone-300 hover:bg-stone-50"
                          }`}
                          aria-label="Bookmark story"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${
                              bookmarked ? "fill-[#B8860B]" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: MAIN DISCOVERY FEED (GET /api/v1/stories) */}
        <section ref={discoveryFeedRef} className="space-y-5 pt-6 border-t border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-stone-950 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                All Folklore & Stories
              </h2>
              <p className="text-xs text-stone-500">
                {feedTotal} {feedTotal === 1 ? "manuscript" : "manuscripts"} available for reading
                {selectedTradition !== "all" && ` • Tradition: ${selectedTradition}`}
                {selectedGenre !== "all" && ` • Genre: ${selectedGenre}`}
              </p>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Page {feedPage} of {feedTotalPages}
            </div>
          </div>

          {/* Stories Grid */}
          {feedLoading ? (
            <div className="w-full py-16 flex flex-col items-center justify-center space-y-3 text-stone-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
              <p className="text-xs font-semibold">Loading manuscripts from archives...</p>
            </div>
          ) : feedStories.length === 0 ? (
            <div className="w-full py-16 text-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200">
              <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-sm font-bold text-stone-800">No stories match your criteria</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for a different keyword, clearing your filters, or browsing other traditions.
              </p>
              <Button
                type="button"
                onClick={handleResetFilters}
                className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold text-xs rounded-xl"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {feedStories.map((story) => {
                const bookmarked = isBookmarked(story.id);

                return (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug || story.id}`}
                    className="group block"
                  >
                    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full p-3 space-y-3 relative">
                      {/* Cover Image */}
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <SafeImage
                          src={story.coverImage || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(story.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                            bookmarked
                              ? "bg-[#D4AF37] text-stone-950 font-bold shadow-xs"
                              : "bg-stone-900/60 text-stone-200 hover:bg-stone-900/90"
                          }`}
                          aria-label="Bookmark"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              bookmarked ? "fill-stone-950 text-stone-950" : ""
                            }`}
                          />
                        </button>

                        {/* Audio Tag if available */}
                        {story.hasAudioNarration && (
                          <div className="absolute top-2 left-2 bg-emerald-600/90 text-white p-1 rounded-md shadow-xs">
                            <Volume2 className="w-3 h-3" />
                          </div>
                        )}

                        {/* Genre Tag */}
                        <div className="absolute bottom-2 left-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${getGenreBadgeClass(
                              story.mainGenre || "Folklore"
                            )}`}
                          >
                            {story.mainGenre || "Folklore"}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="space-y-1 flex-1">
                        <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1 font-serif">
                          {story.title}
                        </h3>
                        <p className="text-[11px] text-stone-500 font-medium truncate">
                          {story.authorPenName || story.authorName || "Storyteller"}
                        </p>
                        {story.tradition && (
                          <p className="text-[10px] text-amber-800 font-semibold truncate">
                            {story.tradition}
                          </p>
                        )}
                      </div>

                      {/* Stats footer */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-stone-400" />
                          {story.readsCount || 0}
                        </span>
                        <span className="flex items-center gap-1 text-stone-600">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {story.estimatedReadTime || 5}m
                        </span>
                        <span className="flex items-center gap-1 text-rose-600 font-semibold">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          {story.likesCount || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {feedPage < feedTotalPages && !feedLoading && (
            <div className="pt-6 text-center">
              <Button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                className="rounded-2xl px-6 py-5 border-stone-300 font-bold text-xs hover:bg-stone-50 shadow-xs"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading more manuscripts...
                  </>
                ) : (
                  <>Load More Manuscripts ({feedTotal - feedStories.length} remaining)</>
                )}
              </Button>
            </div>
          )}
        </section>
      </div>
    </AuthGuard>
  );
}
