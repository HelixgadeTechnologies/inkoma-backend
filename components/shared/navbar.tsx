'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  Heart,
  Moon,
  Sun,
  HelpCircle,
  BookMarked,
  Mail,
  Settings,
  Globe,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { marketingNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isDark, toggle: toggleDark } = useTheme();
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const menuItems = [
    {
      icon: HelpCircle,
      label: "Help Center",
      href: "/support",
    },
    {
      icon: BookMarked,
      label: "Community Guidelines",
      href: "/community",
    },
    {
      icon: Mail,
      label: "Contact Us",
      href: "/support",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-700/80 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37] text-stone-950 p-2 shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-[#B8860B] transition-colors leading-none">
              INKOMA
            </span>
            <span className="text-[11px] tracking-wider text-[#B8860B] font-medium mt-0.5">
              Stories. Everywhere.
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {marketingNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "text-[#B8860B] bg-[#D4AF37]/15"
                    : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + Support + Hamburger */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden lg:block w-48">
            <SearchBar />
          </div>

          <Link href="/support">
            <Button
              variant="outline"
              size="sm"
              className="border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/15 hover:text-[#B8860B] rounded-full px-4 font-semibold gap-1.5 bg-transparent"
            >
              <Heart className="h-4 w-4 fill-none text-[#B8860B]" />
              <span className="hidden sm:inline">Support</span>
            </Button>
          </Link>

          {/* Hamburger — anchors the dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl transition-all",
                menuOpen
                  ? "bg-stone-900 dark:bg-stone-700 text-white"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              )}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* ── Floating Dropdown Panel ── */}
            {menuOpen && (
              <div
                className={cn(
                  "absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl overflow-hidden",
                  "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl",
                  "animate-in fade-in slide-in-from-top-2 duration-150"
                )}
              >
                {/* Dark Mode row */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-200 dark:border-stone-700">
                  <div className="flex items-center gap-3">
                    {isDark
                      ? <Sun className="text-[#D4AF37]" style={{ width: 18, height: 18 }} />
                      : <Moon className="text-stone-500" style={{ width: 18, height: 18 }} />
                    }
                    <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {isDark ? "Light Mode" : "Dark Mode"}
                    </span>
                  </div>
                  {/* Toggle pill */}
                  <button
                    role="switch"
                    aria-checked={isDark}
                    onClick={toggleDark}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200",
                      isDark ? "bg-[#D4AF37]" : "bg-stone-300"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200",
                        isDark ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Middle links */}
                <div className="py-1.5">
                  {menuItems.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-stone-400 shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-stone-200 dark:border-stone-700" />

                {/* Settings */}
                <div className="py-1.5">
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-stone-400 shrink-0" />
                    Settings
                  </Link>

                  {/* Language */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                    <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="flex-1 text-left">Language</span>
                    <span className="text-[#D4AF37] text-xs font-semibold flex items-center gap-0.5">
                      English
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-stone-200 dark:border-stone-700" />

                {/* Sign Up CTA */}
                <div className="p-3">
                  <Link href="/signup" onClick={() => setMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 text-sm font-bold transition-colors">
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
