"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
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
  Filter,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CategoryCarousel } from "@/components/features/discovery/category-carousel";

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

  if (error) {
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

// Genre Badge Styles for Highest Rated section in Light Mode
function getGenreBadgeClass(genre: string) {
  const g = genre.toUpperCase();
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
  { id: "more", label: "More", icon: "➕" },
];

// Trending Stories Data
const TRENDING_STORIES = [
  {
    id: "tr-1",
    rank: 1,
    title: "Silent Intentions",
    author: "Demi Lawson",
    genre: "THRILLER",
    genreBg: "bg-red-100 text-red-800 border-red-300",
    cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    reads: "38.2K",
    rating: "4.9",
  },
  {
    id: "tr-2",
    rank: 2,
    title: "Beneath the Baobab",
    author: "Kwame Nkrumah",
    genre: "DRAMA",
    genreBg: "bg-indigo-100 text-indigo-800 border-indigo-300",
    cover: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
    reads: "24.5K",
    rating: "4.8",
  },
  {
    id: "tr-3",
    rank: 3,
    title: "The Crown of Ashes",
    author: "Tobi Adebayo",
    genre: "FANTASY",
    genreBg: "bg-[#D4AF37]/20 text-amber-900 border-[#D4AF37]/40",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    reads: "22.1K",
    rating: "4.7",
  },
  {
    id: "tr-4",
    rank: 4,
    title: "Echoes of Tomorrow",
    author: "Kofi Mensah",
    genre: "SCI-FI",
    genreBg: "bg-purple-100 text-purple-800 border-purple-300",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    reads: "18.7K",
    rating: "4.6",
  },
  {
    id: "tr-5",
    rank: 5,
    title: "Beyond the Sunset",
    author: "Nia Okonkwo",
    genre: "ROMANCE",
    genreBg: "bg-rose-100 text-rose-800 border-rose-300",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    reads: "17.3K",
    rating: "4.5",
  },
  {
    id: "tr-6",
    rank: 6,
    title: "The Golden Stool of Ashanti",
    author: "Akwasi Mensah",
    genre: "HISTORICAL",
    genreBg: "bg-amber-100 text-amber-900 border-amber-300",
    cover: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
    reads: "16.1K",
    rating: "4.8",
  },
  {
    id: "tr-7",
    rank: 7,
    title: "Song of the Wind Singer",
    author: "Folake Adeyemi",
    genre: "MYSTERY",
    genreBg: "bg-teal-100 text-teal-800 border-teal-300",
    cover: "https://images.unsplash.com/photo-1511497584788-876761c119ef?q=80&w=600&auto=format&fit=crop",
    reads: "14.8K",
    rating: "4.7",
  },
  {
    id: "tr-8",
    rank: 8,
    title: "River of the Moons",
    author: "Tendai Moyo",
    genre: "ADVENTURE",
    genreBg: "bg-cyan-100 text-cyan-800 border-cyan-300",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    reads: "13.4K",
    rating: "4.6",
  },
];

// Highest Rated Stories Data
const HIGHEST_RATED_STORIES = [
  {
    id: "hr-1",
    title: "Beyond the Sunset",
    author: "Nia Okonkwo",
    genre: "ROMANCE",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop",
    rating: "4.9",
    reads: "25.4K",
  },
  {
    id: "hr-2",
    title: "Pieces of Us",
    author: "Zanele Dlamini",
    genre: "DRAMA",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: "4.8",
    reads: "12.4K",
  },
  {
    id: "hr-3",
    title: "Whispers in the Dark",
    author: "Lebo Mokoena",
    genre: "PARANORMAL",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
    rating: "4.8",
    reads: "11.7K",
  },
  {
    id: "hr-4",
    title: "The Dragon Heir",
    author: "E. Azuka",
    genre: "FANTASY",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    rating: "4.7",
    reads: "9.1K",
  },
  {
    id: "hr-5",
    title: "The Shadow King's Vow",
    author: "Amara Diallo",
    genre: "FANTASY",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop",
    rating: "4.9",
    reads: "34.2K",
  },
  {
    id: "hr-6",
    title: "Queen Amina: Warrior of Zaria",
    author: "Khadija Bello",
    genre: "HISTORICAL",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop",
    rating: "4.9",
    reads: "28.6K",
  },
  {
    id: "hr-7",
    title: "Mami Wata: Water Spirit",
    author: "Folake Adeyemi",
    genre: "MYTHOLOGY",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
    rating: "4.8",
    reads: "19.3K",
  },
  {
    id: "hr-8",
    title: "Sundiata: Lion King of Mali",
    author: "Mariama Ba",
    genre: "EPIC",
    cover: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400&auto=format&fit=crop",
    rating: "4.9",
    reads: "42.1K",
  },
];

// Top Authors Data
const TOP_AUTHORS = [
  {
    id: "author-1",
    rank: 1,
    name: "Nia Okonkwo",
    reads: "25.4K Reads",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-2",
    rank: 2,
    name: "Tobi Adebayo",
    reads: "22.1K Reads",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-3",
    rank: 3,
    name: "Lebo Mokoena",
    reads: "18.7K Reads",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-4",
    rank: 4,
    name: "Demi Lawson",
    reads: "16.2K Reads",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-5",
    rank: 5,
    name: "Zanele Dlamini",
    reads: "14.3K Reads",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-6",
    rank: 6,
    name: "Akwasi Mensah",
    reads: "13.8K Reads",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-7",
    rank: 7,
    name: "Khadija Bello",
    reads: "12.5K Reads",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "author-8",
    rank: 8,
    name: "Amara Diallo",
    reads: "11.9K Reads",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop",
  },
];

export default function ExplorePage() {
  const { filters, setFilters } = useStory();
  const { isBookmarked, toggleBookmark } = useLibrary();
  const [selectedPill, setSelectedPill] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const trendingScrollRef = useRef<HTMLDivElement>(null);
  const topAuthorsScrollRef = useRef<HTMLDivElement>(null);

  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
    amount = 300
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -amount : amount;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 text-stone-900 font-sans">
      {/* 1. PAGE TITLE */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-stone-950 tracking-tight">
          Explore Stories
        </h1>
      </div>

      {/* 2. SEARCH BAR & FILTERS TOGGLE */}
      <div className="space-y-4">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="text"
              placeholder="Search stories, authors, genres..."
              value={filters.searchQuery || ""}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-11 pr-10 py-6 bg-white border-stone-200 rounded-2xl shadow-xs text-sm text-stone-900 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs bg-stone-100 px-2 py-0.5 rounded-md font-medium"
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
            const isSelected = selectedPill === pill.id;

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  setSelectedPill(pill.id);
                  setFilters((prev) => ({
                    ...prev,
                    genre: pill.id === "all" ? undefined : pill.label,
                  }));
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

        {/* 4. SORT BY & ADVANCED FILTERS BAR */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Sort by</span>
            <Select
              value={filters.sortBy || "trending"}
              onChange={(val) => setFilters((prev) => ({ ...prev, sortBy: val as any }))}
              options={[
                { value: "trending", label: "Trending ∨" },
                { value: "newest", label: "Newest ∨" },
                { value: "most_read", label: "Most Read ∨" },
                { value: "most_liked", label: "Most Liked ∨" },
              ]}
              className="w-36 bg-white border-stone-200 text-xs font-bold shadow-xs py-1.5 rounded-xl text-stone-900"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="border-stone-200 text-stone-800 hover:bg-stone-50 rounded-xl px-3.5 py-1.5 h-9 text-xs font-bold gap-1.5 bg-white shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* EXPLORE FOLKLORE CATEGORIES & TRADITIONS */}
      <CategoryCarousel />

      {/* SECTION 1: TRENDING STORIES */}
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
            <Link
              href="/explore?sort=trending"
              className="text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors pl-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Carousel of Portrait Cards */}
        <div
          ref={trendingScrollRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {TRENDING_STORIES.map((story) => {
            const bookmarked = isBookmarked(story.id);

            return (
              <Link key={story.id} href={`/story/${story.id}`} className="group block shrink-0 snap-start w-[180px] sm:w-[210px]">
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3 space-y-2.5 relative">
                  {/* Portrait Cover Image */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <SafeImage
                      src={story.cover}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Rank Badge #1..8 */}
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#D4AF37] text-stone-950 text-xs font-black flex items-center justify-center shadow-md">
                      {story.rank}
                    </div>

                    {/* Bookmark Icon Top Right */}
                    <button
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
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-stone-950 text-stone-950" : ""}`} />
                    </button>

                    {/* Floating Genre Tag */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${story.genreBg}`}>
                        {story.genre}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1 font-serif">
                      {story.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium truncate">{story.author}</p>
                  </div>

                  {/* Bottom Stats Line */}
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-1 border-t border-stone-100">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-stone-400" />
                      {story.reads}
                    </span>
                    <span className="flex items-center gap-1 text-[#B8860B] font-extrabold">
                      <Star className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
                      {story.rating}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: TOP AUTHORS THIS WEEK */}
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
            <Link
              href="/explore?sort=authors"
              className="text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors pl-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Row of Circular Profile Cards */}
        <div
          ref={topAuthorsScrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {TOP_AUTHORS.map((author) => (
            <Link key={author.id} href={`/profile/${author.name.toLowerCase().replace(/\s+/g, '_')}`} className="group block text-center shrink-0 snap-start w-[105px] sm:w-[125px]">
              <div className="flex flex-col items-center space-y-2 p-1">
                {/* Circular Avatar Container with Gold Ring & Number Badge */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] p-1 bg-white shadow-sm overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                    <SafeImage
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  {/* Rank Badge #1..8 */}
                  <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D4AF37] text-stone-950 text-xs font-black flex items-center justify-center shadow-md">
                    {author.rank}
                  </div>
                </div>

                <div className="space-y-0.5 w-full">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate w-full font-serif">
                    {author.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate">{author.reads}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: HIGHEST RATED THIS WEEK */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
            <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-950 tracking-tight">
              Highest Rated This Week
            </h2>
          </div>
          <Link
            href="/explore?sort=highest_rated"
            className="text-xs sm:text-sm font-bold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Vertical List of Highest Rated Stories */}
        <div className="flex flex-col space-y-2.5 sm:space-y-3">
          {HIGHEST_RATED_STORIES.map((story) => {
            const bookmarked = isBookmarked(story.id);

            return (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="group block"
              >
                <div className="bg-white border border-stone-200/85 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 hover:border-[#D4AF37]/60 hover:shadow-xs transition-all duration-200">
                  {/* Left Side: Thumbnail + Info */}
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                    {/* Cover Image */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
                      <SafeImage
                        src={story.cover}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Details: Title, Author, Genre Badge */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate font-serif">
                        {story.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium truncate">
                        {story.author}
                      </p>
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getGenreBadgeClass(
                            story.genre
                          )}`}
                        >
                          {story.genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Stats (Star Rating + Reads) & Bookmark Button */}
                  <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
                    {/* Rating & Reads Stack */}
                    <div className="flex flex-col items-end space-y-1 text-right">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs sm:text-sm">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>{story.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-stone-500 font-medium">
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                        <span>{story.reads}</span>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleBookmark(story.id);
                      }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all ${
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
      </section>
    </div>
  );
}
