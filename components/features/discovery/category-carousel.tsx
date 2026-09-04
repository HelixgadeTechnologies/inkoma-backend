"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Flame, Volume2, Shield, Moon, Compass, Crown, Waves } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryItem {
  id: string;
  name: string;
  tradition: string;
  count: number;
  description: string;
  image: string;
  href: string;
  badge: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "ashanti-akan",
    name: "Ashanti & Akan Lore",
    tradition: "Ashanti/Akan",
    count: 14,
    description: "Anansi trickster wisdom & golden stool covenants",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
    href: "/explore?tradition=Ashanti%2FAkan",
    badge: "Trickster Wisdom",
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
  },
  {
    id: "yoruba-orisha",
    name: "Yoruba Orisha Mythos",
    tradition: "Yoruba",
    count: 18,
    description: "Thunder deities, sea spirits, and ancestral pacts",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    href: "/explore?tradition=Yoruba",
    badge: "Spirit Realm",
    icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
  },
  {
    id: "dogon-cosmology",
    name: "Dogon Star Cosmology",
    tradition: "Dogon",
    count: 9,
    description: "Sirius star dancers & ancient cliff cosmology",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
    href: "/explore?tradition=Dogon",
    badge: "Star Myths",
    icon: <Moon className="w-3.5 h-3.5 text-blue-300" />,
  },
  {
    id: "mandinka-mali",
    name: "Manden Heroic Epics",
    tradition: "Pan-African",
    count: 12,
    description: "Sundiata Keita, griot recitations, and iron staffs",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80",
    href: "/explore?genre=Historical%20Epics",
    badge: "Royal Dynasties",
    icon: <Crown className="w-3.5 h-3.5 text-yellow-400" />,
  },
  {
    id: "zulu-southern",
    name: "Zulu & Southern Epics",
    tradition: "Zulu",
    count: 11,
    description: "Izibongo praise poetry & warrior lineage quests",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80",
    href: "/explore?tradition=Zulu",
    badge: "Warrior Lineage",
    icon: <Shield className="w-3.5 h-3.5 text-red-400" />,
  },
  {
    id: "swahili-coastal",
    name: "Swahili Coastal Tales",
    tradition: "Swahili",
    count: 8,
    description: "Indian Ocean trade winds, sea djinns & dhows",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    href: "/explore?tradition=Swahili",
    badge: "Coastal Legends",
    icon: <Waves className="w-3.5 h-3.5 text-cyan-300" />,
  },
  {
    id: "audio-narration",
    name: "Oral Voice Audiobooks",
    tradition: "Pan-African",
    count: 16,
    description: "Authentic oral voice narration by native griots",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80",
    href: "/explore?audio=true",
    badge: "Listen & Explore",
    icon: <Volume2 className="w-3.5 h-3.5 text-emerald-400" />,
  },
  {
    id: "afrofuturism",
    name: "Afrofuturism & Cyber Lore",
    tradition: "Pan-African",
    count: 10,
    description: "Futuristic solar kingdoms & cybernetic mythos",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    href: "/explore?genre=Afrofuturism",
    badge: "Futuristic Mythos",
    icon: <Compass className="w-3.5 h-3.5 text-purple-400" />,
  },
];

export function CategoryCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-extrabold text-stone-900 font-serif tracking-tight">
              Explore Folklore Categories & Traditions
            </h2>
          </div>
          <p className="text-xs text-stone-500">
            Scroll side-by-side to discover ancestral lore across regions
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-all shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-all shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side by Side Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative flex flex-col justify-between w-[76vw] max-w-[260px] sm:w-[260px] shrink-0 snap-start rounded-2xl border border-stone-200 bg-white overflow-hidden p-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0"
          >
            {/* Background Image Overlay */}
            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-stone-900">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-stone-950/50" />

              <div className="absolute top-2.5 left-2.5">
                <Badge className="bg-stone-900/80 text-white backdrop-blur-md text-[10px] font-semibold flex items-center gap-1 border-0">
                  {cat.icon}
                  {cat.badge}
                </Badge>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                <span className="font-bold drop-shadow-xs">{cat.count} Manuscripts</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-stone-100 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-3 mt-2 border-t border-stone-800 flex items-center justify-between text-[11px] font-bold text-[#D4AF37] group-hover:underline">
              <span>Explore Tradition</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
