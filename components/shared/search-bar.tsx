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
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-stone-300 bg-white pl-10 pr-12 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-folklore-amber focus:outline-none focus:ring-2 focus:ring-folklore-amber/30 transition-all shadow-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-stone-200 bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500 font-medium">
        <Command className="h-2.5 w-2.5" />
        <span>K</span>
      </div>
    </form>
  );
}
