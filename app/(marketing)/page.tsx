"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
import { getHomeFeed } from "@/src/services/homeFeedService";

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

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/explore");
    }
  }, [isAuthenticated, loading, router]);

  const [bookmarked, setBookmarked] = React.useState<Record<string, boolean>>({});
  const [followedAuthors, setFollowedAuthors] = React.useState<Record<string, boolean>>({});
  const [featuredStories, setFeaturedStories] = React.useState<any[]>([]);
  const [recommendedStories, setRecommendedStories] = React.useState<any[]>([]);
  const [newReleases, setNewReleases] = React.useState<any[]>([]);
  const [recentlyUpdated, setRecentlyUpdated] = React.useState<any[]>([]);
  const [topAuthors, setTopAuthors] = React.useState<any[]>([]);
  const [feedLoading, setFeedLoading] = React.useState(true);

  React.useEffect(() => {
    let isCancelled = false;
    async function loadFeed() {
      try {
        const feed = await getHomeFeed();
        if (!isCancelled) {
          setFeaturedStories(
            (feed.featured || []).map((s) => ({
              id: s.id,
              slug: s.slug || s.id,
              title: s.title,
              genre: (s.mainGenre || "FOLKLORE").toUpperCase(),
              badgeColor: "bg-[#6B3254] text-white",
              author: s.authorPenName || s.authorName || "Storyteller",
              authorAvatar:
                s.authorAvatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
              blurb: s.synopsis || "An ancestral journey through folklore.",
              views: `${s.readsCount || 0}`,
              likes: `${s.likesCount || 0}`,
              cover:
                s.coverImage ||
                "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
            }))
          );
          setRecommendedStories(
            (feed.recommended || []).map((s) => ({
              id: s.id,
              slug: s.slug || s.id,
              title: s.title,
              author: s.authorPenName || s.authorName || "Storyteller",
              genre: (s.mainGenre || "DRAMA").toUpperCase(),
              badgeColor: "bg-[#1A5C52]/90 text-white",
              views: `${s.readsCount || 0}`,
              likes: `${s.likesCount || 0}`,
              cover:
                s.coverImage ||
                "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
            }))
          );
          setNewReleases(
            (feed.newReleases || []).map((s) => ({
              id: s.id,
              slug: s.slug || s.id,
              title: s.title,
              author: s.authorPenName || s.authorName || "Storyteller",
              genre: (s.mainGenre || "ROMANCE").toUpperCase(),
              badgeColor: "bg-[#B54A62]/90 text-white",
              views: `${s.readsCount || 0}`,
              likes: `${s.likesCount || 0}`,
              cover:
                s.coverImage ||
                "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
            }))
          );
          setRecentlyUpdated(
            (feed.recentlyUpdated || []).map((s) => ({
              id: s.id,
              slug: s.slug || s.id,
              title: s.title,
              author: s.authorPenName || s.authorName || "Storyteller",
              genre: (s.mainGenre || "FANTASY").toUpperCase(),
              badgeColor: "bg-[#D1FAE5] text-[#047857]",
              cardTheme: "dark",
              views: `${s.readsCount || 0}`,
              likes: `${s.likesCount || 0}`,
              cover:
                s.coverImage ||
                "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400&auto=format&fit=crop",
            }))
          );
          setTopAuthors(
            (feed.topAuthors || []).map((a) => ({
              id: a.id,
              username: a.username,
              name: a.name,
              avatar:
                a.avatarUrl ||
                a.avatar ||
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
              followers: `${a.followersCount || 0} Followers`,
              stories: `${a.storiesCount || 0} Stories`,
            }))
          );
        }
      } catch (err) {
        console.warn("[HomePage] Failed to fetch home feed:", err);
      } finally {
        if (!isCancelled) setFeedLoading(false);
      }
    }

    loadFeed();

    return () => {
      isCancelled = true;
    };
  }, []);

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

  if (isAuthenticated && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 py-20">
        <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-stone-600">Redirecting to Explore...</p>
      </div>
    );
  }

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
                      {feedLoading ? (
                        <div className="flex items-stretch gap-4 overflow-hidden py-1">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-[88vw] sm:w-[580px] md:w-[620px] h-48 bg-stone-100 rounded-2xl animate-pulse border border-stone-200 shrink-0"
                            />
                          ))}
                        </div>
                      ) : featuredStories.length === 0 ? (
                        <div className="w-full py-10 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200 space-y-2">
                          <p className="font-semibold text-stone-700">No featured stories yet.</p>
                          <p>Discover newly published tales or be the first to publish a manuscript.</p>
                          <Link href="/explore">
                            <Button size="sm" variant="outline" className="mt-2 text-xs font-bold border-stone-300">
                              Explore Manuscripts
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div
                          ref={featuredRef}
                          className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                        >
                          {featuredStories.map((story) => {
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
                                                  className={`w-4 h-4 ${isBookmarked ? "fill-[#C89138] text-[#C89138]" : ""
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
                      )}
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
                              {feedLoading ? (
                                <div className="flex items-stretch gap-3 overflow-hidden py-1">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div
                                      key={i}
                                      className="w-[150px] sm:w-[175px] md:w-[195px] aspect-[3/4.4] bg-stone-100 rounded-2xl animate-pulse border border-stone-200 shrink-0"
                                    />
                                  ))}
                                </div>
                              ) : recommendedStories.length === 0 ? (
                                <div className="w-full py-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
                                  No recommendations available yet. Browse the folklore catalogue in Explore!
                                </div>
                              ) : (
                                <div
                                  ref={recommendedRef}
                                  className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                                >
                                  {recommendedStories.map((story) => (
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
        )}
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
                              {feedLoading ? (
                                <div className="flex items-stretch gap-3 overflow-hidden py-1">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div
                                      key={i}
                                      className="w-[150px] sm:w-[175px] md:w-[195px] aspect-[3/4.4] bg-stone-100 rounded-2xl animate-pulse border border-stone-200 shrink-0"
                                    />
                                  ))}
                                </div>
                              ) : newReleases.length === 0 ? (
                                <div className="w-full py-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
                                  No new releases yet. New chapters and lore drops will appear here.
                                </div>
                              ) : (
                                <div
                                  ref={newReleasesRef}
                                  className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                                >
                                  {newReleases.map((story) => (
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
        )}
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
        {feedLoading ? (
                                <div className="flex items-stretch gap-3 overflow-hidden py-1">
                                  {[1, 2, 3].map((i) => (
                                    <div
                                      key={i}
                                      className="w-[230px] sm:w-[260px] md:w-[275px] h-[116px] bg-stone-100 rounded-2xl animate-pulse border border-stone-200 shrink-0"
                                    />
                                  ))}
                                </div>
                              ) : recentlyUpdated.length === 0 ? (
                                <div className="w-full py-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
                                  No recently updated stories yet.
                                </div>
                              ) : (
                                <div
                                  ref={recentlyUpdatedRef}
                                  className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                                >
                                  {recentlyUpdated.map((story) => {
                                    const isDark = story.cardTheme === "dark";
                                    return (
                                      <Link
                                        key={story.id}
                                        href={`/story/${story.slug}`}
                                        className={`group w-[230px] sm:w-[260px] md:w-[275px] shrink-0 snap-start rounded-2xl overflow-hidden border transition-all flex items-stretch h-[116px] shadow-2xs hover:shadow-md ${isDark
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

                                                    < h4
                        className={`text-xs font-bold truncate leading-tight transition-colors ${isDark ? "text-white group-hover:text-[#E5C158]" : "text-stone-900 group-hover:text-[#B8860B]"
                                                    }`}
                      >
                                                {story.title}
                                              </h4>

                                                  < p
                        className={`text-[10px] truncate ${isDark ? "text-stone-400" : "text-stone-500"
                                                  }`}
                      >
                                            {story.author}
                                          </p>
                                        </div>

                                            < div
                      className={`flex items-center gap-2.5 text-[9.5px] font-medium pt-1 ${isDark ? "text-stone-400" : "text-stone-500"
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
        )}
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
              {
                feedLoading?(
          <div className = "flex items-stretch gap-3 overflow-hidden py-1" >
                  {
                    [1, 2, 3].map((i) => (
                      <div
                          key={i}
                          className="w-[270px] sm:w-[310px] h-20 bg-stone-100 rounded-2xl animate-pulse border border-stone-200 shrink-0"
              />
            ))}
                        </div>
                        ) : topAuthors.length === 0 ? (
                        <div className="w-full py-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
                          Author leaderboards are updating. Explore storytellers to follow!
                        </div>
                        ) : (
                        <div
                          ref={topAuthorsRef}
                          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                        >
                          {topAuthors.map((author) => {
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

                                    < Button
                    type="button"
                                  onClick={(e) => toggleFollow(author.id, e)}
                                  className={`text-xs font-bold px-5 py-2 rounded-xl transition-all shrink-0 ${isFollowing
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
  )
}
      </section >
    </div >
  );
}
