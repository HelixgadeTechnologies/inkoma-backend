"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Edit3,
  BookOpen,
  Users,
  Globe,
  Heart,
  Eye,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="w-full h-full min-h-[100px] bg-stone-100 flex flex-col items-center justify-center p-2 text-center space-y-1">
        <BookOpen className="w-6 h-6 text-[#C89138]" />
        <span className="text-[10px] font-bold text-stone-700 line-clamp-1">{alt}</span>
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

// ---------------------------------------------------------------------------
// DATA STRUCTURES (EXPANDED SO EVERY SECTION ALWAYS SCROLLS SIDEWAYS)
// ---------------------------------------------------------------------------

const FEATURED_STORIES = [
  {
    id: "featured-1",
    slug: "beyond-the-sunset",
    title: "Beyond the Sunset",
    genre: "ROMANCE",
    badgeColor: "bg-[#6B3254] text-white",
    author: "Nia Okonkwo",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    blurb: "Two hearts. One impossible choice. A love that defies time and fate.",
    views: "25.4K",
    likes: "2.1K",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "featured-2",
    slug: "the-shadow-kings-vow",
    title: "The Shadow King's Vow",
    genre: "FANTASY",
    badgeColor: "bg-[#1A5C52] text-white",
    author: "Amara Diallo",
    authorAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop",
    blurb: "An ancient covenant renewed beneath the eclipse of a fallen sun.",
    views: "34.2K",
    likes: "1.4K",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "featured-3",
    slug: "the-golden-stool",
    title: "The Golden Stool of Ashanti",
    genre: "HISTORICAL",
    badgeColor: "bg-[#8C5D33] text-white",
    author: "Akwasi Mensah",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    blurb: "The sacred ancestral relic of a glorious kingdom tested by war and destiny.",
    views: "38.2K",
    likes: "2.3K",
    cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "featured-4",
    slug: "song-of-the-baobab",
    title: "Song of the Baobab",
    genre: "FOLKLORE",
    badgeColor: "bg-[#B45309] text-white",
    author: "Kofi Mensah",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    blurb: "Whispers of the old kingdom carry secrets across generations.",
    views: "19.8K",
    likes: "1.8K",
    cover: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
  },
];

const RECOMMENDED_STORIES = [
  {
    id: "rec-1",
    slug: "pieces-of-us",
    title: "Pieces of Us",
    author: "Zanele Dlamini",
    genre: "DRAMA",
    badgeColor: "bg-[#6B3254]/90 text-white",
    views: "12.4K",
    likes: "980",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-2",
    slug: "whispers-in-the-dark",
    title: "Whispers in the Dark",
    author: "Lebo Mokoena",
    genre: "PARANORMAL",
    badgeColor: "bg-[#1A5C52]/90 text-white",
    views: "11.7K",
    likes: "860",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-3",
    slug: "the-heirs-promise",
    title: "The Heir's Promise",
    author: "Chinedu Eze",
    genre: "HISTORICAL",
    badgeColor: "bg-[#8C5D33]/90 text-white",
    views: "16.8K",
    likes: "1.1K",
    cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-4",
    slug: "lost-beyond-the-horizon",
    title: "Lost Beyond the Horizon",
    author: "Kwame Nkrumah",
    genre: "ADVENTURE",
    badgeColor: "bg-[#A35922]/90 text-white",
    views: "14.2K",
    likes: "1.0K",
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-5",
    slug: "the-hollow-threshold",
    title: "The Hollow Threshold",
    author: "Kneoa Ndlovu",
    genre: "HORROR",
    badgeColor: "bg-[#7D2121]/90 text-white",
    views: "16.1K",
    likes: "920",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-6",
    slug: "echoes-of-the-savannah",
    title: "Echoes of the Savannah",
    author: "Folake Adeyemi",
    genre: "DRAMA",
    badgeColor: "bg-[#B54A62]/90 text-white",
    views: "13.9K",
    likes: "940",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-7",
    slug: "daughters-of-the-rain-queen",
    title: "Daughters of the Rain Queen",
    author: "Modupe Adeleke",
    genre: "FANTASY",
    badgeColor: "bg-[#1E6852]/90 text-white",
    views: "15.2K",
    likes: "1.2K",
    cover: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rec-8",
    slug: "tales-of-kalahari-sands",
    title: "Tales of Kalahari Sands",
    author: "Kagiso Molefe",
    genre: "ADVENTURE",
    badgeColor: "bg-[#A35922]/90 text-white",
    views: "16.7K",
    likes: "1.3K",
    cover: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
  },
];

const NEW_RELEASES = [
  {
    id: "new-1",
    slug: "falling-for-you",
    title: "Falling for You",
    author: "Sarah J.",
    genre: "ROMANCE",
    badgeColor: "bg-[#B54A62]/90 text-white",
    views: "8.2K",
    likes: "620",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-2",
    slug: "the-dragon-heir",
    title: "The Dragon Heir",
    author: "E. Azuka",
    genre: "FANTASY",
    badgeColor: "bg-[#1E6852]/90 text-white",
    views: "9.1K",
    likes: "710",
    cover: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-3",
    slug: "code-name-phoenix",
    title: "Code Name: Phoenix",
    author: "J. Okafor",
    genre: "THRILLER",
    badgeColor: "bg-[#9A2222]/90 text-white",
    views: "7.3K",
    likes: "540",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-4",
    slug: "the-last-signal",
    title: "The Last Signal",
    author: "T. Mensah",
    genre: "SCI-FI",
    badgeColor: "bg-[#3B5B7E]/90 text-white",
    views: "6.9K",
    likes: "430",
    cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-5",
    slug: "a-brighter-tomorrow",
    title: "A Brighter Tomorrow",
    author: "L. Adebayo",
    genre: "DRAMA",
    badgeColor: "bg-[#6B4B7E]/90 text-white",
    views: "8.4K",
    likes: "600",
    cover: "https://images.unsplash.com/photo-1511497584788-876761c119ef?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-6",
    slug: "mami-wata-currents",
    title: "Mami Wata: Currents",
    author: "Nia Okonkwo",
    genre: "MYTHOLOGY",
    badgeColor: "bg-[#0E7490]/90 text-white",
    views: "10.1K",
    likes: "820",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-7",
    slug: "queen-moremi-oath",
    title: "Queen Moremi's Oath",
    author: "Folake Adeyemi",
    genre: "LEGEND",
    badgeColor: "bg-[#6B3254]/90 text-white",
    views: "11.4K",
    likes: "890",
    cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "new-8",
    slug: "dogon-star-dancers",
    title: "Dogon: Star Dancers",
    author: "Oumar Sangare",
    genre: "COSMOLOGY",
    badgeColor: "bg-[#1D4ED8]/90 text-white",
    views: "9.5K",
    likes: "740",
    cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop",
  },
];

const RECENTLY_UPDATED = [
  {
    id: "recent-1",
    slug: "shattered-ties",
    title: "Shattered Ties",
    author: "Amara Bello",
    genre: "DRAMA",
    badgeColor: "bg-[#F3E8FF] text-[#7E22CE]",
    cardTheme: "light",
    views: "11.2K",
    likes: "640",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-2",
    slug: "the-silent-room",
    title: "The Silent Room",
    author: "Ifeanyi Nwachukwu",
    genre: "MYSTERY",
    badgeColor: "bg-[#DBEAFE] text-[#1D4ED8]",
    cardTheme: "light",
    views: "10.3K",
    likes: "580",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-3",
    slug: "a-second-chance",
    title: "A Second Chance",
    author: "Tolu Adebayo",
    genre: "ROMANCE",
    badgeColor: "bg-[#FFE4E6] text-[#BE123C]",
    cardTheme: "light",
    views: "9.8K",
    likes: "520",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-4",
    slug: "blood-and-crown",
    title: "Blood & Crown",
    author: "Zoe Adeyemi",
    genre: "FANTASY",
    badgeColor: "bg-[#D1FAE5] text-[#047857]",
    cardTheme: "dark",
    views: "8.1K",
    likes: "410",
    cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-5",
    slug: "echoes-in-darkness",
    title: "Echoes in Darkness",
    author: "D. Ojo",
    genre: "HORROR",
    badgeColor: "bg-[#7F1D1D] text-[#FEE2E2]",
    cardTheme: "dark",
    views: "9.6K",
    likes: "690",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-6",
    slug: "the-shadow-throne",
    title: "The Shadow Throne",
    author: "K. Mensah",
    genre: "FANTASY",
    badgeColor: "bg-[#D1FAE5] text-[#047857]",
    cardTheme: "dark",
    views: "10.4K",
    likes: "720",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-7",
    slug: "veils-of-lagos",
    title: "Veils of Lagos",
    author: "S. Adeleke",
    genre: "DRAMA",
    badgeColor: "bg-[#F3E8FF] text-[#7E22CE]",
    cardTheme: "light",
    views: "8.7K",
    likes: "590",
    cover: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "recent-8",
    slug: "the-python-covenant",
    title: "The Python Covenant",
    author: "B. Lawal",
    genre: "MYSTERY",
    badgeColor: "bg-[#DBEAFE] text-[#1D4ED8]",
    cardTheme: "light",
    views: "11.0K",
    likes: "790",
    cover: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=400&auto=format&fit=crop",
  },
];

const TOP_AUTHORS = [
  {
    id: "author-1",
    name: "Nia Okonkwo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    followers: "2.4K Followers",
    stories: "12 Stories",
  },
  {
    id: "author-2",
    name: "Chinedu Eze",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    followers: "1.8K Followers",
    stories: "9 Stories",
  },
  {
    id: "author-3",
    name: "Amara Diallo",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop",
    followers: "3.1K Followers",
    stories: "15 Stories",
  },
  {
    id: "author-4",
    name: "Kwame Nkrumah",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    followers: "2.9K Followers",
    stories: "11 Stories",
  },
  {
    id: "author-5",
    name: "Zoe Adeyemi",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    followers: "4.2K Followers",
    stories: "18 Stories",
  },
];

export default function HomePage() {
  const [bookmarked, setBookmarked] = React.useState<Record<string, boolean>>({});
  const [followedAuthors, setFollowedAuthors] = React.useState<Record<string, boolean>>({
    "author-1": false,
    "author-2": false,
    "author-3": false,
    "author-4": false,
    "author-5": false,
  });

  // Section Refs for smooth sideways scrolling on click
  const featuredRef = React.useRef<HTMLDivElement>(null);
  const recommendedRef = React.useRef<HTMLDivElement>(null);
  const newReleasesRef = React.useRef<HTMLDivElement>(null);
  const recentlyUpdatedRef = React.useRef<HTMLDivElement>(null);
  const topAuthorsRef = React.useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const offset = direction === "left" ? -340 : 340;
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowedAuthors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-9 sm:space-y-11 pb-16 text-stone-900 font-sans max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-[#FFFDF9] border border-[#EBE4D5] p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text, CTAs & Dots */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black font-serif tracking-tight text-stone-950 leading-[1.12]">
              WHERE STORIES <br />
              COME <span className="text-[#C89138]">ALIVE &amp;</span> <br />
              <span className="text-[#C89138]">IMAGINATION THRIVES</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              Your global home for original stories across every genre. <br />
              Read. Write. Connect. Belong.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/explore">
                <Button className="bg-[#E5A93C] hover:bg-[#d6982b] text-stone-950 font-bold px-6 py-5 rounded-2xl text-sm shadow-xs gap-2 transition-all hover:scale-[1.02]">
                  <Compass className="w-4 h-4 stroke-[2.2]" />
                  <span>Explore Stories</span>
                </Button>
              </Link>
              <Link href="/studio/new">
                <Button
                  variant="outline"
                  className="border-stone-300 text-stone-900 hover:bg-stone-50 font-bold px-6 py-5 rounded-2xl text-sm bg-white gap-2 transition-all hover:scale-[1.02]"
                >
                  <Edit3 className="w-4 h-4 text-stone-700" />
                  <span>Start Writing</span>
                </Button>
              </Link>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 pt-3">
              <span className="w-4 h-2 rounded-full bg-[#E5A93C]" />
              <span className="w-2 h-2 rounded-full bg-stone-300" />
              <span className="w-2 h-2 rounded-full bg-stone-300" />
            </div>
          </div>

          {/* Right Column: Hero Open Book Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#E8DFCE]">
              <SafeImage
                src="/images/home-hero-book.jpg"
                alt="Open book in warm sunlight"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS BAR */}
      {/* ========================================================================= */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          <div className="flex items-center justify-center gap-3.5 p-2">
            <BookOpen className="w-7 h-7 text-[#C89138] stroke-[1.6]" />
            <div>
              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-none">10K+</p>
              <p className="text-xs text-stone-500 font-medium mt-1">Stories</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 p-2 pt-4 md:pt-2">
            <Users className="w-7 h-7 text-[#C89138] stroke-[1.6]" />
            <div>
              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-none">5K+</p>
              <p className="text-xs text-stone-500 font-medium mt-1">Writers</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 p-2 pt-4 md:pt-2">
            <Globe className="w-7 h-7 text-[#C89138] stroke-[1.6]" />
            <div>
              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-none">150+</p>
              <p className="text-xs text-stone-500 font-medium mt-1">Countries</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 p-2 pt-4 md:pt-2">
            <Heart className="w-7 h-7 text-[#C89138] stroke-[1.6]" />
            <div>
              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-none">50K+</p>
              <p className="text-xs text-stone-500 font-medium mt-1">Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED STORIES (Always sideways scrollable) */}
      {/* ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900">
            Featured Stories
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(featuredRef, "left")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(featuredRef, "right")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link
              href="/explore?sort=featured"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal sideways scroll track */}
        <div
          ref={featuredRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {FEATURED_STORIES.map((story) => {
            const isBookmarked = bookmarked[story.id];
            return (
              <Link
                key={story.id}
                href={`/story/${story.slug}`}
                className="group block shrink-0 snap-start w-[88vw] sm:w-[580px] md:w-[620px] rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs hover:border-[#D4AF37]/60 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Left: Cover Image */}
                  <div className="relative w-full sm:w-[50%] h-48 sm:h-auto min-h-[190px] overflow-hidden">
                    <SafeImage
                      src={story.cover}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${story.badgeColor}`}
                      >
                        {story.genre}
                      </span>
                    </div>
                  </div>

                  {/* Right: Story Details */}
                  <div className="w-full sm:w-[50%] p-4 sm:p-5 flex flex-col justify-between space-y-3 bg-white">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                        {story.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-stone-200">
                          <SafeImage
                            src={story.authorAvatar}
                            alt={story.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-stone-700 truncate">{story.author}</span>
                      </div>

                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                        {story.blurb}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          {story.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-stone-400" />
                          {story.likes}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(story.id, e)}
                        className="p-1.5 text-stone-400 hover:text-[#C89138] transition-colors"
                        aria-label="Bookmark story"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? "fill-[#C89138] text-[#C89138]" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECOMMENDED FOR YOU (Always sideways scrollable) */}
      {/* ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900">
            Recommended For You
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(recommendedRef, "left")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(recommendedRef, "right")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link
              href="/explore?sort=recommended"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sideways scroll row */}
        <div
          ref={recommendedRef}
          className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {RECOMMENDED_STORIES.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="group relative w-[150px] sm:w-[175px] md:w-[195px] aspect-[3/4.4] shrink-0 snap-start rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-all"
            >
              <SafeImage
                src={story.cover}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Left Genre Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-xs ${story.badgeColor}`}
                >
                  {story.genre}
                </span>
              </div>

              {/* Bottom Dark Gradient & Story Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-0" />

              <div className="absolute inset-x-0 bottom-0 p-3 z-10 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-[#E5C158] transition-colors">
                  {story.title}
                </h3>
                <p className="text-[11px] text-stone-300 truncate">
                  {story.author}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[10px] text-stone-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {story.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {story.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW RELEASES (Always sideways scrollable) */}
      {/* ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900">
            New Releases
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(newReleasesRef, "left")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(newReleasesRef, "right")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link
              href="/explore?sort=newest"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sideways scroll row */}
        <div
          ref={newReleasesRef}
          className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {NEW_RELEASES.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="group relative w-[150px] sm:w-[175px] md:w-[195px] aspect-[3/4.4] shrink-0 snap-start rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-all"
            >
              <SafeImage
                src={story.cover}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Left Genre Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-xs ${story.badgeColor}`}
                >
                  {story.genre}
                </span>
              </div>

              {/* Bottom Dark Gradient & Story Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-0" />

              <div className="absolute inset-x-0 bottom-0 p-3 z-10 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-[#E5C158] transition-colors">
                  {story.title}
                </h3>
                <p className="text-[11px] text-stone-300 truncate">
                  {story.author}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[10px] text-stone-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {story.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {story.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RECENTLY UPDATED (Always sideways scrollable) */}
      {/* ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900">
            Recently Updated
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(recentlyUpdatedRef, "left")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(recentlyUpdatedRef, "right")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link
              href="/explore?sort=recently_updated"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sideways scroll row */}
        <div
          ref={recentlyUpdatedRef}
          className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {RECENTLY_UPDATED.map((story) => {
            const isDark = story.cardTheme === "dark";
            return (
              <Link
                key={story.id}
                href={`/story/${story.slug}`}
                className={`group w-[230px] sm:w-[260px] md:w-[275px] shrink-0 snap-start rounded-2xl overflow-hidden border transition-all flex items-stretch h-[116px] shadow-2xs hover:shadow-md ${
                  isDark
                    ? "bg-[#141318] border-stone-800 hover:border-[#D4AF37]"
                    : "bg-white border-stone-200 hover:border-[#D4AF37]"
                }`}
              >
                {/* Left: Cover Art */}
                <div className="relative w-[44%] h-full shrink-0 overflow-hidden">
                  <SafeImage
                    src={story.cover}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Right: Info Box */}
                <div className="w-[56%] p-2.5 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider ${story.badgeColor}`}
                    >
                      {story.genre}
                    </span>

                    <h4
                      className={`text-xs font-bold truncate leading-tight transition-colors ${
                        isDark ? "text-white group-hover:text-[#E5C158]" : "text-stone-900 group-hover:text-[#B8860B]"
                      }`}
                    >
                      {story.title}
                    </h4>

                    <p
                      className={`text-[10px] truncate ${
                        isDark ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      {story.author}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2.5 text-[9.5px] font-medium pt-1 ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-2.5 h-2.5" />
                      {story.views}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Heart className="w-2.5 h-2.5" />
                      {story.likes}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TOP AUTHORS (Always sideways scrollable) */}
      {/* ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900">
            Top Authors
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(topAuthorsRef, "left")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(topAuthorsRef, "right")}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <Link
              href="/explore?tab=authors"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sideways scroll track for author cards */}
        <div
          ref={topAuthorsRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {TOP_AUTHORS.map((author) => {
            const isFollowing = followedAuthors[author.id];
            return (
              <div
                key={author.id}
                className="w-[270px] sm:w-[310px] shrink-0 snap-start bg-white border border-stone-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xs hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-stone-200">
                    <SafeImage
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold font-serif text-stone-900 truncate">
                      {author.name}
                    </h3>
                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {author.followers} <span className="text-stone-300 mx-1">|</span> {author.stories}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={(e) => toggleFollow(author.id, e)}
                  className={`text-xs font-bold px-5 py-2 rounded-xl transition-all shrink-0 ${
                    isFollowing
                      ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      : "bg-[#E5A93C] hover:bg-[#d6982b] text-stone-950 shadow-xs"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
