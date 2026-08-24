"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  Download,
} from "lucide-react";
import { platformSidebarNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(false);

  const iconMap: Record<string, React.ReactNode> = {
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
        "sticky top-20 hidden h-[calc(100vh-5rem)] flex-col border-r border-stone-200/80 bg-[#FAF8F5]/95 p-4 transition-all duration-300 md:flex z-30 shrink-0",
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
        <Link href="/studio">
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-xl bg-[#680C07] hover:bg-[#520905] text-white font-semibold shadow-md hover:scale-[1.02] transition-all py-2.5",
              isCollapsed ? "px-2" : "gap-2 px-4 text-sm"
            )}
            title="Forge New Tale"
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Forge New Tale</span>}
          </button>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 w-full flex-1">
        {!isCollapsed && (
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Storyteller Ecosystem
          </p>
        )}

        <div className="mt-2 space-y-1">
          {platformSidebarNav.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className={cn(
                  "flex items-center rounded-xl transition-all",
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 font-semibold shadow-xs"
                    : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
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

      {/* PWA App Footer & Wisdom */}
      {!isCollapsed && (
        <div className="mt-auto pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-[#680C07]" />
              <span>Folklore Wisdom</span>
            </div>
            <Badge className="bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 text-[9px] py-0 px-1 font-bold">
              PWA Ready
            </Badge>
          </div>
          <p className="italic text-stone-600 text-[11px] leading-relaxed">
            &ldquo;Until the lion learns how to speak, every story will glorify the hunter.&rdquo;
          </p>
        </div>
      )}
    </aside>
  );
}
