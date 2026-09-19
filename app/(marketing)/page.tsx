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

  const featuredScrollRef = React.useRef<HTMLDivElement>(null);
  const recommendedScrollRef = React.useRef<HTMLDivElement>(null);
  const newReleasesScrollRef = React.useRef<HTMLDivElement>(null);
  const recentlyUpdatedScrollRef = React.useRef<HTMLDivElement>(null);
  const topAuthorsScrollRef = React.useRef<HTMLDivElement>(null);

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

        {/* Featured Stories Horizontal Carousel */}
        <div
          ref={featuredScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* Featured Card 1: Beyond the Sunset */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[9px] font-extrabold uppercase tracking-wider">
                  SPOTLIGHT
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                  alt="Beyond the Sunset"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Beyond the Sunset
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Nia Okonkwo</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    25.4K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    2.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 2: The Shadow King's Vow */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[9px] font-extrabold uppercase tracking-wider">
                  FANTASY
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                  alt="The Shadow King's Vow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Shadow King's Vow
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Amara Diallo</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    34.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.4K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 3: Song of the Baobab */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider">
                  FOLKLORE
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
                  alt="Song of the Baobab"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Song of the Baobab
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Kofi Mensah</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    19.8K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    890
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 4: The Golden Stool of Ashanti */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-[9px] font-extrabold uppercase tracking-wider">
                  HISTORICAL
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
                  alt="The Golden Stool of Ashanti"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Golden Stool of Ashanti
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Akwasi Mensah</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    38.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    2.3K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 5: Whispers of the Ancestors */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider">
                  SPIRITUAL
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop"
                  alt="Whispers of the Ancestors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Whispers of the Ancestors
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Zanele Dlamini</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    22.1K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 6: Mami Wata: Whispering Currents */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 text-[9px] font-extrabold uppercase tracking-wider">
                  MYTHOLOGY
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop"
                  alt="Mami Wata: Whispering Currents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Mami Wata: Currents
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Nia Okonkwo</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    28.6K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    1.6K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 7: Dogon: Sirius Star Dancers */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider">
                  COSMOLOGY
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop"
                  alt="Dogon: Sirius Star Dancers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Dogon: Star Dancers
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Oumar Sangare</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    21.4K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    980
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Featured Card 8: Queen Moremi's Sacred Oath */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[9px] font-extrabold uppercase tracking-wider">
                  LEGEND
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1511497584788-876761c119ef?q=80&w=800&auto=format&fit=crop"
                  alt="Queen Moremi's Sacred Oath"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Queen Moremi's Oath
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Folake Adeyemi</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    17.5K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    840
                  </span>
                </div>
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
          {/* New Release Card 1: Chronicles of the Sun Emperor */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  2h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                  alt="Chronicles of the Sun Emperor"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Chronicles of the Sun Emperor
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Kwame Asante</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    12 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    4.2K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 2: Secrets of the Moonlight River */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  4h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
                  alt="Secrets of the Moonlight River"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Secrets of the Moonlight River
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Amina Yusuf</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    8 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    3.8K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 3: Tears of the Desert Rose */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  Today
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop"
                  alt="Tears of the Desert Rose"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Tears of the Desert Rose
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Kenzo Mensah</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    6 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    2.9K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 4: Guardian of the Forgotten Realm */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1d ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                  alt="Guardian of the Forgotten Realm"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Guardian of the Forgotten Realm
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Nneka Okafor</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    15 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    5.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 5: Dance of the Firefly Spirits */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  Today
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop"
                  alt="Dance of the Firefly Spirits"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Dance of the Firefly Spirits
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Zoya Ndiaye</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    10 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    3.4K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 6: The Drum That Awakened the Sun */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  Today
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
                  alt="The Drum That Awakened the Sun"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Drum That Awakened the Sun
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Chikezie Obi</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    7 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    4.0K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 7: Sands of the Sahara Caravan */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1d ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop"
                  alt="Sands of the Sahara Caravan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Sands of the Sahara Caravan
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Fatima Zahra</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    9 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    3.6K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* New Release Card 8: Legend of the Iron Spear */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  NEW RELEASE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1d ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                  alt="Legend of the Iron Spear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Legend of the Iron Spear
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Sekou Toure</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    14 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    4.8K
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
          {/* Recently Updated Card 1: The Golden Stool of Ashanti */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 18
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  30m ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
                  alt="The Golden Stool of Ashanti"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Golden Stool of Ashanti
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Akwasi Mensah</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    18 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    5.2K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 2: Sundiata: Lion King of Mali */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 24
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop"
                  alt="Sundiata: Lion King of Mali"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Sundiata: Lion King of Mali
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Mariama Ba</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    24 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    42.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 3: Daughter of the Ocean Spirit */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 7
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  3h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                  alt="Daughter of the Ocean Spirit"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Daughter of the Ocean Spirit
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Folake Adeyemi</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    7 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    14.6K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 4: The Mask of Oya */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 14
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  5h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
                  alt="The Mask of Oya"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Mask of Oya
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Babatunde Lawal</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    14 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    19.3K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 5: The Calabash of Star Dust */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 9
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  8h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop"
                  alt="The Calabash of Star Dust"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Calabash of Star Dust
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Amadou Diallo</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    9 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    8.9K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 6: The Warrior Queen of Zaria */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 31
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  12h ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="The Warrior Queen of Zaria"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The Warrior Queen of Zaria
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Khadija Bello</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    31 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    35.2K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 7: The River Maiden's Vow */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 11
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1d ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
                  alt="The River Maiden's Vow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  The River Maiden's Vow
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Tendai Moyo</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    11 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    11.7K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recently Updated Card 8: Spirits of the Sacred Grove */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-blue-600" />
                  + CH. 16
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 text-white text-[9px] font-bold backdrop-blur-md">
                  1d ago
                </span>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                  alt="Spirits of the Sacred Grove"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                  Spirits of the Sacred Grove
                </h4>
                <p className="text-[11px] text-stone-600 font-medium truncate">Esi Sutherland</p>

                <div className="flex items-center space-x-3 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#B8860B]" />
                    16 chs
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    17.4K
                  </span>
                </div>
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollRow(topAuthorsScrollRef, "left")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(topAuthorsScrollRef, "right")}
                className="p-1.5 sm:p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-[#D4AF37]/60 transition-all shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/explore?sort=top_authors"
              className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors ml-1"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Top Authors Horizontal Carousel */}
        <div
          ref={topAuthorsScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {/* Card 1: Nia Okonkwo */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider">
                  👑 #1 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-1", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-1"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-1"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="Nia Okonkwo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/nia_lore" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Nia Okonkwo
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Yoruba Lore • 312K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    24 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    18.5K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Lebo Mokoena */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-300 text-[9px] font-extrabold uppercase tracking-wider">
                  🥈 #2 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-2", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-2"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-2"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Lebo Mokoena"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/lebo_mokoena" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Lebo Mokoena
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Zulu Mythos • 245K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    18 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    14.2K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Chinedu Eze */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 text-[9px] font-extrabold uppercase tracking-wider">
                  🥉 #3 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-3", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-3"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-3"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                  alt="Chinedu Eze"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/chinedu_eze" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Chinedu Eze
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Historical Epics • 198K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    12 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    11.8K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Tobi Adebayo */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider">
                  #4 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-4", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-4"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-4"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                  alt="Tobi Adebayo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/tobi_adebayo" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Tobi Adebayo
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Afrofuturism • 176K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    15 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    9.4K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Mariama Ba */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-[9px] font-extrabold uppercase tracking-wider">
                  #5 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-5", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-5"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-5"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop"
                  alt="Mariama Ba"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/mariama_ba" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Mariama Ba
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Manden Epics • 164K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    10 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    8.7K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Akwasi Mensah */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-extrabold uppercase tracking-wider">
                  #6 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-6", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-6"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-6"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop"
                  alt="Akwasi Mensah"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/akwasi_mensah" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Akwasi Mensah
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Ashanti Myths • 152K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    14 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    8.1K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 7: Khadija Bello */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-[9px] font-extrabold uppercase tracking-wider">
                  #7 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-7", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-7"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-7"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                  alt="Khadija Bello"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/khadija_bello" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Khadija Bello
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Hausa Lore • 138K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    9 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    7.5K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 8: Folake Adeyemi */}
          <div className="group block shrink-0 snap-start w-[220px] sm:w-[250px]">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3 h-full">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-300 text-[9px] font-extrabold uppercase tracking-wider">
                  #8 AUTHOR
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFollow("author-8", e)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all shadow-xs ${
                    followedAuthors["author-8"]
                      ? "bg-stone-900 text-white"
                      : "bg-[#D4AF37] text-stone-950 hover:bg-[#c49f27]"
                  }`}
                >
                  {followedAuthors["author-8"] ? "Following" : "+ Follow"}
                </button>
              </div>

              <div className="absolute inset-0 z-0 opacity-80">
                <SafeImage
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="Folake Adeyemi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-auto pt-4 space-y-1 bg-white/95 p-2.5 rounded-xl border border-stone-200/80 backdrop-blur-md shadow-md">
                <Link href="/profile/folake_adeyemi" className="block group-hover:text-[#B8860B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                      Folake Adeyemi
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] fill-[#D4AF37]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium truncate">Coastal Lore • 126K Reads</p>
                </Link>

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-medium border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    11 stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    6.9K
                  </span>
                </div>
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
