'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  Heart,
  HelpCircle,
  MessageSquare,
  Settings,
  Globe,
  ChevronRight,
  UserPlus,
  LogIn,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { marketingNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const PROTECTED_HREFS = ["/explore", "/library", "/studio", "/profile", "/settings"];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, profile, signOut } = useAuth();
  const profileHref = profile?.username ? `/profile/${profile.username}` : "/profile";

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
      href: "/help",
    },
    {
      icon: MessageSquare,
      label: "Community Discussion",
      href: "/community",
    },
  ];

  const visibleNav = marketingNav.filter((item) => {
    if (isAuthenticated) {
      // Authenticated users: hide the Home page link
      return item.href !== "/";
    }
    // Guest users: hide Explore, Library, Studio, Profile
    return !PROTECTED_HREFS.some((p) => item.href.startsWith(p));
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Brand Logo - Routes to /explore when logged in, or / for guests */}
        <Link href={isAuthenticated ? "/explore" : "/"} className="flex items-center space-x-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37] text-stone-950 p-2 shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-[#B8860B] transition-colors leading-none">
              INKOMA
            </span>
            <span className="text-[11px] tracking-wider text-[#B8860B] font-medium mt-0.5">
              Stories. Everywhere.
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {visibleNav.map((item) => {
            const targetHref = item.href === "/profile" ? profileHref : item.href;
            const isActive =
              targetHref === "/"
                ? pathname === "/"
                : pathname.startsWith(targetHref);
            return (
              <Link
                key={item.href}
                href={targetHref}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "text-[#B8860B] bg-[#D4AF37]/15"
                    : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + Support + Auth Actions + Hamburger */}
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
              <span className="inline text-xs font-semibold">Support</span>
            </Button>
          </Link>

          {/* Quick Sign In / User Profile on Desktop */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center space-x-1.5">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-bold text-stone-700 hover:text-stone-950 px-3 rounded-full"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 text-xs font-bold px-3.5 rounded-full shadow-xs gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Link
              href={profileHref}
              className="flex items-center gap-2 p-1 md:pl-1 md:pr-2.5 rounded-full hover:bg-stone-100 transition-all border border-stone-200/80 shadow-xs cursor-pointer group active:scale-95"
              title="View your profile"
              aria-label="View your storyteller profile"
            >
              {profile?.avatarUrl ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37] relative shrink-0">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.displayName || "Profile"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-xs font-extrabold text-[#B8860B] shrink-0">
                  {profile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || (
                    <UserIcon className="w-4 h-4 text-[#B8860B]" />
                  )}
                </div>
              )}
              <span className="hidden md:inline text-xs font-bold text-stone-800 group-hover:text-[#B8860B] transition-colors truncate max-w-[120px]">
                {profile?.displayName || "Profile"}
              </span>
            </Link>
          )}

          {/* Hamburger — anchors the dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl transition-all",
                menuOpen
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-100"
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
                  "bg-white border border-stone-200 shadow-2xl z-50",
                  "animate-in fade-in slide-in-from-top-2 duration-150"
                )}
              >
                {/* Authenticated User Header */}
                {isAuthenticated && (
                  <Link
                    href={profileHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-stone-50 hover:bg-stone-100 border-b border-stone-200 transition-colors cursor-pointer group"
                    title="View your profile"
                  >
                    {profile?.avatarUrl ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] relative shrink-0">
                        <Image
                          src={profile.avatarUrl}
                          alt={profile.displayName || "Profile"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-xs font-extrabold text-[#B8860B] shrink-0">
                        {profile?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "S"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors truncate">
                        {profile?.displayName || "Storyteller"}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">
                        @{profile?.username || (user?.email ? user.email.split("@")[0] : "storyteller")}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#B8860B] transition-colors shrink-0" />
                  </Link>
                )}

                {/* Main Links */}
                <div className="py-1.5">
                  {isAuthenticated && (
                    <Link
                      href={profileHref}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#B8860B] shrink-0" />
                      Storyteller Profile
                    </Link>
                  )}

                  {menuItems.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-stone-400 shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-stone-200" />

                {/* Settings & Language */}
                <div className="py-1.5">
                  {isAuthenticated && (
                    <Link
                      href="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-stone-400 shrink-0" />
                      Settings
                    </Link>
                  )}

                  {/* Language */}
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors">
                    <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="flex-1 text-left">Language</span>
                    <span className="text-[#D4AF37] text-xs font-semibold flex items-center gap-0.5">
                      English
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-stone-200" />

                {/* Auth Actions */}
                <div className="p-3">
                  {!isAuthenticated ? (
                    <div className="space-y-2">
                      <Link href="/signup" onClick={() => setMenuOpen(false)} className="block w-full">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 text-xs font-bold transition-colors">
                          <UserPlus className="w-4 h-4" />
                          Sign Up
                        </button>
                      </Link>
                      <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors">
                          <LogIn className="w-4 h-4" />
                          Log In
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await signOut();
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
