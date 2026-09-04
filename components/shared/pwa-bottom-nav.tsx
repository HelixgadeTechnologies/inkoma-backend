"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, Feather, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function PwaBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Library", href: "/library", icon: BookOpen },
    { label: "Studio", href: "/studio", icon: Feather },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md py-2 px-2 shadow-lg transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center space-y-1 px-3 py-1 rounded-xl transition-all",
              isActive
                ? "text-[#B8860B] font-bold"
                : "text-stone-600 hover:text-stone-900 font-medium"
            )}
          >
            <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-[#B8860B]" : "text-stone-500")} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
            {isActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#B8860B] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
