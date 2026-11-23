'use client';

import * as React from "react";
import { Users, PlusCircle, Sparkles, MessageSquare, Flame, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiscussionCard } from "@/components/features/community/discussion-card";
import { useAuth } from "@/hooks/useAuth";
import {
  getDiscussions,
  createDiscussion,
  DetailedDiscussion,
} from "@/src/services/communityService";

const TRADITIONS = [
  "All",
  "Yoruba",
  "Ashanti/Akan",
  "Zulu",
  "Dogon",
  "Swahili",
  "Pan-African",
];

export default function CommunityPage() {
  const { user, profile } = useAuth();
  const [discussions, setDiscussions] = React.useState<DetailedDiscussion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [newTitle, setNewTitle] = React.useState("");
  const [newContent, setNewContent] = React.useState("");
  const [selectedTradition, setSelectedTradition] = React.useState("All");
  const [newTradition, setNewTradition] = React.useState("Pan-African");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"recent" | "popular">("recent");
  const [isPosting, setIsPosting] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const fetchDiscussions = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDiscussions({
        tradition: selectedTradition,
        search: searchQuery.trim() || undefined,
        sortBy,
      });
      setDiscussions(data);
    } catch (err) {
      console.warn("[CommunityPage] Error loading discussions:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedTradition, searchQuery, sortBy]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      fetchDiscussions();
    }, 250);
    return () => clearTimeout(handler);
  }, [fetchDiscussions]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setSubmitting(true);
    try {
      const created = await createDiscussion({
        title: newTitle.trim(),
        content: newContent.trim(),
        tradition: newTradition || profile?.traditionSpecialty || "Pan-African",
        tags: ["LoreCommunity", "Discussion"],
      });

      if (created) {
        setDiscussions([created, ...discussions]);
        setNewTitle("");
        setNewContent("");
        setIsPosting(false);
      }
    } catch (err) {
      console.error("Failed to post discussion:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Lore & Storyteller Agora</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-stone-900">Community Discussion</h1>
          <p className="text-sm text-stone-600 mt-1">
            Debate folklore morals, discuss alternate endings, and collaborate on collective story webs.
          </p>
        </div>

        <Button
          variant="folklore"
          size="sm"
          onClick={() => setIsPosting(!isPosting)}
          className="gap-1.5 self-start sm:self-auto bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Discussion</span>
        </Button>
      </div>

      {/* Controls: Search, Sort & Tradition Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lore inquiries..."
              className="pl-9 h-9 text-xs border-stone-200"
            />
          </div>

          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => setSortBy("recent")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                sortBy === "recent"
                  ? "bg-white text-stone-900 shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={() => setSortBy("popular")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                sortBy === "popular"
                  ? "bg-white text-stone-900 shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Popular
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {TRADITIONS.map((trad) => (
            <button
              key={trad}
              onClick={() => setSelectedTradition(trad)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTradition === trad
                  ? "bg-[#D4AF37] text-stone-950 font-bold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
              }`}
            >
              {trad}
            </button>
          ))}
        </div>
      </div>

      {/* New Discussion Composer */}
      {isPosting && (
        <form
          onSubmit={handleCreatePost}
          className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm animate-in slide-in-from-top-2"
        >
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Start a Lore Inquiry or Debate
          </h3>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Tradition Category</label>
            <select
              value={newTradition}
              onChange={(e) => setNewTradition(e.target.value)}
              className="w-full h-9 rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {TRADITIONS.filter((t) => t !== "All").map((trad) => (
                <option key={trad} value={trad}>
                  {trad}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Discussion Subject</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. What moral lessons are hidden within the 3rd branch of Sundiata?"
              className="bg-white border-stone-200 text-stone-900"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Inquiry Details</label>
            <textarea
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share your interpretations and invite the community to respond..."
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsPosting(false)}
              className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={submitting}
              className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold"
            >
              {submitting ? "Posting..." : "Post to Lore Agora"}
            </Button>
          </div>
        </form>
      )}

      {/* Discussion List */}
      {loading && discussions.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-stone-100 animate-pulse border border-stone-200"
            />
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 font-serif">No community discussions yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Be the first storyteller to start an inquiry or share an ancestral interpretation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {discussions.map((disc) => (
            <DiscussionCard key={disc.id} discussion={disc} />
          ))}
        </div>
      )}
    </div>
  );
}
