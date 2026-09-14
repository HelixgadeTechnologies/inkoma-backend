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
  Sparkles,
  Star,
  Flame,
  Award,
  TrendingUp,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  Share2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className="w-full h-full min-h-[120px] bg-stone-100 border border-[#D4AF37]/30 flex flex-col items-center justify-center p-3 text-center space-y-2">
        <BookOpen className="w-8 h-8 text-[#B8860B]" />
        <span className="text-xs font-bold text-stone-800 line-clamp-1">{alt}</span>
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

// Social Media Icons
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.54-1.35 2.55-.07 1.25.68 2.48 1.79 2.99 1.09.52 2.45.36 3.39-.41.77-.61 1.22-1.57 1.24-2.55.03-4.66.01-9.33.02-13.99z" />
    </svg>
  );
}

export default function HomePage() {
  const [bookmarked, setBookmarked] = React.useState<Record<string, boolean>>({});
  const [followedAuthors, setFollowedAuthors] = React.useState<Record<string, boolean>>({
    "author-1": false,
    "author-2": false,
    "author-3": false,
  });

  const spotlightScrollRef = React.useRef<HTMLDivElement>(null);
  const featuredScrollRef = React.useRef<HTMLDivElement>(null);
  const recommendedScrollRef = React.useRef<HTMLDivElement>(null);
  const newReleasesScrollRef = React.useRef<HTMLDivElement>(null);
  const recentlyUpdatedScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollSpotlight = (direction: "left" | "right") => {
    if (spotlightScrollRef.current) {
      const amount = direction === "left" ? -600 : 600;
      spotlightScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const amount = direction === "left" ? -340 : 340;
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
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
    <div className="space-y-12 pb-16 text-stone-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#D4AF37]/30 p-6 sm:p-10 lg:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-stone-950 leading-[1.15]">
              WHERE STORIES <br />
              COME <span className="text-[#B8860B]">ALIVE &amp;</span> <br />
              <span className="text-[#B8860B]">IMAGINATION THRIVES</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Your global home for original stories across every genre. <br className="hidden sm:inline" />
              Read. Write. Connect. Belong.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/explore">
                <Button className="bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-extrabold px-6 py-5 rounded-full text-sm shadow-md gap-2 transition-all hover:scale-[1.02]">
                  <Compass className="w-4 h-4 stroke-[2.5]" />
                  <span>Explore Stories</span>
                </Button>
              </Link>
              <Link href="/studio/new">
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-stone-900 hover:bg-[#D4AF37]/15 font-semibold px-6 py-5 rounded-full text-sm bg-white gap-2 transition-all hover:scale-[1.02]"
                >
                  <Edit3 className="w-4 h-4 text-[#B8860B]" />
                  <span>Start Writing</span>
                </Button>
              </Link>
            </div>

            {/* Pagination Dots indicator */}
            <div className="flex items-center gap-1.5 pt-4 justify-start">
              <span className="w-2 h-2 rounded-full bg-stone-300" />
              <span className="w-5 h-2 rounded-full bg-[#D4AF37]" />
              <span className="w-2 h-2 rounded-full bg-stone-300" />
            </div>
          </div>

          {/* Right Column: Integrated Hero Visual Graphic (Light Theme) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-[1/1] rounded-3xl p-1.5 bg-gradient-to-br from-[#D4AF37]/40 via-amber-100 to-stone-200 shadow-xl group transition-all duration-500 hover:shadow-[#D4AF37]/30">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EF] to-[#F5EFE6] flex flex-col justify-end border border-[#D4AF37]/30">
                
                {/* 1. BACKGROUND LAYER: Subtle Silhouette & Image of Woman Reading */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
                    alt="Subtle silhouette of a woman reading"
                    fill
                    className="object-cover object-top opacity-20 mix-blend-multiply scale-105 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 filter brightness-105 contrast-110"
                    priority
                  />
                  {/* Warm Light Ambient Gradient & Halo Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6] via-[#FAF6EF]/70 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 z-10" />
                  
                  {/* Glowing Golden Aura Behind Reader */}
                  <div className="absolute top-1/4 right-1/4 w-44 h-44 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none z-10 animate-pulse" />
                  <div className="absolute top-1/3 left-1/3 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl pointer-events-none z-10" />

                  {/* Sparkle Accents */}
                  <div className="absolute top-8 right-12 z-20 opacity-80">
                    <Sparkles className="w-5 h-5 text-[#B8860B] animate-bounce" />
                  </div>
                  <div className="absolute top-20 left-10 z-20 opacity-70">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>

                {/* 2. FOREGROUND LAYER: Books Stack in Foreground */}
                <div className="relative z-20 p-4 sm:p-6 pb-5 flex flex-col items-center justify-end h-full">
                  <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[4/3] transform group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500 ease-out">
                    {/* Shadow under books stack */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-5 bg-[#B8860B]/20 blur-md rounded-full z-0" />
                    
                    {/* Stack of Books */}
                    <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_15px_30px_rgba(184,134,11,0.25)]">
                      <SafeImage
                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
                        alt="Stack of Books in Foreground"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      {/* Soft warm light gradient overlay on book stack */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-white/10 pointer-events-none" />
                    </div>

                    {/* Mini Floating Overlay Label */}
                    <div className="absolute -bottom-2 -left-2 z-30 px-3 py-1 rounded-lg bg-white/95 border border-[#D4AF37]/60 text-[#B8860B] text-[10px] font-extrabold shadow-md backdrop-blur-md flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>African Folklore Library</span>
                    </div>
                  </div>
                </div>

                {/* 3. INTEGRATED FLOATING LIGHT BADGES */}
                {/* Top Glass Light Badge */}
                <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D4AF37]/50 text-stone-900 text-xs font-bold backdrop-blur-md shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping" />
                  <span className="text-[#B8860B]">Integrated Lore Visual</span>
                </div>

                {/* Bottom Right Reader Counter Badge */}
                <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-[#D4AF37]/50 text-stone-900 text-xs font-bold backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="p-1 rounded-lg bg-[#D4AF37]/20 text-[#B8860B]">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-stone-950 leading-tight">10,000+ Readers</p>
                    <p className="text-[9px] text-stone-600 font-medium">Reading African Stories</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="flex items-center justify-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
              <BookOpen className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none">10K+</p>
              <p className="text-xs text-stone-600 font-medium mt-1">Stories</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 pt-4 md:pt-2">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none">5K+</p>
              <p className="text-xs text-stone-600 font-medium mt-1">Writers</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 pt-4 md:pt-2">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
              <Globe className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none">150+</p>
              <p className="text-xs text-stone-600 font-medium mt-1">Countries</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 pt-4 md:pt-2">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
              <Heart className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none">50K+</p>
              <p className="text-xs text-stone-600 font-medium mt-1">Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOLKLORE CATEGORIES & TRADITIONS HORIZONTAL CAROUSEL */}
      <CategoryCarousel />

      {/* ========================================================================= */}
      {/* 1. FEATURED STORIES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B]">
              <Sparkles className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Featured Stories
              </h2>
              <p className="text-xs text-stone-600 font-medium">Handpicked folklore masterpieces spotlighted by our editorial curators</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(featuredScrollRef, "left")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(featuredScrollRef, "right")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/explore?sort=featured"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors ml-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Story Spotlight Carousel */}
        <div className="relative group">
          {/* Spotlight Left / Right Floating Navigation Buttons */}
          <button
            type="button"
            onClick={() => scrollSpotlight("left")}
            className="absolute left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-lg border border-stone-200/80 backdrop-blur-md transition-all hover:scale-110 active:scale-95 flex items-center justify-center opacity-90 group-hover:opacity-100"
            aria-label="Previous spotlight story"
          >
            <ChevronLeft className="w-5 h-5 text-stone-800" />
          </button>
          <button
            type="button"
            onClick={() => scrollSpotlight("right")}
            className="absolute right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-lg border border-stone-200/80 backdrop-blur-md transition-all hover:scale-110 active:scale-95 flex items-center justify-center opacity-90 group-hover:opacity-100"
            aria-label="Next spotlight story"
          >
            <ChevronRight className="w-5 h-5 text-stone-800" />
          </button>

          {/* Spotlight Scroll Container */}
          <div
            ref={spotlightScrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          >
            {/* Spotlight 1: Beyond the Sunset */}
            <div className="w-[88vw] sm:w-[580px] md:w-[700px] lg:w-[840px] shrink-0 snap-start">
              <Link href="/story/anansi-and-the-pot-of-wisdom" className="block group/card h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 h-full">
                  {/* Left Cover Image */}
                  <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto min-h-[220px]">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                      alt="Beyond the Sunset"
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-extrabold uppercase tracking-wider">
                        SPOTLIGHT FEATURED
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        1 of 4
                      </span>
                    </div>
                  </div>

                  {/* Right Card Details */}
                  <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover/card:text-[#B8860B] transition-colors">
                        Beyond the Sunset
                      </h3>

                      <div className="flex items-center space-x-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0">
                          <SafeImage
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                            alt="Nia Okonkwo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-stone-700">Nia Okonkwo</span>
                      </div>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        Two hearts. One impossible choice. A love that defies time and fate across ancient realms.
                      </p>
                    </div>

                    {/* Bottom stats bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          25.4K reads
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Heart className="w-3.5 h-3.5 text-stone-500" />
                          2.1K likes
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark("featured-1", e)}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked["featured-1"]
                            ? "text-[#B8860B] bg-[#D4AF37]/15"
                            : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        }`}
                        aria-label="Bookmark story"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${bookmarked["featured-1"] ? "fill-[#B8860B]" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Spotlight 2: The Golden Stool of Ashanti */}
            <div className="w-[88vw] sm:w-[580px] md:w-[700px] lg:w-[840px] shrink-0 snap-start">
              <Link href="/story/anansi-and-the-pot-of-wisdom" className="block group/card h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 h-full">
                  {/* Left Cover Image */}
                  <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto min-h-[220px]">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
                      alt="The Golden Stool of Ashanti"
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                        SPOTLIGHT FEATURED
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        2 of 4
                      </span>
                    </div>
                  </div>

                  {/* Right Card Details */}
                  <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover/card:text-[#B8860B] transition-colors">
                        The Golden Stool of Ashanti
                      </h3>

                      <div className="flex items-center space-x-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0">
                          <SafeImage
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                            alt="Akwasi Mensah"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-stone-700">Akwasi Mensah</span>
                      </div>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        The sacred ancestral relic descends from stormy skies. A young blacksmith must defend the stool against invading empires.
                      </p>
                    </div>

                    {/* Bottom stats bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          38.2K reads
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Heart className="w-3.5 h-3.5 text-stone-500" />
                          3.4K likes
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark("featured-spot-2", e)}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked["featured-spot-2"]
                            ? "text-[#B8860B] bg-[#D4AF37]/15"
                            : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        }`}
                        aria-label="Bookmark story"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${bookmarked["featured-spot-2"] ? "fill-[#B8860B]" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Spotlight 3: Sundiata: Lion King of Mali */}
            <div className="w-[88vw] sm:w-[580px] md:w-[700px] lg:w-[840px] shrink-0 snap-start">
              <Link href="/story/sundiata-the-lion-king-of-mali" className="block group/card h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 h-full">
                  {/* Left Cover Image */}
                  <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto min-h-[220px]">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop"
                      alt="Sundiata: Lion King of Mali"
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-[10px] font-extrabold uppercase tracking-wider">
                        SPOTLIGHT FEATURED
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        3 of 4
                      </span>
                    </div>
                  </div>

                  {/* Right Card Details */}
                  <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover/card:text-[#B8860B] transition-colors">
                        Sundiata: Lion King of Mali
                      </h3>

                      <div className="flex items-center space-x-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0">
                          <SafeImage
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                            alt="Mariama Ba"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-stone-700">Mariama Ba</span>
                      </div>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        Exiled prince, legendary warrior, founder of the Mali Empire. An iron rod will help him rise to conquer destiny.
                      </p>
                    </div>

                    {/* Bottom stats bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          42.1K reads
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Heart className="w-3.5 h-3.5 text-stone-500" />
                          4.8K likes
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark("featured-spot-3", e)}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked["featured-spot-3"]
                            ? "text-[#B8860B] bg-[#D4AF37]/15"
                            : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        }`}
                        aria-label="Bookmark story"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${bookmarked["featured-spot-3"] ? "fill-[#B8860B]" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Spotlight 4: The Mask of Oya & The Storm Spirits */}
            <div className="w-[88vw] sm:w-[580px] md:w-[700px] lg:w-[840px] shrink-0 snap-start">
              <Link href="/story/anansi-and-the-pot-of-wisdom" className="block group/card h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 h-full">
                  {/* Left Cover Image */}
                  <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto min-h-[220px]">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                      alt="The Mask of Oya & The Storm Spirits"
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-extrabold uppercase tracking-wider">
                        SPOTLIGHT FEATURED
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        4 of 4
                      </span>
                    </div>
                  </div>

                  {/* Right Card Details */}
                  <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover/card:text-[#B8860B] transition-colors">
                        The Mask of Oya & The Storm Spirits
                      </h3>

                      <div className="flex items-center space-x-2.5">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0">
                          <SafeImage
                            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=200&auto=format&fit=crop"
                            alt="Babatunde Lawal"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-stone-700">Babatunde Lawal</span>
                      </div>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        When monsoon winds howl across the Niger River, the high priestess unleashes the wrath of the wind orisha.
                      </p>
                    </div>

                    {/* Bottom stats bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          29.7K reads
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Heart className="w-3.5 h-3.5 text-stone-500" />
                          2.6K likes
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark("featured-spot-4", e)}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked["featured-spot-4"]
                            ? "text-[#B8860B] bg-[#D4AF37]/15"
                            : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        }`}
                        aria-label="Bookmark story"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${bookmarked["featured-spot-4"] ? "fill-[#B8860B]" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Stories Horizontal Carousel */}
        <div
          ref={featuredScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* Spotlight Featured Card in Scroll Row */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border-2 border-[#D4AF37]/50 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                  alt="Beyond the Sunset"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 fill-white" />
                  <span>SPOTLIGHT</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-900/90 text-amber-300 border border-amber-400/40 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    ROMANCE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Beyond the Sunset
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Nia Okonkwo</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Two hearts. One impossible choice. A love that defies time and fate across ancient realms.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  25.4K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("featured-0", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["featured-0"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["featured-0"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 1 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                  alt="The Shadow King's Vow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.95</span>
                  <span className="text-[10px] text-stone-500 font-normal">(1.4K)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    FANTASY
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Shadow King's Vow
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Amara Diallo</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  An ancient oath broken. A kingdom hanging in the balance as darkness reawakens.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  34.2K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-1", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-1"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-1"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 2 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
                  alt="Song of the Baobab"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.82</span>
                  <span className="text-[10px] text-stone-500 font-normal">(890)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    FOLKLORE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Song of the Baobab
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Tariq Al-Mansoor</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Spirits whisper through the thousand-year roots, offering forbidden power to seekers.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  21.8K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-2", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-2"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-2"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 3 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop"
                  alt="Spirits of the Crimson River"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.91</span>
                  <span className="text-[10px] text-stone-500 font-normal">(1.2K)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    MYTHOLOGY
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Spirits of the Crimson River
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Zoya Ndiaye</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  A river of blood, a sacred pact, and a brave maiden destined to heal two warring tribes.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  28.5K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-3", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-3"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-3"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 4 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="The Starlight Covenant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.88</span>
                  <span className="text-[10px] text-stone-500 font-normal">(1.1K)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    SCI-FI
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Starlight Covenant
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Zuri Mbeki</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Afrofuturistic starfarers defending their ancestral solar legacy against star invaders.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  19.8K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-4", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-4"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-4"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 5 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop"
                  alt="Sundiata: Lion King of Mali"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.98</span>
                  <span className="text-[10px] text-stone-500 font-normal">(2.3K)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    EPIC
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Sundiata: Lion King of Mali
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Mariama Ba</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  The heroic griot epic of the child who could not walk and rose to unite the Mali Empire.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  42.1K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-5", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-5"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-5"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 6 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
                  alt="Mami Wata: Whispering Currents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.92</span>
                  <span className="text-[10px] text-stone-500 font-normal">(1.6K)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    MYTHOLOGY
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Mami Wata: Whispering Currents
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Nia Okonkwo</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  A seaside encounter with the elusive water deity testing the humility of mortal fishermen.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  28.6K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-6", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-6"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-6"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 7 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop"
                  alt="Dogon: Sirius Star Dancers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.90</span>
                  <span className="text-[10px] text-stone-500 font-normal">(980)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    COSMOLOGY
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Dogon: Sirius Star Dancers
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Oumar Sangare</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Ancient celestial knowledge handed down through generations of high cliff priests.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  21.4K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-7", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-7"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-7"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Featured Card 8 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[290px]">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1511497584788-876761c119ef?q=80&w=800&auto=format&fit=crop"
                  alt="Queen Moremi's Sacred Oath"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.86</span>
                  <span className="text-[10px] text-stone-500 font-normal">(840)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    LEGEND
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Queen Moremi's Sacred Oath
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Folake Adeyemi</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  A courageous queen infiltrates the forest spirit raiders to rescue the sacred city of Ife.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  17.5K reads
                </span>
                <button
                  onClick={(e) => toggleBookmark("hr-8", e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarked["hr-8"]
                      ? "text-[#B8860B] bg-[#D4AF37]/15"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["hr-8"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. RECOMMENDED FOR YOU */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B]">
              <Heart className="w-5 h-5 fill-[#B8860B] text-[#B8860B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Recommended For You
              </h2>
              <p className="text-xs text-stone-600 font-medium">Tailored story recommendations based on your reading lineage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(recommendedScrollRef, "left")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(recommendedScrollRef, "right")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/explore?sort=recommended"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors ml-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recommended Stories Horizontal Carousel */}
        <div
          ref={recommendedScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* Card 1: Pieces of Us */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 text-[9px] font-extrabold uppercase tracking-wider">
                  DRAMA
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="Pieces of Us"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Pieces of Us
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Zanele Dlamini</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    12.4K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    980
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Whispers in the Dark */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider">
                  PARANORMAL
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
                  alt="Whispers in the Dark"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Whispers in the Dark
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Lebo Mokoena</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    11.7K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    860
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: The Heir's Promise */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider">
                  HISTORICAL
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop"
                  alt="The Heir's Promise"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Heir's Promise
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Chinedu Eze</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    16.8K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Lost Beyond the Horizon */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300 text-[9px] font-extrabold uppercase tracking-wider">
                  ADVENTURE
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                  alt="Lost Beyond the Horizon"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Lost Beyond the Horizon
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Kwame Nkrumah</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    14.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.0K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 5: Echoes of the Savannah */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[9px] font-extrabold uppercase tracking-wider">
                  DRAMA
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                  alt="Echoes of the Savannah"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Echoes of the Savannah
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Folake Adeyemi</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    13.9K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    940
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 6: Daughters of the Rain Queen */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 text-[9px] font-extrabold uppercase tracking-wider">
                  FANTASY
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop"
                  alt="Daughters of the Rain Queen"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Daughters of the Rain Queen
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Modupe Adeleke</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    15.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.2K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 7: The Python's Enigma */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider">
                  MYTHOLOGY
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                  alt="The Python's Enigma"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Python's Enigma
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Babatunde Lawal</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    11.4K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    820
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 8: Tales of Kalahari Sands */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider">
                  ADVENTURE
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop"
                  alt="Tales of Kalahari Sands"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Tales of Kalahari Sands
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Kagiso Molefe</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    16.7K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.3K
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. NEW RELEASES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-600">
              <Flame className="w-5 h-5 fill-amber-600 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                New Releases
              </h2>
              <p className="text-xs text-stone-600 font-medium">Fresh stories and newly penned folklore chapters published today</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(newReleasesScrollRef, "left")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(newReleasesScrollRef, "right")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/explore?sort=newest"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors ml-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* New Releases Horizontal Carousel */}
        <div
          ref={newReleasesScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* New Release 1 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
                  alt="Chronicles of the Sun Emperor"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Chronicles of the Sun Emperor
                </h4>
                <p className="text-xs text-stone-600 font-medium">Kwame Asante • Published 2h ago</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  A young prince rises against cosmic warlords to reclaim his empire's lost throne.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    12 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    4.2K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 2 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop"
                  alt="Secrets of the Moonlight River"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Secrets of the Moonlight River
                </h4>
                <p className="text-xs text-stone-600 font-medium">Amina Yusuf • Published 4h ago</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Mystical enchantments awake whenever the river turns silver at midnight.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    8 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    3.8K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 3 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400&auto=format&fit=crop"
                  alt="Tears of the Desert Rose"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Tears of the Desert Rose
                </h4>
                <p className="text-xs text-stone-600 font-medium">Kenzo Mensah • Published Today</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  A high-stakes romance set against caravan journeys through ancient trading posts.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    6 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    2.9K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 4 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
                  alt="Guardian of the Forgotten Realm"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Guardian of the Forgotten Realm
                </h4>
                <p className="text-xs text-stone-600 font-medium">Nneka Okafor • Published Yesterday</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Interactive multi-choice quest deep inside the sacred forest of spirits.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    15 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    5.1K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 5 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=400&auto=format&fit=crop"
                  alt="Dance of the Firefly Spirits"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Dance of the Firefly Spirits
                </h4>
                <p className="text-xs text-stone-600 font-medium">Zoya Ndiaye • Published Today</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Luminescent nocturnal folklore woven through Senegalese delta river journeys.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    10 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    3.4K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 6 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop"
                  alt="The Drum That Awakened the Sun"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Drum That Awakened the Sun
                </h4>
                <p className="text-xs text-stone-600 font-medium">Chikezie Obi • Published Today</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  A rhythmic quest across ancient hills to summon the dawn after endless twilight.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    7 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    4.0K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 7 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=400&auto=format&fit=crop"
                  alt="Sands of the Sahara Caravan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Sands of the Sahara Caravan
                </h4>
                <p className="text-xs text-stone-600 font-medium">Fatima Zahra • Published Yesterday</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Lost navigational scrolls lead a merchant guild to a forgotten subterranean oasis.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    9 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    3.6K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release 8 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[320px] sm:w-[380px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NEW RELEASE
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop"
                  alt="Legend of the Iron Spear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Legend of the Iron Spear
                </h4>
                <p className="text-xs text-stone-600 font-medium">Sekou Toure • Published 1d ago</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  The legacy of the blacksmith shamans who forged the celestial shields of the empire.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                    14 chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    4.8K reads
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECENTLY UPDATED */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 border border-blue-300 text-blue-600">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Recently Updated
              </h2>
              <p className="text-xs text-stone-600 font-medium">Active ongoing serials with newly published chapter drops</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(recentlyUpdatedScrollRef, "left")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(recentlyUpdatedScrollRef, "right")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/explore?sort=recently_updated"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors pl-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recently Updated Horizontal Scroll Row */}
        <div
          ref={recentlyUpdatedScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* Item 1 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 18 Added
                </span>
                <span className="text-[10px] text-stone-500">30m ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Golden Stool of Ashanti
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Akwasi Mensah</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 18: "The Battle of the Sacred Forest" has been released with new audio narration.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>18 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-1", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-1"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-1"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 2 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 24 Added
                </span>
                <span className="text-[10px] text-stone-500">1h ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Sundiata: Lion King of Mali
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Mariama Ba</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 24: "Coronation of the Great Empire" is now available for readers.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>24 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-2", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-2"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-2"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 3 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 7 Added
                </span>
                <span className="text-[10px] text-stone-500">3h ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Daughter of the Ocean Spirit
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Folake Adeyemi</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 7: "The Song of Yemoja" released with interactive choice branch nodes.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>7 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-3", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-3"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-3"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 4 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 14 Added
                </span>
                <span className="text-[10px] text-stone-500">5h ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Mask of Oya
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Babatunde Lawal</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 14: "The Winds of Change" drops with full illustrated artwork.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>14 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-4", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-4"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-4"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 5 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 9 Added
                </span>
                <span className="text-[10px] text-stone-500">8h ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Calabash of Star Dust
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Amadou Diallo</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 9: "Constellations over the Cliff" released with musical accompaniment.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>9 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-5", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-5"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-5"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 6 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 31 Added
                </span>
                <span className="text-[10px] text-stone-500">12h ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The Warrior Queen of Zaria
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Khadija Bello</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 31: "The Fortresses of Earth" now updated with enhanced combat branches.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>31 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-6", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-6"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-6"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 7 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 11 Added
                </span>
                <span className="text-[10px] text-stone-500">1d ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  The River Maiden's Vow
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Tendai Moyo</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 11: "Zambezi Depths" drops with authentic Shona praise chants.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>11 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-7", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-7"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-7"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>

          {/* Item 8 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[270px] sm:w-[300px]">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> + Ch. 16 Added
                </span>
                <span className="text-[10px] text-stone-500">1d ago</span>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Spirits of the Sacred Grove
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Esi Sutherland</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  Chapter 16: "The Council of Tree Spirits" now live with full audio commentary.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500 font-medium">
                <span>16 Chapters total</span>
                <button
                  onClick={(e) => toggleBookmark("ru-8", e)}
                  className={`p-1 rounded-lg transition-colors ${
                    bookmarked["ru-8"] ? "text-[#B8860B]" : "hover:text-stone-900"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked["ru-8"] ? "fill-[#B8860B]" : ""}`} />
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TOP AUTHORS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B]">
              <Award className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Top Authors
              </h2>
              <p className="text-xs text-stone-600 font-medium">Spotlighting master storytellers captivating our community</p>
            </div>
          </div>
          <Link
            href="/explore?sort=top_authors"
            className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Author Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Spotlight Card (#1 Author) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Rank & Specialty Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#D4AF37] text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  👑 #1 Author of the Week
                </span>
                <span className="text-xs font-semibold text-[#B8860B] bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  Yoruba &amp; Pan-African Lore
                </span>
              </div>

              {/* Author Bio & Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37] p-1 shrink-0 bg-stone-100 shadow-md overflow-hidden">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
                    alt="Nia Okonkwo"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>

                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">Nia Okonkwo</h3>
                    <CheckCircle2 className="w-5 h-5 text-[#B8860B] fill-[#D4AF37]/20" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium">@nia_lore • Lagos, Nigeria</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
                    Elder storyteller and author of over 24 folklore series on Inkoma. Winner of the 2026 African Lore Fellowship.
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-center">
                <div>
                  <span className="block text-lg sm:text-xl font-black text-stone-900">312K</span>
                  <span className="text-[11px] text-stone-500 font-medium">Total Reads</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl font-black text-stone-900">24</span>
                  <span className="text-[11px] text-stone-500 font-medium">Published Stories</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl font-black text-stone-900">18.5K</span>
                  <span className="text-[11px] text-stone-500 font-medium">Followers</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <Button
                onClick={(e) => toggleFollow("author-1", e)}
                className={`px-6 py-5 rounded-full text-xs sm:text-sm font-bold shadow-md gap-2 transition-all ${
                  followedAuthors["author-1"]
                    ? "bg-stone-200 text-stone-800 hover:bg-stone-300 border border-stone-300"
                    : "bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{followedAuthors["author-1"] ? "Following" : "Follow Author"}</span>
              </Button>

              <Link href="/profile/nia_lore">
                <Button variant="outline" className="border-stone-300 text-stone-800 hover:bg-stone-100 px-6 py-5 rounded-full text-xs sm:text-sm font-semibold">
                  View Full Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Runners Up Side Column (#2 & #3 Authors) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            {/* #2 Author */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-[#B8860B] border border-stone-200 text-[10px] font-bold uppercase tracking-wider">
                  🥈 #2 Author this Week
                </span>
                <span className="text-[11px] text-stone-500">245K Reads</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0 bg-stone-100">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                    alt="Lebo Mokoena"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-stone-900 truncate">Lebo Mokoena</h4>
                  <p className="text-xs text-stone-500 truncate">Zulu Mythos &amp; Urban Legends</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-500">18 Stories published</span>
                <Button
                  onClick={(e) => toggleFollow("author-2", e)}
                  size="sm"
                  variant="outline"
                  className={`text-xs font-semibold rounded-full px-4 h-8 ${
                    followedAuthors["author-2"]
                      ? "border-stone-300 bg-stone-100 text-stone-700"
                      : "border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15"
                  }`}
                >
                  {followedAuthors["author-2"] ? "Following" : "Follow"}
                </Button>
              </div>
            </div>

            {/* #3 Author */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 hover:border-[#D4AF37]/60 transition-all shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-[#B8860B] border border-stone-200 text-[10px] font-bold uppercase tracking-wider">
                  🥉 #3 Author this Week
                </span>
                <span className="text-[11px] text-stone-500">198K Reads</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0 bg-stone-100">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
                    alt="Chinedu Eze"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-stone-900 truncate">Chinedu Eze</h4>
                  <p className="text-xs text-stone-500 truncate">Historical Fiction &amp; Battles</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-500">12 Stories published</span>
                <Button
                  onClick={(e) => toggleFollow("author-3", e)}
                  size="sm"
                  variant="outline"
                  className={`text-xs font-semibold rounded-full px-4 h-8 ${
                    followedAuthors["author-3"]
                      ? "border-stone-300 bg-stone-100 text-stone-700"
                      : "border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15"
                  }`}
                >
                  {followedAuthors["author-3"] ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-FOOTER SECTION: SUPPORT INKOMA & SOCIAL MEDIA */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-[#D4AF37]/40 p-6 sm:p-10 lg:p-12 shadow-xl">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Box: Support Inkoma CTA */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B] text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                Support Inkoma Creator Fund
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight leading-tight">
                Help Us Preserve &amp; Celebrate <br className="hidden sm:inline" />
                <span className="text-[#B8860B]">Independent Storytelling</span>
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Inkoma is committed to empowering independent African authors, digitizing indigenous folklore, and supporting living lore archives. Your support directly funds creator grants and open community tools.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/support">
                  <Button className="bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-extrabold px-8 py-6 rounded-full text-sm sm:text-base shadow-lg gap-3 transition-all hover:scale-[1.02]">
                    <Heart className="w-5 h-5 fill-stone-950 text-stone-950" />
                    <span>Support INKOMA</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Box: Social Media Connections */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 space-y-5 text-center sm:text-left shadow-sm">
              <div>
                <h3 className="text-lg font-extrabold text-stone-900 flex items-center justify-center sm:justify-start gap-2">
                  <Share2 className="w-4 h-4 text-[#B8860B]" />
                  Join Our Community
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Connect with fellow writers, readers, and elders across our official social channels.
                </p>
              </div>

              {/* Social Media Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3 pt-1">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">Twitter / X</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">Instagram</span>
                </a>

                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="Discord"
                >
                  <DiscordIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">Discord</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">YouTube</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">Facebook</span>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] hover:text-[#B8860B] text-stone-700 transition-all duration-200 shadow-xs group"
                  aria-label="TikTok"
                >
                  <TiktokIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold mt-1.5">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
