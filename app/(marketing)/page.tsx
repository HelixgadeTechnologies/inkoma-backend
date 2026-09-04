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
      {/* 1. HERO SECTION */}
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

          {/* Right Column: Hero Graphic / Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group">
              <SafeImage
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
                alt="Glowing Book of Stories"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
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

      {/* 3. HIGHEST RATED THIS WEEK SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B]">
              <Star className="w-5 h-5 fill-[#B8860B] text-[#B8860B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Highest Rated This Week
              </h2>
              <p className="text-xs text-stone-600 font-medium">Top stories acclaimed by Inkoma readers worldwide</p>
            </div>
          </div>
          <Link
            href="/explore?sort=highest_rated"
            className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Highest Rated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rated Card 1 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                  alt="The Shadow King's Vow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Rating Badge */}
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

          {/* Rated Card 2 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                  alt="Echoes of the Savanna"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.91</span>
                  <span className="text-[10px] text-stone-500 font-normal">(980)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    FOLKLORE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Echoes of the Savanna
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Kofi Annan</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Spirits whisper through the golden grass when the full moon rises over the plains.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  28.6K reads
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

          {/* Rated Card 3 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between h-full p-3.5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <SafeImage
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
                  alt="Whispers Across the Nile"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#D4AF37] text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
                  <span>4.89</span>
                  <span className="text-[10px] text-stone-500 font-normal">(850)</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    HISTORICAL
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Whispers Across the Nile
                </h4>
                <p className="text-xs text-stone-600 font-medium line-clamp-1">Tariq Al-Mansoor</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                  Unraveling royal intrigues and forgotten tombs along the ancient banks.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  22.1K reads
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

          {/* Rated Card 4 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
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
                  Afrofuturistic starfarers defending their ancestral solar legacy.
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
        </div>
      </section>

      {/* 4. TOP AUTHOR THIS WEEK SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B]">
              <Award className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Top Author This Week
              </h2>
              <p className="text-xs text-stone-600 font-medium">Spotlighting master storytellers captivating our community</p>
            </div>
          </div>
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

      {/* 5. TRENDING STORIES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-600">
              <Flame className="w-5 h-5 fill-amber-600 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                Trending Stories
              </h2>
              <p className="text-xs text-stone-600 font-medium">Stories rapidly gaining viral momentum this week</p>
            </div>
          </div>
          <Link
            href="/explore?sort=trending"
            className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trending Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trending 1 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-black flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                +68% reads
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop"
                  alt="Chronicles of the Sun Emperor"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 w-6 h-6 rounded-lg bg-[#D4AF37] text-stone-950 text-xs font-black flex items-center justify-center shadow-md">
                  #1
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Chronicles of the Sun Emperor
                </h4>
                <p className="text-xs text-stone-600 font-medium">Kwame Asante</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  A young prince rises against cosmic warlords to reclaim his empire's lost throne.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    42.1K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-stone-500" />
                    3.4K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Trending 2 */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-black flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                +52% reads
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop"
                  alt="Secrets of the Moonlight River"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 w-6 h-6 rounded-lg bg-stone-100 border border-stone-300 text-[#B8860B] text-xs font-black flex items-center justify-center shadow-md">
                  #2
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Secrets of the Moonlight River
                </h4>
                <p className="text-xs text-stone-600 font-medium">Amina Yusuf</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Mystical enchantments awake whenever the river turns silver at midnight.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    35.8K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-stone-500" />
                    2.8K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Trending 3 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-black flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                +41% reads
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400&auto=format&fit=crop"
                  alt="Tears of the Desert Rose"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 w-6 h-6 rounded-lg bg-stone-100 border border-stone-300 text-[#B8860B] text-xs font-black flex items-center justify-center shadow-md">
                  #3
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Tears of the Desert Rose
                </h4>
                <p className="text-xs text-stone-600 font-medium">Kenzo Mensah</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  A high-stakes romance set against caravan journeys through ancient trading posts.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    29.4K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-stone-500" />
                    2.1K
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Trending 4 */}
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center hover:border-[#D4AF37]/60 transition-all shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-black flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                +37% reads
              </div>

              <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
                  alt="Guardian of the Forgotten Realm"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 w-6 h-6 rounded-lg bg-stone-100 border border-stone-300 text-[#B8860B] text-xs font-black flex items-center justify-center shadow-md">
                  #4
                </span>
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h4 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors line-clamp-1">
                  Guardian of the Forgotten Realm
                </h4>
                <p className="text-xs text-stone-600 font-medium">Nneka Okafor</p>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  Interactive multi-choice quest deep inside the sacred forest of spirits.
                </p>
                <div className="flex items-center space-x-3 text-xs text-stone-500 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    24.0K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-stone-500" />
                    1.9K
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. FEATURED STORIES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">Featured Stories</h2>
          <Link
            href="/explore?sort=featured"
            className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Story Card */}
        <div className="relative group">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:border-[#D4AF37]/60 transition-all duration-300">
            {/* Left Cover Image */}
            <div className="md:col-span-5 relative aspect-[16/9] md:aspect-auto min-h-[220px]">
              <SafeImage
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
                alt="Beyond the Sunset"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-extrabold uppercase tracking-wider">
                  ROMANCE
                </span>
              </div>
            </div>

            {/* Right Card Details */}
            <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
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
                  Two hearts. One impossible choice. A love that defies time and fate.
                </p>
              </div>

              {/* Bottom stats bar */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    25.4K
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Heart className="w-3.5 h-3.5 text-stone-500" />
                    2.1K
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
        </div>
      </section>

      {/* 7. RECOMMENDED FOR YOU SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">Recommended For You</h2>
          <Link
            href="/explore?sort=recommended"
            className="text-xs sm:text-sm font-semibold text-[#B8860B] hover:text-[#9A7B0C] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Pieces of Us */}
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3">
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
          <Link href="/story/anansi-and-the-pot-of-wisdom" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3">
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
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3">
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
          <Link href="/story/sundiata-the-lion-king-of-mali" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-stone-200 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm flex flex-col justify-between p-3">
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
        </div>
      </section>

      {/* 8. PRE-FOOTER SECTION: SUPPORT INKOMA & SOCIAL MEDIA */}
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
