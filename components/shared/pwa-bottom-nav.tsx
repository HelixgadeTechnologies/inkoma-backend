"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, BookOpen, Feather, User, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

export function PwaBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Library", href: "/library", icon: BookOpen },
    { label: "Studio", href: "/studio", icon: Feather },
    { label: "Profile", href: "/profile/kwame_asante", icon: User },
    { label: "Settings", href: "/settings", icon: Sliders },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-stone-200/90 bg-[#FAF8F5]/95 backdrop-blur-xl py-2 px-1 md:hidden shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded-xl transition-all",
              isActive
                ? "text-[#680C07] font-bold"
                : "text-stone-500 hover:text-stone-900 font-medium"
            )}
          >
            <div
              className={cn(
                "p-1 rounded-xl transition-all",
                isActive ? "bg-[#680C07]/10" : "bg-transparent"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-[#680C07]" : "text-stone-500")} />
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
