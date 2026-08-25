import Link from "next/link";
import Image from "next/image";
import { Heart, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 bg-[#F3EEE7] dark:bg-stone-950 text-stone-600 dark:text-stone-400 transition-colors">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-stone-900 p-1 border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden">
                <Image
                  src="/images/inkoma-logo.png"
                  alt="Inkoma Logo"
                  width={52}
                  height={52}
                  className="object-contain h-full w-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Inkoma
              </span>
            </div>
            <p className="max-w-sm text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              A global storytelling platform connecting readers and writers across Romance, Fantasy, Thrillers, Sci-Fi, Mystery, Folklore, and interactive fiction.
            </p>
            <div className="flex items-center space-x-3 text-xs text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1 text-[#680C07] dark:text-red-400 font-semibold">
                <Globe className="h-3.5 w-3.5" />
                Global Storytelling Network
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-3">
              Explore Genres
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/explore?genre=Romance" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/explore?genre=Fantasy" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link href="/explore?genre=Thriller" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Thriller & Mystery
                </Link>
              </li>
              <li>
                <Link href="/explore?genre=Folklore" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Folklore & Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Creators & Studio */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-3">
              For Writers
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/studio" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Writer Studio
                </Link>
              </li>
              <li>
                <Link href="/studio/new" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Create New Story
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Author Support & Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  About INKOMA
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#680C07] dark:hover:text-red-400 transition-colors">
                  Writer Memberships
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-300/70 dark:border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} INKOMA. Empowering readers and writers worldwide.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-red-600 fill-current" /> for storytellers everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
