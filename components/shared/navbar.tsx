'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Feather, Compass, Users, Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { marketingNav } from "@/config/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#680C07] p-2 text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 group-hover:text-[#680C07] transition-colors">
              Inkoma
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#680C07] font-semibold -mt-1">
              Tales Hub
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {marketingNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-[#680C07] bg-[#680C07]/10 font-semibold"
                    : "text-stone-700 hover:text-stone-950 hover:bg-stone-100"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Search & Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="w-56 lg:w-64">
            <SearchBar />
          </div>
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-stone-800 hover:text-stone-950">
              Sign In
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="folklore" size="sm" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              Read Stories
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-stone-800 hover:text-stone-950"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-stone-200 bg-[#FAF8F5] px-4 py-4 md:hidden animate-in slide-in-from-top-2">
          <div className="mb-4">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-2">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-100 hover:text-folklore-amber font-medium"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-2 border-t border-stone-200 flex gap-2">
              <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="folklore" className="w-full">Join Hub</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
