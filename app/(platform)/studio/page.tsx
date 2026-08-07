"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Story, StoryChapter, StoryStatus, Tradition } from "@/types";
import { MOCK_STORIES, MOCK_CURRENT_USER } from "@/config/mock-data";
import {
  Flame,
  Plus,
  BookOpen,
  Eye,
  Heart,
  MessageSquare,
  DollarSign,
  Edit,
  Trash2,
  Sparkles,
  GitFork,
  MoreVertical,
  CheckCircle2,
  FileText,
  Sliders,
  TrendingUp,
  X,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function StudioPage() {
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
  const [showCreateChapterModal, setShowCreateChapterModal] = useState(false);
  const [selectedStoryForChapter, setSelectedStoryForChapter] = useState<Story | null>(null);
  const [storyToDeleteId, setStoryToDeleteId] = useState<string | null>(null);

  // New Story Form State
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newGenre, setNewGenre] = useState("Trickster Lore");
  const [newTradition, setNewTradition] = useState<Tradition>("Ashanti/Akan");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newCoverUrl, setNewCoverUrl] = useState(
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
  );
  const [newStatus, setNewStatus] = useState<StoryStatus>("ongoing");

  // New Chapter Form State
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterSummary, setNewChapterSummary] = useState("");
  const [newChapterReadTime, setNewChapterReadTime] = useState(5);

  // Calculate Metrics
  const totalStories = stories.length;
  const totalChapters = stories.reduce((acc, s) => acc + (s.totalChapters || 1), 0);
  const totalReads = stories.reduce((acc, s) => acc + s.readsCount, 0);
  const totalLikes = stories.reduce((acc, s) => acc + s.likesCount, 0);
  const totalComments = stories.reduce((acc, s) => acc + s.commentsCount, 0);
  const totalTips = MOCK_CURRENT_USER.supportDetails?.totalTipsReceived || 1250;

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStory: Story = {
      id: `story-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newTitle,
      subtitle: newSubtitle,
      synopsis: newSynopsis || "A brand new oral account preserved in the circle.",
      authorId: MOCK_CURRENT_USER.id,
      authorName: MOCK_CURRENT_USER.displayName,
      authorPenName: MOCK_CURRENT_USER.penName || MOCK_CURRENT_USER.displayName,
      authorAvatar: MOCK_CURRENT_USER.avatarUrl,
      authorBio: MOCK_CURRENT_USER.bio,
      coverImage: newCoverUrl,
      tradition: newTradition,
      mainGenre: newGenre,
      subGenres: ["Folklore", "Mythology"],
      tags: ["oral-tradition", "living-lore"],
      difficulty: "Beginner",
      status: newStatus,
      readsCount: 0,
      likesCount: 0,
      bookmarksCount: 0,
      commentsCount: 0,
      totalChapters: 1,
      totalBranches: 2,
      estimatedReadTime: 6,
      hasAudioNarration: false,
      isInteractive: true,
      publishedAt: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      rootNodeId: "node-1",
      chapters: [
        {
          id: `chap-${Date.now()}-1`,
          number: 1,
          title: "Chapter 1: The Threshold",
          summary: newSynopsis,
          readTimeMinutes: 5,
          status: "draft",
          likesCount: 0,
          commentsCount: 0,
          rootNodeId: "node-1",
          updatedAt: new Date().toISOString().split("T")[0],
          nodes: {
            "node-1": {
              id: "node-1",
              title: "The Threshold",
              content: "Write the opening lines of your tale here...",
              choices: [],
            },
          },
        },
      ],
    };

    setStories([newStory, ...stories]);
    setShowCreateStoryModal(false);
    // Reset fields
    setNewTitle("");
    setNewSubtitle("");
    setNewSynopsis("");
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStoryForChapter || !newChapterTitle.trim()) return;

    const nextChapNum = (selectedStoryForChapter.chapters?.length || 0) + 1;
    const newChap: StoryChapter = {
      id: `chap-${Date.now()}`,
      number: nextChapNum,
      title: `Chapter ${nextChapNum}: ${newChapterTitle}`,
      summary: newChapterSummary,
      readTimeMinutes: Number(newChapterReadTime) || 5,
      status: "draft",
      likesCount: 0,
      commentsCount: 0,
      rootNodeId: "node-1",
      updatedAt: new Date().toISOString().split("T")[0],
      nodes: {
        "node-1": {
          id: "node-1",
          title: newChapterTitle,
          content: "Draft your chapter choices and dialogue...",
          choices: [],
        },
      },
    };

    setStories((prev) =>
      prev.map((s) => {
        if (s.id === selectedStoryForChapter.id) {
          const updatedChapters = [...(s.chapters || []), newChap];
          return {
            ...s,
            totalChapters: updatedChapters.length,
            chapters: updatedChapters,
          };
        }
        return s;
      })
    );

    setShowCreateChapterModal(false);
    setNewChapterTitle("");
    setNewChapterSummary("");
  };

  const confirmDeleteStory = () => {
    if (storyToDeleteId) {
      setStories((prev) => prev.filter((s) => s.id !== storyToDeleteId));
      setStoryToDeleteId(null);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 border border-[#680C07]/20 text-[#680C07] text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#680C07]" />
            Author Studio
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
            Writer Dashboard
          </h1>
          <p className="text-sm text-stone-600">
            Pen new oral accounts, build branching choice webs, and monitor community engagement.
          </p>
        </div>

        <Link href="/studio/new">
          <Button
            className="bg-[#680C07] hover:bg-[#520905] text-white font-bold px-6 py-5 rounded-2xl shadow-md gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create New Story
          </Button>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Stories</span>
            <BookOpen className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">{totalStories}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> Published
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Chapters</span>
            <FileText className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">{totalChapters}</p>
          <span className="text-[10px] text-stone-400">Total episodes</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Total Reads</span>
            <Eye className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">
            {(totalReads / 1000).toFixed(1)}k
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
            +18% this mo
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Likes</span>
            <Heart className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">{totalLikes}</p>
          <span className="text-[10px] text-stone-400">Reader hearts</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Discussions</span>
            <MessageSquare className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">{totalComments}</p>
          <span className="text-[10px] text-stone-400">Reflections</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Patron Support</span>
            <DollarSign className="w-4 h-4 text-[#680C07]" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-serif">${totalTips}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
            Paystack direct
          </span>
        </div>
      </div>

      {/* Story Manuscripts List */}
      <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Your Manuscripts ({stories.length})
          </h2>
          <span className="text-xs text-stone-400">Click &ldquo;Add Chapter&rdquo; to expand branches</span>
        </div>

        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all"
            >
              {/* Cover & Title */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                  <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 text-[10px]">
                      {story.tradition}
                    </Badge>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        story.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20"
                      }`}
                    >
                      {story.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 truncate font-serif">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span>{story.totalChapters} chapters</span>
                    <span>•</span>
                    <span>{story.readsCount} reads</span>
                    <span>•</span>
                    <span>{story.likesCount} likes</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedStoryForChapter(story);
                    setShowCreateChapterModal(true);
                  }}
                  className="bg-white border-stone-300 text-stone-700 text-xs rounded-xl hover:bg-stone-100"
                >
                  <Plus className="w-3.5 h-3.5 mr-1 text-[#680C07]" /> Add Chapter
                </Button>

                <Link href={`/story/${story.id}`}>
                  <Button size="sm" variant="outline" className="bg-white border-stone-300 text-stone-700 text-xs rounded-xl">
                    View Story
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setStoryToDeleteId(story.id)}
                  className="p-2 rounded-xl text-stone-400 hover:text-[#680C07] hover:bg-[#680C07]/10 transition-colors"
                  title="Delete manuscript"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create New Story */}
      <Dialog open={showCreateStoryModal} onOpenChange={setShowCreateStoryModal}>
        <DialogContent className="max-w-lg w-full bg-white border border-stone-200 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-5">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-bold font-serif text-stone-900">
              Create New Folklore Manuscript
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500">
              Initialize a new living tale. You can configure branching choice trees and audio narration next.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateStory} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Story Title
              </label>
              <Input
                type="text"
                placeholder="e.g. The Moon Bride & The River Spirits"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Subtitle <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. A Yoruba Myth of Devotion and High Waters"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Tradition
                </label>
                <Select
                  value={newTradition}
                  onChange={(val) => setNewTradition(val as Tradition)}
                  options={["Ashanti/Akan", "Yoruba", "Zulu", "Dogon", "Pan-African", "Swahili"]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Genre
                </label>
                <Select
                  value={newGenre}
                  onChange={(val) => setNewGenre(val)}
                  options={["Trickster Lore", "Historical Epics", "Spiritual Lore", "Cosmology & Astronomy", "Animal Fables"]}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Synopsis
              </label>
              <textarea
                rows={3}
                placeholder="Describe the background and central conflict of your tale..."
                value={newSynopsis}
                onChange={(e) => setNewSynopsis(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateStoryModal(false)}
                className="border-stone-300 text-stone-700 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold px-6"
              >
                Create Story
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal: Create New Chapter */}
      <Dialog open={showCreateChapterModal} onOpenChange={setShowCreateChapterModal}>
        <DialogContent className="max-w-md w-full bg-white border border-stone-200 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-5">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-bold font-serif text-stone-900">
              Add New Chapter
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500">
              Adding Chapter to <strong>{selectedStoryForChapter?.title}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddChapter} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Chapter Title
              </label>
              <Input
                type="text"
                placeholder="e.g. The River of Echoes"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Chapter Summary
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of this episode..."
                value={newChapterSummary}
                onChange={(e) => setNewChapterSummary(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Estimated Read Time (Minutes)
              </label>
              <Input
                type="number"
                min={1}
                max={60}
                value={newChapterReadTime}
                onChange={(e) => setNewChapterReadTime(Number(e.target.value))}
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateChapterModal(false)}
                className="border-stone-300 text-stone-700 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold px-6"
              >
                Save Chapter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Custom Themed Confirmation Modal */}
      <ConfirmModal
        isOpen={!!storyToDeleteId}
        onClose={() => setStoryToDeleteId(null)}
        onConfirm={confirmDeleteStory}
        title="Delete Story Manuscript?"
        description="Are you sure you want to permanently delete this manuscript? All written chapters and choice paths will be removed from your circle archive."
        confirmText="Delete Manuscript"
        cancelText="Keep Story"
        variant="danger"
      />
    </div>
  );
}
