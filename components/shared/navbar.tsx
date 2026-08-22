'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Feather, Compass, Users, Menu, X, BookOpen, Bell } from "lucide-react";
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
      <div className="flex h-20 w-full items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1 border border-stone-200 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src="/images/inkoma-logo.png"
              alt="Inkoma Logo"
              width={54}
              height={54}
              className="object-contain h-full w-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-[#680C07] transition-colors">
              Inkoma
            </span>
            <span className="text-[11px] tracking-widest uppercase text-[#680C07] font-semibold -mt-1">
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
          <Link
            href="/notifications"
            title="Notifications"
            className="relative p-2 text-stone-700 hover:text-[#680C07] transition-colors rounded-xl hover:bg-stone-100/80"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#680C07] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#680C07]"></span>
            </span>
          </Link>
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
