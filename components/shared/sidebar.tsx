"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Feather,
  Users,
  User,
  PlusCircle,
  Sparkles,
  BookOpen,
  Sliders,
  HelpCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { platformSidebarNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" />,
    Compass: <Compass className="h-4 w-4" />,
    Bell: <Bell className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
    Feather: <Feather className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
    User: <User className="h-4 w-4" />,
    Sliders: <Sliders className="h-4 w-4" />,
    HelpCircle: <HelpCircle className="h-4 w-4" />,
  };

  return (
    <aside
      className={cn(
        "sticky top-20 hidden h-[calc(100vh-5rem)] flex-col border-r border-stone-200/80 dark:border-stone-800 bg-[#FAF8F5]/95 dark:bg-stone-950/95 p-4 transition-all duration-300 md:flex z-30 shrink-0",
        isCollapsed ? "w-20 items-center px-2" : "w-64"
      )}
    >
      {/* Collapse / Expand Rail Toggle */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 shadow-md hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-all"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Quick Action Button */}
      <div className="mb-6 w-full">
        <Link href="/studio/new">
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-xl bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold shadow-md hover:scale-[1.02] transition-all py-2.5",
              isCollapsed ? "px-2" : "gap-2 px-4 text-sm"
            )}
            title="Create Story"
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Create Story</span>}
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 w-full flex-1">
        {!isCollapsed && (
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Navigation
          </p>
        )}

        <div className="mt-2 space-y-1">
          {platformSidebarNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className={cn(
                  "flex items-center rounded-xl transition-all",
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5 text-sm font-medium",
                  isActive
                    ? "bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30 font-bold shadow-xs"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-950 dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && iconMap[item.icon]}
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <Badge className="bg-[#680C07] text-white text-[10px] py-0 px-1.5 border-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* App Footer Quote */}
      {!isCollapsed && (
        <div className="mt-auto pt-4 border-t border-stone-200/80 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
              <Sparkles className="h-3.5 w-3.5 text-[#680C07] dark:text-red-400" />
              <span>Inkoma Wisdom</span>
            </div>
            <Badge className="bg-[#680C07]/10 dark:bg-red-500/20 text-[#680C07] dark:text-red-400 border border-[#680C07]/20 dark:border-red-500/30 text-[9px] py-0 px-1 font-bold">
              PWA Ready
            </Badge>
          </div>
          <p className="italic text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
            &ldquo;Great stories connect minds, build bridges, and live forever across time.&rdquo;
          </p>
        </div>
      )}
    </aside>
  );
}
