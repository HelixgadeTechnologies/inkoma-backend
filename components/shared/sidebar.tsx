'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Feather,
  Users,
  User,
  Bookmark,
  PlusCircle,
  Sparkles,
  BookOpen,
  Flame,
  Sliders,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { platformSidebarNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const pathname = usePathname();

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
    Feather: <Feather className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
    User: <User className="h-4 w-4" />,
    Sliders: <Sliders className="h-4 w-4" />,
    HelpCircle: <HelpCircle className="h-4 w-4" />,
    ShieldAlert: <ShieldAlert className="h-4 w-4" />,
  };

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-stone-200/80 bg-[#FAF8F5]/95 p-4 lg:flex">
      {/* Quick Action */}
      <div className="mb-6">
        <Link href="/studio">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all">
            <PlusCircle className="h-4 w-4" />
            <span>Forge New Tale</span>
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          Storyteller Ecosystem
        </p>
        <div className="mt-2 space-y-1">
          {platformSidebarNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-100 text-amber-900 border border-amber-300 font-semibold shadow-xs"
                    : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && iconMap[item.icon]}
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-amber-600 text-white text-[10px] py-0 px-1.5 border-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Folklore Traditions Quick Filter */}
      <div className="mt-6 space-y-2">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          Mythos Lineages
        </p>
        <div className="space-y-1 text-xs text-stone-700">
          {[
            { name: "Ashanti Spider Lore", count: "24", slug: "Ashanti/Akan" },
            { name: "Yoruba Orisha Pantheons", count: "19", slug: "Yoruba" },
            { name: "Zulu Warrior Epics", count: "15", slug: "Zulu" },
            { name: "Dogon Star Cosmologies", count: "8", slug: "Dogon" },
          ].map((myth) => (
            <Link
              key={myth.slug}
              href={`/explore?tradition=${encodeURIComponent(myth.slug)}`}
              className="flex items-center justify-between rounded-lg px-3 py-1.5 hover:bg-stone-100 hover:text-amber-800 transition-colors font-medium"
            >
              <div className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-amber-600" />
                <span>{myth.name}</span>
              </div>
              <span className="text-[10px] text-stone-400">{myth.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Griot Wisdom */}
      <div className="mt-auto rounded-xl border border-amber-200/80 bg-amber-50/90 p-3.5 text-xs text-stone-700 shadow-xs">
        <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Griot Wisdom</span>
        </div>
        <p className="italic text-stone-600 text-[11px] leading-relaxed">
          &ldquo;Until the lion learns how to speak, every story will glorify the hunter.&rdquo;
        </p>
      </div>
    </aside>
  );
}
