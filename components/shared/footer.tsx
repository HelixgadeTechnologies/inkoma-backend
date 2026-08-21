import Link from "next/link";
import Image from "next/image";
import { Heart, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-[#F3EEE7] text-stone-600">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1 border border-stone-200 shadow-xs overflow-hidden">
                <Image
                  src="/images/inkoma-logo.png"
                  alt="Inkoma Logo"
                  width={52}
                  height={52}
                  className="object-contain h-full w-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                Inkoma
              </span>
            </div>
            <p className="max-w-sm text-sm text-stone-600 leading-relaxed">
              Preserving and reimagining African oral heritage, trickster folklore, and mythological wisdom through branching interactive narratives and oral voice experiences.
            </p>
            <div className="flex items-center space-x-3 text-xs text-stone-600">
              <span className="inline-flex items-center gap-1 text-[#680C07] font-semibold">
                <Globe className="h-3.5 w-3.5" />
                Pan-African Lore Initiative
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/explore" className="hover:text-folklore-amber transition-colors">
                  All Folklore Tales
                </Link>
              </li>
              <li>
                <Link href="/explore?tradition=ashanti" className="hover:text-folklore-amber transition-colors">
                  Anansi Trickster Lore
                </Link>
              </li>
              <li>
                <Link href="/explore?tradition=yoruba" className="hover:text-folklore-amber transition-colors">
                  Orisha Mythologies
                </Link>
              </li>
              <li>
                <Link href="/explore?tradition=dogon" className="hover:text-folklore-amber transition-colors">
                  Dogon Cosmologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Creators & Studio */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              Creators
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/studio" className="hover:text-folklore-amber transition-colors">
                  Storyteller Studio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-folklore-amber transition-colors">
                  Storyteller Guild
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-folklore-amber transition-colors">
                  Patron Tipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage & Values */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              Heritage
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-folklore-amber transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-folklore-amber transition-colors">
                  Oral Tradition Ethics
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-folklore-amber transition-colors">
                  Patron Guilds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-300/70 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Inkoma Tales. Dedicated to the eternal storytellers of Africa.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-folklore-terracotta fill-current" /> for storytellers worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
