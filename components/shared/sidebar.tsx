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
        "sticky top-20 hidden h-[calc(100vh-5rem)] flex-col border-r border-stone-200 bg-[#FFFFFF] p-4 transition-all duration-300 md:flex z-30 shrink-0 shadow-xs",
        isCollapsed ? "w-20 items-center px-2" : "w-64"
      )}
    >
      {/* Collapse / Expand Rail Toggle */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-md hover:bg-stone-100 hover:text-stone-900 transition-all"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Quick Action Button */}
      <div className="mb-6 w-full">
        <Link href="/studio/new">
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-xl bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold shadow-md hover:scale-[1.02] transition-all py-2.5",
              isCollapsed ? "px-2" : "gap-2 px-4 text-sm"
            )}
            title="Create Story"
          >
            <PlusCircle className="h-4 w-4 shrink-0 text-stone-950" />
            {!isCollapsed && <span>Create Story</span>}
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 w-full flex-1">
        {!isCollapsed && (
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
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
                    ? "bg-[#D4AF37]/15 text-[#B8860B] border border-[#D4AF37]/30 font-bold shadow-xs"
                    : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && iconMap[item.icon]}
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <Badge className="bg-[#D4AF37] text-stone-950 text-[10px] py-0 px-1.5 border-0 font-bold">
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
        <div className="mt-auto pt-4 border-t border-stone-200 text-[11px] text-stone-500 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
              <span>Inkoma Wisdom</span>
            </div>
            <Badge className="bg-[#D4AF37]/15 text-[#B8860B] border border-[#D4AF37]/30 text-[9px] py-0 px-1 font-bold">
              PWA Ready
            </Badge>
          </div>
          <p className="italic text-stone-600 text-[11px] leading-relaxed">
            &ldquo;Great stories connect minds, build bridges, and live forever across time.&rdquo;
          </p>
        </div>
      )}
    </aside>
  );
}
