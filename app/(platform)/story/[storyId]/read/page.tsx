"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStory } from "@/hooks/useStory";
import { useLibrary } from "@/hooks/useLibrary";
import { StoryNode, StoryChapter, StoryChoice } from "@/types";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  Sparkles,
  Quote,
  Check,
  RotateCcw,
  Volume2,
  Sliders,
  Send,
  CornerDownRight,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/features/reader/audio-player";
import { TypographyCustomizer } from "@/components/features/reader/typography-customizer";
import { ChoicePrompt } from "@/components/features/reader/choice-prompt";
import { ChapterNavigator } from "@/components/features/reader/chapter-navigator";

export default function ChapterReaderPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params?.storyId as string;
  const { currentStory } = useStory(storyId);
  const { isBookmarked, toggleBookmark, addSavedQuote, updateReadingProgress } = useLibrary();

  // Active Chapter & Node State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentNodeId, setCurrentNodeId] = useState<string>("node-1");
  const [history, setHistory] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Chapter Engagement State
  const [chapterLiked, setChapterLiked] = useState(false);
  const [chapterLikesCount, setChapterLikesCount] = useState(42);
  const [showComments, setShowComments] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [quoteSavedToast, setQuoteSavedToast] = useState(false);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: "comm-1",
      author: "Elder Moussa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "The moral weight of Anansi's dilemma speaks so deeply to Yoruba proverb about the broken calabash.",
      likes: 12,
      createdAt: "3 days ago",
      replies: [
        {
          id: "comm-1-1",
          author: "Griot Kwame",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
          text: "Indeed! In Akan storytelling, this is where the children are invited to reflect on humility.",
          likes: 5,
          createdAt: "2 days ago",
        },
      ],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const chapters: StoryChapter[] = currentStory?.chapters || [];
  const currentChapter = chapters[currentChapterIndex] || {
    id: "chap-1",
    number: 1,
    title: "The Calabash of All Wisdom",
    summary: currentStory?.synopsis || "",
    readTimeMinutes: 5,
    status: "published" as const,
    likesCount: 120,
    rootNodeId: "node-1",
    nodes: {
      "node-1": {
        id: "node-1",
        title: "The Celestial Court of Nyame",
        content: `In the celestial court above the clouds of Asase Yaa, Nyame the Sky God looked down upon Kwaku Anansi with amused eyes.

"You ask for that which cannot be contained, little weaver," Nyame spoke, his voice echoing like rolling thunder across the canopy. "All the wisdom in the heavens and earth resides in this clay pot. Guard it with humility, or its weight will scatter upon the four winds."

Anansi bowed low, clasping the heavy clay pot to his chest with eight trembling legs.`,
        choices: [
          {
            id: "c1",
            label: "Pledge to share the calabash with the village elders",
            targetNodeId: "node-2a",
            consequenceHint: "Honors communal traditions...",
          },
          {
            id: "c2",
            label: "Flee into the deep baobab forest to hoard the knowledge",
            targetNodeId: "node-2b",
            consequenceHint: "Fosters secret pride...",
          },
        ],
      },
      "node-2a": {
        id: "node-2a",
        title: "The Village Gathering",
        content: `The elders beneath the shade of the sacred silk-cotton tree welcomed Anansi with song and praise. Realizing that wisdom is like water that nourishes only when shared, Anansi uncapped the calabash, letting streams of golden light scatter across every village on earth.`,
        choices: [],
        isEnding: true,
        endingType: "triumph",
        moralLesson: "True wisdom is communal; no single creature can claim its entirety.",
      },
      "node-2b": {
        id: "node-2b",
        title: "The Shattered Pot",
        content: `Unable to scale the baobab with the heavy pot on his belly, Anansi grew enraged when his young child suggested tying it behind his back. In fury, Anansi hurled the pot to the ground, shattering it into pieces. A great wind swept the wisdom across the four corners of the earth.`,
        choices: [],
        isEnding: true,
        endingType: "lesson",
        moralLesson: "Pride shatters what humility was meant to preserve.",
      },
    },
    updatedAt: "2026-01-10",
  };

  const currentNode: StoryNode =
    currentChapter.nodes[currentNodeId] ||
    currentChapter.nodes[currentChapter.rootNodeId] || {
      id: "default",
      title: currentChapter.title,
      content: "The tale continues in the oral archives...",
      choices: [],
    };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Reading Progress in Library
  useEffect(() => {
    if (currentStory) {
      updateReadingProgress({
        storyId: currentStory.id,
        storyTitle: currentStory.title,
        coverImage: currentStory.coverImage,
        authorPenName: currentStory.authorPenName || currentStory.authorName,
        lastChapterId: currentChapter.id,
        lastChapterNumber: currentChapter.number,
        lastChapterTitle: currentChapter.title,
        progressPercentage: Math.max(25, scrollProgress),
        lastReadAt: "Just now",
      });
    }
  }, [currentStory, currentChapter, scrollProgress, updateReadingProgress]);

  // Handle Text Selection for Quote Highlighting
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length > 15) {
        setSelectedText(selection);
      } else {
        setSelectedText("");
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleSaveSelectedQuote = () => {
    if (!selectedText || !currentStory) return;
    addSavedQuote({
      storyId: currentStory.id,
      storyTitle: currentStory.title,
      chapterNumber: currentChapter.number,
      chapterTitle: currentChapter.title,
      authorPenName: currentStory.authorPenName || currentStory.authorName,
      quoteText: selectedText,
    });
    setSelectedText("");
    setQuoteSavedToast(true);
    setTimeout(() => setQuoteSavedToast(false), 3000);
  };

  const handleChoice = (choice: StoryChoice | string) => {
    const targetNodeId = typeof choice === "string" ? choice : choice.targetNodeId;
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(targetNodeId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentNodeId(currentChapter.rootNodeId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChapterSelect = (chapterNum: number) => {
    const targetIdx = chapters.findIndex((c) => c.number === chapterNum);
    if (targetIdx !== -1) {
      setCurrentChapterIndex(targetIdx);
      setCurrentNodeId(chapters[targetIdx].rootNodeId);
      setHistory([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentStory?.title} - Chapter ${currentChapter.number}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: `comm-${Date.now()}`,
      author: "Kwame Asante",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      text: newComment,
      likes: 0,
      createdAt: "Just now",
      replies: [],
    };

    setComments([commentObj, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: `reply-${Date.now()}`,
                author: "Kwame Asante",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                text: replyText,
                likes: 0,
                createdAt: "Just now",
              },
            ],
          };
        }
        return c;
      })
    );
    setReplyingTo(null);
    setReplyText("");
  };

  if (!currentStory) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">Story Not Found</h2>
        <Link href="/explore">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            Return to Explore
          </Button>
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(currentStory.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 relative px-4 sm:px-6 lg:px-8">
      {/* Top Floating Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200">
        <div
          className="h-full bg-[#680C07] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/story/${currentStory.id}`}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Back to story details"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-stone-900 truncate font-serif">
                {currentStory.title}
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-700 font-medium truncate">
                Chapter {currentChapter.number}: {currentChapter.title}
              </p>
            </div>
          </div>

          {/* Reader Tools & Customizers */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <TypographyCustomizer />

            <button
              type="button"
              onClick={() => toggleBookmark(currentStory.id)}
              className={`p-2 rounded-xl border text-xs transition-all ${
                bookmarked
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
              title="Bookmark story"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-amber-600 text-amber-600" : ""}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              title="Share chapter"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1 p-2 rounded-xl border text-xs transition-all ${
                showComments
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
              title="Chapter discussion"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] font-bold hidden sm:inline">
                {comments.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Prose & Reader Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        {/* Oral Audio Player */}
        {currentStory.hasAudioNarration && (
          <AudioPlayer
            title={`${currentStory.title} • Ch. ${currentChapter.number}`}
            textToRead={currentNode.content}
          />
        )}

        {/* Highlight Quote Floating Action */}
        {selectedText && (
          <div className="sticky top-20 z-30 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 p-2 bg-stone-900 text-white rounded-2xl shadow-xl border border-stone-700">
              <Quote className="w-4 h-4 text-amber-400 ml-1" />
              <span className="text-xs text-stone-300 truncate max-w-[200px] sm:max-w-xs">
                &ldquo;{selectedText}&rdquo;
              </span>
              <Button
                size="sm"
                onClick={handleSaveSelectedQuote}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-7 px-2.5 rounded-xl font-medium"
              >
                Save to Quotes
              </Button>
            </div>
          </div>
        )}

        {/* Reader Prose Card */}
        <article className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-stone-100 pb-5">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold uppercase tracking-wider text-amber-700">
                Chapter {currentChapter.number} of {chapters.length || 1}
              </span>
              <span>{currentChapter.readTimeMinutes} min estimated read</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {currentNode.title || currentChapter.title}
            </h2>
          </div>

          {/* Node Prose Content */}
          <div className="text-stone-800 text-base sm:text-lg leading-relaxed sm:leading-loose whitespace-pre-line font-serif select-text">
            {currentNode.content}
          </div>

          {/* Moral Lesson / Ending Banner */}
          {currentNode.isEnding && (
            <div className="p-5 bg-white rounded-2xl border border-[#680C07]/30 space-y-2 mt-8 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-[#680C07] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#680C07]" />
                {currentNode.endingType === "triumph" ? "Tale Completed with Honor" : "The Lesson of the Ancients"}
              </div>
              {currentNode.moralLesson && (
                <p className="text-xs sm:text-sm text-stone-700 italic">
                  &ldquo;{currentNode.moralLesson}&rdquo;
                </p>
              )}
              <div className="pt-2 flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRestart}
                  className="bg-white border-amber-300 text-amber-900 text-xs rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Replay this Chapter
                </Button>
                {currentChapterIndex < chapters.length - 1 && (
                  <Button
                    size="sm"
                    onClick={() => handleChapterSelect(currentChapterIndex + 2)}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs rounded-xl"
                  >
                    Next Chapter <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Branching Choice Prompt */}
          {!currentNode.isEnding && currentNode.choices && currentNode.choices.length > 0 && (
            <div className="pt-6 border-t border-stone-100">
              <ChoicePrompt choices={currentNode.choices} onSelectChoice={handleChoice} />
            </div>
          )}
        </article>

        {/* Chapter Bottom Actions & Like */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setChapterLiked(!chapterLiked);
                setChapterLikesCount((prev) => (chapterLiked ? prev - 1 : prev + 1));
              }}
              className={`border-stone-300 rounded-xl text-xs ${
                chapterLiked ? "bg-red-50 border-red-300 text-red-600 font-semibold" : "text-stone-700"
              }`}
            >
              <Heart className={`w-4 h-4 mr-1.5 ${chapterLiked ? "fill-red-500 text-red-500" : ""}`} />
              {chapterLiked ? "Liked Chapter" : "Like Chapter"} ({chapterLikesCount})
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="border-stone-300 text-stone-700 rounded-xl text-xs"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
            </Button>
          </div>

          {/* Chapter Navigation Pagination */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentChapterIndex === 0}
              onClick={() => handleChapterSelect(currentChapter.number - 1)}
              className="border-stone-300 rounded-xl text-xs"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous Chapter
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentChapterIndex >= chapters.length - 1}
              onClick={() => handleChapterSelect(currentChapter.number + 1)}
              className="border-stone-300 rounded-xl text-xs bg-amber-50 border-amber-300 text-amber-900 font-semibold"
            >
              Next Chapter <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Chapter Comments Section Drawer */}
        {showComments && (
          <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                Chapter Discussions ({comments.length})
              </h3>
              <span className="text-xs text-stone-400">Share your reflections on this tale</span>
            </div>

            {/* Comment Input Box */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Write a reflection or question on this chapter..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-300 rounded-2xl px-4 py-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            {/* Comments List with Nested Replies */}
            <div className="space-y-4 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center font-bold text-xs text-amber-900 font-serif">
                        {comment.author[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">{comment.author}</span>
                        <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs text-stone-500 hover:text-amber-600"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">{comment.text}</p>

                  {/* Reply Button */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-[11px] font-semibold text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <CornerDownRight className="w-3 h-3" /> Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder={`Reply to ${comment.author}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddReply(comment.id)}
                        className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs"
                      >
                        Post
                      </Button>
                    </div>
                  )}

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-6 pt-2 space-y-2 border-l-2 border-amber-200">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-stone-900">{reply.author}</span>
                            <span className="text-stone-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-xs text-stone-600">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Floating Chapter Navigator Drawer */}
      <ChapterNavigator
        chapters={chapters}
        currentChapterNumber={currentChapter.number}
        onSelectChapter={handleChapterSelect}
      />

      {/* Toast Notifications */}
      {quoteSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>Quote saved to your Personal Library!</span>
        </div>
      )}

      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>Chapter link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
