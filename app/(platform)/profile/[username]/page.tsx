"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { UserProfile, Story, LoreBadge } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";
import { SupportAuthorDialog } from "@/components/features/story-details/support-author-dialog";
import {
  Users,
  User,
  BookOpen,
  Heart,
  Eye,
  Crown,
  MapPin,
  Calendar,
  Trophy,
  BarChart3,
  Check,
  Share2,
  UserPlus,
  UserCheck,
  Plus,
  Sliders,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/components/shared/auth-guard";
import { useAuth } from "@/hooks/useAuth";
import { useLibrary } from "@/hooks/useLibrary";
import { getStoriesByAuthor } from "@/src/services/storyService";

// Helper to format join date cleanly
function formatJoinDate(dateInput?: unknown): string {
  if (!dateInput) return "Joined Mar 2025";
  if (typeof dateInput === "string" && dateInput.startsWith("Joined")) return dateInput;
  try {
    let d: Date;
    if (typeof dateInput === "object" && dateInput !== null && "toDate" in dateInput) {
      d = (dateInput as { toDate: () => Date }).toDate();
    } else {
      d = new Date(dateInput as string | number);
    }
    if (!isNaN(d.getTime())) {
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const year = d.getFullYear();
      return `Joined ${month} ${year}`;
    }
  } catch {}
  return "Joined Mar 2025";
}

// Format compact numbers (e.g. 1500 -> 1.5K)
function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

// SafeImage component to guarantee NO broken image displays
function SafeImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full min-h-[140px] bg-stone-900 border border-[#D4AF37]/30 flex flex-col items-center justify-center p-3 text-center space-y-2">
        <BookOpen className="w-8 h-8 text-[#D4AF37]" />
        <span className="text-xs font-bold text-stone-200 line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      unoptimized
    />
  );
}

// Default Fallback Badges for newly joined registered Storytellers
const DEFAULT_INITIATE_BADGES: LoreBadge[] = [
  {
    id: "badge-initiate",
    name: "Storyteller Initiate",
    description: "Entered the sacred Inkoma oral archive",
    iconName: "Crown",
    tier: "bronze",
    unlockedAt: "Recently",
  },
  {
    id: "badge-firekeeper",
    name: "Hearth Listener",
    description: "Listening to timeless tales around the communal fire",
    iconName: "Sparkles",
    tier: "bronze",
    unlockedAt: "Active",
  },
];

// Cynthia Profile & Manuscripts Data (Matching Public Storyteller Profile)
const CYNTHIA_PROFILE: UserProfile = {
  id: "user-cynthia-01",
  username: "ceba_stories",
  displayName: "Cynthia",
  penName: "Cynthia",
  bio: "I write the kind of stories that stay with you. 💜",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  country: "Port Harcourt, Nigeria",
  role: "storyteller",
  traditionSpecialty: "Pan-African",
  createdAt: "Joined Mar 2025",
  followersCount: 18200, // 18.2K
  followingCount: 156,
  onboardingCompleted: true,
  writingStats: {
    storiesPublished: 24,
    draftStories: 2,
    totalChaptersPublished: 86,
    totalReads: 312000, // 312K
    totalLikes: 312000,
    totalComments: 4200,
  },
  readingStats: {
    booksRead: 45,
    chaptersRead: 180,
    readingStreakDays: 32,
    favoriteGenres: ["Romance", "Fantasy", "Thriller"],
    interests: ["Pan-African Myths", "Contemporary Fiction"],
  },
  supportDetails: {
    paystackLink: "https://paystack.com/pay/cynthia-stories",
    bankName: "Guaranty Trust Bank",
    accountName: "Cynthia Okereke",
    accountNumber: "0123456789",
    isAcceptingSupport: true,
  },
  badges: [
    {
      id: "badge-cynthia-1",
      name: "Master Storyteller",
      description: "Authored 20+ acclaimed folklore manuscripts",
      iconName: "Crown",
      tier: "gold",
      unlockedAt: "2025-06-12",
    },
    {
      id: "badge-cynthia-2",
      name: "Top Author 2025",
      description: "Surpassed 300,000+ total reads across manuscripts",
      iconName: "Award",
      tier: "elder",
      unlockedAt: "2025-10-01",
    },
  ],
};

const CYNTHIA_STORIES = [
  {
    id: "story-1",
    title: "Beneath the Silent Crown",
    status: "Published" as const,
    views: "25.4K",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-2",
    title: "Whispers of the Heart",
    status: "Published" as const,
    views: "18.7K",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-3",
    title: "Shadows Beneath",
    status: "Draft" as const,
    views: "12.3K",
    cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-4",
    title: "Fragments of Tomorrow",
    status: "Published" as const,
    views: "9.4K",
    cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-5",
    title: "Throne of Secrets",
    status: "Published" as const,
    views: "14.8K",
    cover: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-6",
    title: "Echoes of Yesterday",
    status: "Draft" as const,
    views: "8.1K",
    cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-7",
    title: "The Fire Within",
    status: "Published" as const,
    views: "11.2K",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "story-8",
    title: "Beyond the Horizon",
    status: "Published" as const,
    views: "6.7K",
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
  },
];

export default function UserProfilePage() {
  const { user, profile: authProfile, firebaseUser, loading: authLoading } = useAuth();
  const { continueReading } = useLibrary();

  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername ? rawUsername.toLowerCase() : "";

  // Determine if viewing own profile
  const isOwnProfile =
    !username ||
    username === "profile" ||
    username === "me" ||
    username === "self" ||
    (Boolean(authProfile?.username) && username === authProfile?.username?.toLowerCase()) ||
    (Boolean(user?.id) && username === user?.id?.toLowerCase()) ||
    (Boolean(firebaseUser?.uid) && username === firebaseUser?.uid?.toLowerCase()) ||
    (Boolean(user?.email) && username === user?.email?.split("@")[0]?.toLowerCase()) ||
    (Boolean(firebaseUser?.email) && username === firebaseUser?.email?.split("@")[0]?.toLowerCase()) ||
    (Boolean(authProfile?.email) && username === authProfile?.email?.split("@")[0]?.toLowerCase()) ||
    (Boolean(authProfile?.displayName) &&
      username === authProfile?.displayName?.toLowerCase().replace(/\s+/g, "_")) ||
    (Boolean(authProfile?.displayName) &&
      username === authProfile?.displayName?.toLowerCase().replace(/\s+/g, "")) ||
    (Boolean(authProfile?.displayName) &&
      username.replace(/_/g, " ") === authProfile?.displayName?.toLowerCase()) ||
    (Boolean(firebaseUser?.displayName) &&
      username === firebaseUser?.displayName?.toLowerCase().replace(/\s+/g, "_"));

  // Build the effective profile object
  const profile: UserProfile = isOwnProfile
    ? {
        id: user?.id || authProfile?.id || "user-current",
        username:
          authProfile?.username ||
          (user?.email ? user.email.split("@")[0].toLowerCase() : "storyteller"),
        displayName:
          authProfile?.displayName ||
          (user?.email ? user.email.split("@")[0] : "Storyteller"),
        penName: authProfile?.penName || authProfile?.displayName || "Storyteller",
        bio: authProfile?.bio || "Preserving ancestral lore through interactive storytelling.",
        avatarUrl: authProfile?.avatarUrl || firebaseUser?.photoURL || "",
        country: authProfile?.country || "Pan-African",
        role: authProfile?.role || "storyteller",
        traditionSpecialty: authProfile?.traditionSpecialty || "Pan-African Folklore",
        createdAt: authProfile?.createdAt || new Date().toISOString(),
        followersCount: authProfile?.followersCount ?? 0,
        followingCount: authProfile?.followingCount ?? 0,
        badges:
          authProfile?.badges && authProfile.badges.length > 0
            ? authProfile.badges
            : DEFAULT_INITIATE_BADGES,
        writingStats: authProfile?.writingStats,
        readingStats: authProfile?.readingStats,
        supportDetails: authProfile?.supportDetails,
      }
    : CYNTHIA_PROFILE;

  // Author stories state (fetched dynamically from Firestore/local storage)
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);

  // Profile actions & tabs state
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followersCount);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"stories" | "reading" | "achievements" | "metrics">("stories");

  // Keep followers count in sync if profile updates
  useEffect(() => {
    setFollowersCount(profile.followersCount);
  }, [profile.followersCount]);

  // Fetch stories authored by the registered user
  useEffect(() => {
    if (isOwnProfile && user?.id) {
      setLoadingStories(true);
      getStoriesByAuthor(user.id)
        .then((stories) => {
          setUserStories(stories || []);
        })
        .catch((err) => {
          console.error("[UserProfilePage] Error fetching user stories:", err);
        })
        .finally(() => {
          setLoadingStories(false);
        });
    }
  }, [isOwnProfile, user?.id]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Calculations for dynamic stats
  const totalLikes = isOwnProfile
    ? userStories.reduce((acc, s) => acc + (s.likesCount || 0), 0)
    : 312000;
  const totalReads = isOwnProfile
    ? userStories.reduce((acc, s) => acc + (s.readsCount || 0), 0)
    : 312000;
  const publishedCount = isOwnProfile
    ? userStories.filter((s) => s.status === "published").length || userStories.length
    : profile.writingStats?.storiesPublished || 24;

  const followersDisplay =
    followersCount >= 1000
      ? `${(followersCount / 1000).toFixed(1)}K`
      : String(followersCount);
  const likesDisplay =
    totalLikes >= 1000
      ? `${(totalLikes / 1000).toFixed(1)}K`
      : String(totalLikes);

  return (
    <AuthGuard featureName="Storyteller Profile">
      <div className="space-y-6 pb-24 max-w-5xl mx-auto font-sans text-stone-900 dark:text-stone-100">
        {/* 1. USER PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pt-2">
          {/* Avatar with Gold Ring & Green Online Dot */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37] p-1 shadow-lg bg-stone-900 overflow-hidden relative flex items-center justify-center">
              {profile.avatarUrl ? (
                <SafeImage
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#8C6D23]/20 flex items-center justify-center text-3xl font-extrabold text-[#D4AF37]">
                  {profile.displayName?.charAt(0)?.toUpperCase() || "S"}
                </div>
              )}
            </div>
            <span
              className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0b0e] shadow-md"
              title="Active Storyteller"
            />
          </div>

          {/* User Details */}
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                {/* Name & Crown Badge */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                    {profile.displayName}
                  </h1>
                  <div
                    className="p-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 flex items-center justify-center"
                    title="Verified Storyteller"
                  >
                    <Crown className="w-4 h-4 fill-current text-purple-300" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-mono">
                  @{profile.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {isOwnProfile ? (
                  <>
                    <Link href="/settings">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full text-xs font-semibold px-4"
                      >
                        <Sliders className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                      </Button>
                    </Link>
                    <Link href="/studio/new">
                      <Button
                        size="sm"
                        className="bg-[#D4AF37] hover:bg-[#B8860B] text-black rounded-full text-xs font-bold px-4"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Write Story
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFollowToggle}
                      className={`rounded-full text-xs font-bold px-4 py-2 ${
                        isFollowing
                          ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                          : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5 mr-1" /> Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5 mr-1" /> Follow
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSupportModal(true)}
                      className="border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full text-xs font-semibold px-4"
                    >
                      <Heart className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Support
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShareProfile}
                  className="text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-full"
                  title="Share profile link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium max-w-2xl">
              {profile.bio}
            </p>

            {/* Location & Joined Date */}
            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> {profile.country}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" /> {formatJoinDate(profile.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. STATS BAR (4 Columns Matching Design) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-200 dark:border-stone-800/80">
          {/* Followers */}
          <Link
            href={`/profile/${profile.username || "me"}/network?tab=followers`}
            className="flex items-center gap-3 p-2 -m-2 rounded-2xl hover:bg-[#D4AF37]/10 transition-colors group cursor-pointer"
            title={`View ${profile.displayName}'s followers`}
          >
            <div className="p-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-hover:scale-105 transition-all">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white block leading-none group-hover:text-[#D4AF37] transition-colors">
                {followersDisplay}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium group-hover:underline">
                Followers
              </span>
            </div>
          </Link>

          {/* Following */}
          <Link
            href={`/profile/${profile.username || "me"}/network?tab=following`}
            className="flex items-center gap-3 p-2 -m-2 rounded-2xl hover:bg-[#D4AF37]/10 transition-colors group cursor-pointer"
            title={`View accounts ${profile.displayName} is following`}
          >
            <div className="p-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-hover:scale-105 transition-all">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white block leading-none group-hover:text-[#D4AF37] transition-colors">
                {profile.followingCount ?? 0}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium group-hover:underline">
                Following
              </span>
            </div>
          </Link>

          {/* Stories */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white block leading-none">
                {isOwnProfile ? userStories.length : (profile.writingStats?.storiesPublished || 24)}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Stories</span>
            </div>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Heart className="w-5 h-5 fill-[#D4AF37]/20" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white block leading-none">
                {likesDisplay}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Likes</span>
            </div>
          </div>
        </div>

        {/* 3. TABS NAVIGATION BAR */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-stone-200 dark:border-stone-800 overflow-x-auto scrollbar-none pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 py-1.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "stories"
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Stories</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reading")}
            className={`flex items-center gap-2 py-1.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "reading"
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reading List</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center gap-2 py-1.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "achievements"
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Achievements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-2 py-1.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "metrics"
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Metrics</span>
          </button>
        </div>

        {/* TAB 1: MY STORIES (4-Column Card Grid) */}
        {activeTab === "stories" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
                {isOwnProfile ? "Authored Manuscripts" : "My Stories"}
              </h2>
              {isOwnProfile && (
                <Link href="/studio/new">
                  <Button size="sm" variant="ghost" className="text-xs text-[#D4AF37] hover:text-[#B8860B] font-bold">
                    <Plus className="w-3.5 h-3.5 mr-1" /> New Story
                  </Button>
                </Link>
              )}
            </div>

            {isOwnProfile ? (
              loadingStories ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-[9/15] rounded-2xl bg-stone-100 dark:bg-stone-900 animate-pulse border border-stone-200 dark:border-stone-800 flex items-center justify-center"
                    >
                      <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]/40" />
                    </div>
                  ))}
                </div>
              ) : userStories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {userStories.map((story) => (
                    <Link
                      key={story.id}
                      href={`/story/${story.id}`}
                      className="group relative aspect-[9/15] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-end p-4 text-center"
                    >
                      <SafeImage
                        src={
                          story.coverImage ||
                          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-[#0c0b0e]/60 to-transparent" />
                      <div className="relative z-10 space-y-2 flex flex-col items-center justify-end h-full">
                        <h3 className="text-base sm:text-lg font-bold font-serif text-[#D4AF37] leading-tight drop-shadow-md line-clamp-2 px-1">
                          {story.title}
                        </h3>
                        <div>
                          {story.status === "published" ? (
                            <span className="inline-block bg-purple-950/90 text-purple-200 border border-purple-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                              Published
                            </span>
                          ) : (
                            <span className="inline-block bg-amber-950/90 text-amber-200 border border-amber-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[11px] text-stone-300 font-medium pt-0.5">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          <span>{formatCompactNumber(story.readsCount || 0)} reads</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                      No Folklore Manuscripts Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                      You haven&apos;t written any stories yet. Step into the Creator Studio and craft your first branching interactive legend.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link href="/studio/new">
                      <Button className="bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold text-xs rounded-full px-5 py-2.5">
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Pen Your First Tale
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                {CYNTHIA_STORIES.map((story) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.id}`}
                    className="group relative aspect-[9/15] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-end p-4 text-center"
                  >
                    <SafeImage
                      src={story.cover}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-[#0c0b0e]/60 to-transparent" />
                    <div className="relative z-10 space-y-2 flex flex-col items-center justify-end h-full">
                      <h3 className="text-base sm:text-lg font-bold font-serif text-[#D4AF37] leading-tight drop-shadow-md line-clamp-2 px-1">
                        {story.title}
                      </h3>
                      <div>
                        {story.status === "Published" ? (
                          <span className="inline-block bg-purple-950/90 text-purple-200 border border-purple-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block bg-amber-950/90 text-amber-200 border border-amber-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                            Draft
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[11px] text-stone-300 font-medium pt-0.5">
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                        <span>{story.views}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: READING LIST */}
        {activeTab === "reading" && (
          <div className="space-y-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
              Reading List
            </h2>

            {isOwnProfile ? (
              continueReading && continueReading.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {continueReading.map((item) => (
                    <Link
                      key={item.storyId}
                      href={`/story/${item.storyId}`}
                      className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 flex gap-3 items-center hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <div className="w-12 h-16 bg-stone-800 rounded-lg shrink-0 relative overflow-hidden">
                        <SafeImage
                          src={item.coverImage}
                          alt={item.storyTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                          {item.storyTitle}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          By {item.authorPenName} • Chapter {item.lastChapterNumber}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 bg-stone-200 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#D4AF37] h-full rounded-full transition-all"
                              style={{ width: `${item.progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-semibold shrink-0">
                            {item.progressPercentage}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      Your Reading Archive is Empty
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                      Discover captivating African folklore and oral traditions in the Explore library.
                    </p>
                  </div>
                  <div className="pt-1">
                    <Link href="/explore">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs rounded-full"
                      >
                        Explore Stories
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 flex gap-3 items-center">
                  <div className="w-12 h-16 bg-stone-800 rounded-lg shrink-0 relative overflow-hidden">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop"
                      alt="Reading book"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      Legends of the Ashanti Empire
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">By Nana Kwame • 12 Chapters</p>
                    <span className="text-[10px] text-[#D4AF37] font-semibold mt-1 block">85% Completed</span>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 flex gap-3 items-center">
                  <div className="w-12 h-16 bg-stone-800 rounded-lg shrink-0 relative overflow-hidden">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=200&auto=format&fit=crop"
                      alt="Reading book 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">Star Dancers of Dogon</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">By Oumar Sangare • 8 Chapters</p>
                    <span className="text-[10px] text-[#D4AF37] font-semibold mt-1 block">40% Completed</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === "achievements" && (
          <div className="space-y-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
              Achievements & Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.badges?.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">{badge.name}</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{badge.description}</p>
                    <span className="text-[10px] text-stone-400 block mt-1">Unlocked {badge.unlockedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: METRICS */}
        {activeTab === "metrics" && (
          <div className="space-y-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
              Author Metrics & Analytics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Total Reads</span>
                <strong className="text-2xl font-black text-[#D4AF37]">
                  {isOwnProfile ? totalReads.toLocaleString() : "312,000"}
                </strong>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Monthly Active Readers</span>
                <strong className="text-2xl font-black text-stone-900 dark:text-white">
                  {isOwnProfile ? Math.round(totalReads * 0.4).toLocaleString() : "42,500"}
                </strong>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Total Likes</span>
                <strong className="text-2xl font-black text-[#D4AF37]">
                  {isOwnProfile ? totalLikes.toLocaleString() : "312,000"}
                </strong>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Stories Published</span>
                <strong className="text-2xl font-black text-stone-900 dark:text-white">
                  {publishedCount}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Support Author Dialog Modal */}
        <SupportAuthorDialog
          authorProfile={profile}
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
      </div>
    </AuthGuard>
  );
}
