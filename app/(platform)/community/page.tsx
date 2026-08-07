'use client';

import * as React from "react";
import { Users, PlusCircle, Sparkles, MessageSquare, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiscussionCard } from "@/components/features/community/discussion-card";
import { CommunityDiscussion } from "@/types";

const MOCK_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: "disc-1",
    title: "Why did Anansi not share the calabash wisdom with his wife Aso first?",
    content: "In many Ashanti variations, Aso is portrayed as the wiser strategist who bails Anansi out of his troubles with the sky god. How does this dynamic change when readers choose the humble branch?",
    authorId: "user-amina-02",
    authorName: "Amina Diallo",
    traditionCategory: "Ashanti/Akan",
    tags: ["Anansi", "CharacterAnalysis", "FolkloreEthics"],
    repliesCount: 24,
    upvotesCount: 89,
    createdAt: "2026-03-01",
    isPinned: true,
  },
  {
    id: "disc-2",
    title: "Comparing the Trickster motifs: Anansi the Spider vs. Ijapa the Tortoise",
    content: "Both the Akan and Yoruba storytelling hubs celebrate clever tricksters who rely on intellect over physical power. What are the key philosophical divergences in how pride is punished?",
    authorId: "user-adebayo-03",
    authorName: "Chief Adebayo",
    traditionCategory: "Yoruba",
    tags: ["Yoruba", "Ashanti", "ComparativeMythology"],
    repliesCount: 16,
    upvotesCount: 62,
    createdAt: "2026-03-03",
  },
  {
    id: "disc-3",
    title: "Dogon Astronomical Knowledge encoded in Oral Sirius Poetry",
    content: "Has anyone tried weaving a speculative Afrofuturist branch tracking the Sigui ceremony cycles? Looking for collaborators for a multi-author tale.",
    authorId: "user-oumar-04",
    authorName: "Oumar Sangare",
    traditionCategory: "Dogon",
    tags: ["Dogon", "Afrofuturism", "CollabTree"],
    repliesCount: 9,
    upvotesCount: 41,
    createdAt: "2026-03-04",
  },
];

export default function CommunityPage() {
  const [discussions, setDiscussions] = React.useState<CommunityDiscussion[]>(MOCK_DISCUSSIONS);
  const [newTitle, setNewTitle] = React.useState("");
  const [newContent, setNewContent] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDisc: CommunityDiscussion = {
      id: `disc-${Date.now()}`,
      title: newTitle,
      content: newContent,
      authorId: "user-kwame-01",
      authorName: "Kwame Asante",
      traditionCategory: "Pan-African",
      tags: ["LoreCommunity", "Discussion"],
      repliesCount: 0,
      upvotesCount: 1,
      createdAt: new Date().toISOString(),
    };

    setDiscussions([newDisc, ...discussions]);
    setNewTitle("");
    setNewContent("");
    setIsPosting(false);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 border border-[#680C07]/20 text-[#680C07] text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#680C07]" />
            <span>Lore & Storyteller Agora</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-stone-900">Community Discussion</h1>
          <p className="text-sm text-stone-600 mt-1">
            Debate folklore morals, discuss alternate endings, and collaborate on collaborative story webs.
          </p>
        </div>

        <Button
          variant="folklore"
          size="sm"
          onClick={() => setIsPosting(!isPosting)}
          className="gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Discussion</span>
        </Button>
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
              className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
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
            <Button type="submit" variant="folklore" size="sm">
              Post to Lore Agora
            </Button>
          </div>
        </form>
      )}

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.map((disc) => (
          <DiscussionCard key={disc.id} discussion={disc} />
        ))}
      </div>
    </div>
  );
}
