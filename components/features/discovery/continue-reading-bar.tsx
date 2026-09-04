"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Play, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/hooks/useLibrary";
import { useAuth } from "@/hooks/useAuth";

export function ContinueReadingBar() {
  const { continueReading, isLoaded } = useLibrary();
  const { user } = useAuth();

  // Do not render Continue Reading for unregistered / logged out guest users
  if (!user || !isLoaded || !continueReading || continueReading.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-serif">Continue Reading</h2>
            <p className="text-xs text-stone-500">Pick up right where your last choice ended</p>
          </div>
        </div>
        <Link
          href="/library"
          className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
        >
          View Library <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {continueReading.slice(0, 2).map((item) => (
          <Link
            key={item.storyId}
            href={`/story/${item.storyId}`}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/40 transition-all group"
          >
            <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
              <Image
                src={item.coverImage}
                alt={item.storyTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                Chapter {item.lastChapterNumber}
              </span>
              <h3 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                {item.storyTitle}
              </h3>
              <p className="text-xs text-stone-500 truncate">
                by {item.authorPenName}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" /> {item.lastReadAt}
                  </span>
                  <span className="font-semibold text-stone-700">{item.progressPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full"
                    style={{ width: `${item.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Resume navigates directly to /read — stops the outer Link firing */}
            <Link
              href={`/story/${item.storyId}/read`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold rounded-xl shadow-xs shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-stone-950 mr-1" />
                Resume
              </Button>
            </Link>
          </Link>
        ))}
      </div>
    </section>
  );
}
