'use client';

import * as React from "react";
import { Search, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar({ placeholder = "Search myths, trickster tales, or traditions..." }: { placeholder?: string }) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-folklore-night/70 pl-10 pr-12 py-2 text-sm text-foreground placeholder:text-neutral-500 focus:border-folklore-amber focus:outline-none focus:ring-1 focus:ring-folklore-amber transition-all"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-400">
        <Command className="h-2.5 w-2.5" />
        <span>K</span>
      </div>
    </form>
  );
}
