'use client';

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  GitBranch,
  ArrowLeft,
  Bookmark,
  Share2,
  Heart,
  MessageSquare,
  Sparkles,
  RotateCcw,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/features/reader/audio-player";
import { TypographyCustomizer } from "@/components/features/reader/typography-customizer";
import { ChoicePrompt } from "@/components/features/reader/choice-prompt";
import { ChapterNavigator } from "@/components/features/reader/chapter-navigator";
import { useStoryStore } from "@/hooks/useStory";
import { useBookmark } from "@/hooks/useBookmark";
import { Story, StoryChoice, StoryNode } from "@/types";

// Rich Mock Story Data for Anansi Tale
const ANANSI_STORY: Story = {
  id: "anansi-and-the-pot-of-wisdom",
  slug: "anansi-and-the-pot-of-wisdom",
  title: "Anansi and the Pot of Wisdom",
  subtitle: "The pride of Kwaku Anansi and the high baobab tree",
  synopsis: "The spider Kwaku Anansi sought to gather all the world's wisdom into a clay calabash, only to discover wisdom cannot be hoarded alone on a high tree.",
  coverImage: "",
  tradition: "Ashanti/Akan",
  genres: ["trickster-tales", "moral-fables"],
  tags: ["Anansi", "Wisdom", "Baobab", "Akan"],
  difficulty: "Intermediate",
  authorId: "user-kwame-01",
  authorName: "Kwame Asante",
  publishedAt: "2026-01-10",
  updatedAt: "2026-02-01",
  estimatedReadTime: 6,
  totalChapters: 2,
  totalBranches: 8,
  upvotesCount: 428,
  bookmarksCount: 156,
  commentsCount: 38,
  isInteractive: true,
  hasAudioNarration: true,
  status: "published",
  chapters: [
    {
      id: "chap-1",
      number: 1,
      title: "The Gathering of the Calabash",
      summary: "Anansi visits the villages across the forest to hoard every crumb of wisdom.",
      rootNodeId: "node-1-gather",
      readTimeMinutes: 3,
      nodes: {
        "node-1-gather": {
          id: "node-1-gather",
          title: "The Golden Clay Pot of Nyame",
          content: `In the ancient days, wisdom was scattered like river pebbles across all the villages of the forest. Every elder possessed a few drops, every child held a seed of truth, and every blacksmith understood the temper of iron.

Kwaku Anansi, the spider, looked upon this and grew envious. "If I alone possess all wisdom," thought he, "then every chief, king, and creature will come kneeling at my web."

So Anansi fashioned a sacred clay calabash, sealed with tree resin, and set out with his web-ropes. As he walked toward the great Baobab, he heard two voices in dispute near the river bend.`,
          choices: [
            {
              id: "choice-1a",
              label: "Conceal the calabash and listen quietly to steal their insight",
              targetNodeId: "node-2-listen",
              consequenceHint: "Stealth reveals hidden village secrets...",
            },
            {
              id: "choice-1b",
              label: "Intervene boldly as a self-proclaimed judge to demand their wisdom",
              targetNodeId: "node-2-judge",
              consequenceHint: "Pride stirs the attention of the Sky God Nyame...",
            },
          ],
        },
        "node-2-listen": {
          id: "node-2-listen",
          title: "Whispers by the Volta Water",
          content: `Hiding behind the broad elephant-ear leaves, Anansi caught the dispute between the fisherman and the weaver. Through patience, he captured the secret of weaving moonlit threads into untearable nets.

With a sly grin, Anansi sealed the secret inside his pot. His clay calabash was now brimming with every shred of thought, craft, and counsel on earth.

Now came the final challenge: Where could he hide such boundless power so no thief could ever touch it? Above him towered the Great Baobab, its branches reaching toward the celestial sphere of Nyame.`,
          choices: [
            {
              id: "choice-2a",
              label: "Tie the pot to his belly and climb the rough bark immediately",
              targetNodeId: "node-3-climb-belly",
              consequenceHint: "Haste often blinds the cunning mind...",
            },
            {
              id: "choice-2b",
              label: "Consult his young son Ntikuma who watches from the thicket",
              targetNodeId: "node-3-consult-son",
              consequenceHint: "Humility may reveal what pride conceals...",
            },
          ],
        },
        "node-2-judge": {
          id: "node-2-judge",
          title: "The Hubris of the Web",
          content: `Anansi leaped onto a high stone and waved his eight legs. "Fools!" cried he. "Cease your bickering and pour your knowledge into my jar, for I shall govern your truth!"

The villagers laughed in chorus. "How can a spider carry the weight of human sorrow and joy in a single pot?" Yet Anansi tricked them with honeyed words and trapped their philosophies inside.

Now full of arrogance, Anansi marched to the Baobab tree, determined to hoist the wisdom to the heavens.`,
          choices: [
            {
              id: "choice-2c",
              label: "Tie the pot in front of his belly and attempt the climb",
              targetNodeId: "node-3-climb-belly",
              consequenceHint: "The pot blocks your eight nimble arms...",
            },
          ],
        },
        "node-3-climb-belly": {
          id: "node-3-climb-belly",
          title: "The Clumsy Ascent of Pride",
          content: `Anansi tied the heavy clay pot firmly to his stomach. He reached for the lowest branch of the Baobab, but the bulky calabash bumped against the trunk at every step!

He slipped. He scraped his knees. He tried once, twice, ten times, but could not get past the first knot of bark.

From below, his young son Ntikuma chuckled softly: "Father, if you have all the wisdom of the world in that pot, why do you not tie it to your back instead of your belly so your arms can grip the tree?"

Anansi froze in shame. Even with a pot full of wisdom, a child had just taught him common sense! In sheer frustration, Anansi lost his grip. The pot plunged down, shattering against the stones, releasing wisdom back into the four winds for all humankind to share.`,
          isEnding: true,
          endingType: "lesson",
          moralLesson: "No single creature can hold all the wisdom in the universe; wisdom belongs to everyone.",
          choices: [],
        },
        "node-3-consult-son": {
          id: "node-3-consult-son",
          title: "The Path of Shared Counsel",
          content: `Anansi paused and called out to Ntikuma. "Son, tell me how you would carry such a treasure to the stars?"

Ntikuma smiled: "Tie it behind your shoulders, father, and allow the village elders to each plant a seed of baobab beneath."

Anansi followed his son's advice and successfully climbed to the highest fork. There, instead of locking the wisdom away, he opened the lid slightly every morning at dawn, letting the morning breezes blow gentle inspiration across every hearth in Ghana.`,
          isEnding: true,
          endingType: "triumph",
          moralLesson: "True wisdom is multiplied when shared through generations of counsel.",
          choices: [],
        },
      },
    },
  ],
};

export default function StoryReaderPage() {
  const params = useParams();
  const {
    currentStory,
    setStory,
    currentNodeId,
    chooseBranch,
    goToPreviousNode,
    resetStoryProgress,
    fontSize,
    readingTheme,
    historyPath,
  } = useStoryStore();

  const [chapterNavOpen, setChapterNavOpen] = React.useState(false);
  const { isBookmarked, toggleBookmark } = useBookmark("anansi-and-the-pot-of-wisdom");
  const [upvotes, setUpvotes] = React.useState(ANANSI_STORY.upvotesCount);
  const [hasUpvoted, setHasUpvoted] = React.useState(false);

  // Initialize story on mount
  React.useEffect(() => {
    setStory(ANANSI_STORY);
  }, [setStory]);

  const activeStory = currentStory || ANANSI_STORY;
  const currentChapter = activeStory.chapters?.[0];
  const activeNode: StoryNode | undefined =
    currentChapter?.nodes[currentNodeId || currentChapter.rootNodeId];

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setHasUpvoted(true);
    }
  };

  const fontSizeClasses = {
    sm: "text-base leading-relaxed",
    md: "text-lg leading-loose",
    lg: "text-xl leading-loose",
    xl: "text-2xl leading-loose",
  };

  const themeClasses = {
    night: "bg-folklore-night text-neutral-100",
    parchment: "bg-[#F4EFE6] text-[#2C1D11] shadow-inner",
    sandstone: "bg-[#1E1712] text-amber-100",
  };

  return (
    <div className="pb-24 max-w-4xl mx-auto space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-folklore-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Chapter Drawer Toggle */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setChapterNavOpen(true)}
            className="gap-1.5 text-xs h-9 rounded-xl border-white/10"
          >
            <List className="h-3.5 w-3.5" />
            <span>Chapters</span>
          </Button>

          {/* Typography Customizer */}
          <TypographyCustomizer />

          {/* Bookmark Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleBookmark}
            className={`gap-1.5 text-xs h-9 rounded-xl border-white/10 ${
              isBookmarked ? "text-folklore-gold border-folklore-gold/40" : ""
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Story Metadata Banner */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">{activeStory.tradition}</Badge>
          <Badge variant="secondary">{activeStory.difficulty}</Badge>
          <span className="text-xs text-neutral-400">
            Path Step {historyPath.length} of narrative tree
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
          {activeStory.title}
        </h1>
        <p className="text-sm text-neutral-400 italic">
          Recorded by Griot {activeStory.authorName}
        </p>
      </div>

      {/* Audio Narration Bar */}
      {activeNode && (
        <div className="sticky top-20 z-30">
          <AudioPlayer textToRead={`${activeNode.title}. ${activeNode.content}`} />
        </div>
      )}

      {/* Interactive Story Reader Box */}
      <div
        className={`rounded-3xl border border-folklore-amber/20 p-6 sm:p-10 transition-all duration-300 ${
          themeClasses[readingTheme]
        }`}
      >
        {activeNode ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <h2 className="text-xl font-serif font-bold text-folklore-gold">
                {activeNode.title}
              </h2>
              {historyPath.length > 1 && (
                <button
                  onClick={goToPreviousNode}
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-folklore-gold transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Undo Choice</span>
                </button>
              )}
            </div>

            {/* Story Prose */}
            <div
              className={`font-serif whitespace-pre-line tracking-wide ${
                fontSizeClasses[fontSize]
              }`}
            >
              {activeNode.content}
            </div>

            {/* Ending Condition Card */}
            {activeNode.isEnding && (
              <div className="mt-8 rounded-2xl border-2 border-folklore-gold/50 bg-folklore-gold/10 p-6 text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-folklore-gold">
                  <Sparkles className="h-4 w-4" />
                  Tale Concluded — Moral Lesson
                </div>
                <p className="text-lg font-serif italic text-white">
                  &quot;{activeNode.moralLesson}&quot;
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Button variant="folklore" size="sm" onClick={resetStoryProgress}>
                    Re-explore Other Branches
                  </Button>
                </div>
              </div>
            )}

            {/* Choice Decision Forks */}
            {!activeNode.isEnding && (
              <ChoicePrompt
                choices={activeNode.choices}
                onSelectChoice={(choice: StoryChoice) => chooseBranch(choice)}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">Loading tale nodes...</div>
        )}
      </div>

      {/* Chapter Drawer */}
      <ChapterNavigator
        chapters={activeStory.chapters || []}
        isOpen={chapterNavOpen}
        onClose={() => setChapterNavOpen(false)}
      />

      {/* Reader Interaction Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
            hasUpvoted
              ? "border-folklore-terracotta bg-folklore-terracotta/20 text-folklore-terracotta"
              : "border-white/10 bg-white/5 text-neutral-300 hover:text-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${hasUpvoted ? "fill-current" : ""}`} />
          <span>{upvotes} Blessings</span>
        </button>

        <div className="flex items-center gap-3">
          <Link href="/community">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Discuss Lore</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
