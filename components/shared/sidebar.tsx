'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Feather, Users, User, Bookmark, PlusCircle, Sparkles, BookOpen, Flame } from "lucide-react";
import { platformSidebarNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const pathname = usePathname();

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="h-4 w-4" />,
    Feather: <Feather className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
    User: <User className="h-4 w-4" />,
  };

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-folklore-amber/15 bg-folklore-obsidian/90 p-4 lg:flex">
      {/* Quick Action */}
      <div className="mb-6">
        <Link href="/studio/new">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-folklore-terracotta to-folklore-amber px-4 py-2.5 text-sm font-semibold text-folklore-night shadow-md hover:shadow-folklore-amber/20 hover:scale-[1.02] transition-all">
            <PlusCircle className="h-4 w-4" />
            <span>Forge New Tale</span>
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
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
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-folklore-amber/15 text-folklore-gold border border-folklore-amber/30"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && iconMap[item.icon]}
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant="amber" className="text-[10px] py-0 px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Folklore Traditions Quick Filter */}
      <div className="mt-8 space-y-2">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          Mythos Lineages
        </p>
        <div className="space-y-1 text-xs text-neutral-400">
          {[
            { name: "Ashanti Spider Lore", count: "24", slug: "ashanti" },
            { name: "Yoruba Orisha Pantheons", count: "19", slug: "yoruba" },
            { name: "Zulu Warrior Epics", count: "15", slug: "zulu" },
            { name: "Dogon Star Cosmologies", count: "8", slug: "dogon" },
          ].map((myth) => (
            <Link
              key={myth.slug}
              href={`/explore?tradition=${myth.slug}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5 hover:text-folklore-gold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-folklore-terracotta" />
                <span>{myth.name}</span>
              </div>
              <span className="text-[10px] text-neutral-400">{myth.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Griot Wisdom */}
      <div className="mt-auto rounded-xl border border-folklore-amber/20 bg-folklore-night/60 p-3.5 text-xs text-neutral-300">
        <div className="flex items-center gap-1.5 text-folklore-gold font-semibold mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Griot Wisdom</span>
        </div>
        <p className="italic text-neutral-400 text-[11px] leading-relaxed">
          &quot;Wisdom is like a baobab tree; no one person&apos;s arms can embrace it all.&quot;
        </p>
      </div>
    </aside>
  );
}
