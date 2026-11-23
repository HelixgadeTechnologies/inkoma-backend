"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { UserProfile, Story, LoreBadge } from "@/types";
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
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/components/shared/auth-guard";
import { useAuth } from "@/hooks/useAuth";
import { useLibrary } from "@/hooks/useLibrary";
import { getStoriesByAuthor } from "@/src/services/storyService";
import {
  getUserPublicProfile,
  followStoryteller,
  unfollowStoryteller,
  getFollowStatus,
  getAuthorSupportDetails,
} from "@/src/services/userService";

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

// Cynthia Demo Profile fallback (used only if offline or demo viewing)
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
  followersCount: 18200,
  followingCount: 156,
  onboardingCompleted: true,
  writingStats: {
    storiesPublished: 24,
    draftStories: 2,
    totalChaptersPublished: 86,
    totalReads: 312000,
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

export default function UserProfilePage() {
  const { user, profile: authProfile } = useAuth();
  const { continueReading } = useLibrary();
  const router = useRouter();

  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername ? rawUsername.toLowerCase().trim() : "";

  // Determine if viewing own profile
  const isOwnProfile =
    !username ||
    username === "profile" ||
    username === "me" ||
    username === "self" ||
    (Boolean(authProfile?.username) && username === authProfile?.username?.toLowerCase()) ||
    (Boolean(user?.id) && username === user?.id?.toLowerCase()) ||
    (Boolean(user?.email) && username === user?.email?.split("@")[0]?.toLowerCase()) ||
    (Boolean(authProfile?.email) && username === authProfile?.email?.split("@")[0]?.toLowerCase()) ||
    (Boolean(authProfile?.displayName) &&
      username === authProfile?.displayName?.toLowerCase().replace(/\s+/g, "_")) ||
    (Boolean(authProfile?.displayName) &&
      username === authProfile?.displayName?.toLowerCase().replace(/\s+/g, "")) ||
    (Boolean(authProfile?.displayName) &&
      username.replace(/_/g, " ") === authProfile?.displayName?.toLowerCase());

  // Remote storyteller profile state
  const [remoteProfile, setRemoteProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(!isOwnProfile);
  const [profileNotFound, setProfileNotFound] = useState(false);

  // Author stories state (GET /api/v1/stories?author=:username)
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);

  // Follow & support interaction state
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"stories" | "reading" | "achievements" | "metrics">("stories");

  // Effective profile object
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
        avatarUrl: authProfile?.avatarUrl || user?.photoURL || "",
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
    : remoteProfile || CYNTHIA_PROFILE;

  // 1. Fetch Public Storyteller Profile (GET /api/v1/users/profile/:username)
  useEffect(() => {
    if (isOwnProfile) {
      setFollowersCount(authProfile?.followersCount ?? 0);
      setProfileLoading(false);
      return;
    }

    if (!username) return;

    let isMounted = true;
    setProfileLoading(true);
    setProfileNotFound(false);

    getUserPublicProfile(username)
      .then((data) => {
        if (!isMounted) return;
        if (data && data.profile) {
          setRemoteProfile(data.profile);
          setIsFollowing(data.isFollowing);
          setFollowersCount(data.profile.followersCount ?? 0);
        } else {
          // If viewing ceba_stories fallback demo, allow graceful display
          if (username === "ceba_stories" || username === "cynthia") {
            setRemoteProfile(CYNTHIA_PROFILE);
            setFollowersCount(CYNTHIA_PROFILE.followersCount);
          } else {
            setProfileNotFound(true);
          }
        }
      })
      .catch((err) => {
        console.warn("[UserProfilePage] Error fetching public profile:", err);
        if (username === "ceba_stories" || username === "cynthia") {
          setRemoteProfile(CYNTHIA_PROFILE);
          setFollowersCount(CYNTHIA_PROFILE.followersCount);
        } else {
          setProfileNotFound(true);
        }
      })
      .finally(() => {
        if (isMounted) setProfileLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOwnProfile, username, authProfile]);

  // 2. Fetch Author Support Details (GET /api/v1/users/support/:userIdOrUsername)
  useEffect(() => {
    const target = isOwnProfile ? (user?.id || authProfile?.username) : (username || remoteProfile?.id);
    if (!target) return;

    getAuthorSupportDetails(target)
      .then((supportData) => {
        if (supportData) {
          setRemoteProfile((prev) => (prev ? { ...prev, supportDetails: supportData } : null));
        }
      })
      .catch(() => {});
  }, [isOwnProfile, user?.id, authProfile?.username, username, remoteProfile?.id]);

  // 3. Instant Follow Check for Reader (GET /api/v1/users/follow/status/:userId)
  useEffect(() => {
    if (!isOwnProfile && user?.id && profile?.id && profile.id !== "user-cynthia-01") {
      getFollowStatus(profile.id)
        .then((status) => {
          setIsFollowing(status);
        })
        .catch(() => {});
    }
  }, [isOwnProfile, user?.id, profile?.id]);

  // 4. Fetch Dynamic Stories for the Stories Tab (GET /api/v1/stories?author=:username)
  useEffect(() => {
    const authorParam = isOwnProfile
      ? (user?.id || authProfile?.username || "me")
      : (username || profile?.id);

    if (!authorParam) return;

    let isMounted = true;
    setLoadingStories(true);

    getStoriesByAuthor(authorParam)
      .then((stories) => {
        if (!isMounted) return;
        setUserStories(stories || []);
      })
      .catch((err) => {
        console.warn("[UserProfilePage] Error fetching author stories:", err);
      })
      .finally(() => {
        if (isMounted) setLoadingStories(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOwnProfile, user?.id, authProfile?.username, username, profile?.id]);

  // Follow / Unfollow Action (POST / DELETE /api/v1/users/follow/:userId)
  const handleFollowToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const targetUserId = profile.id;
    if (!targetUserId) return;

    const willFollow = !isFollowing;
    setIsFollowing(willFollow);
    setFollowersCount((prev) => (willFollow ? prev + 1 : Math.max(0, prev - 1)));
    setIsTogglingFollow(true);

    try {
      if (willFollow) {
        const res = await followStoryteller(targetUserId);
        if (res.followersCount !== undefined) {
          setFollowersCount(res.followersCount);
        }
      } else {
        const res = await unfollowStoryteller(targetUserId);
        if (res.followersCount !== undefined) {
          setFollowersCount(res.followersCount);
        }
      }
    } catch (err: any) {
      console.warn("[UserProfilePage] Follow action error:", err);
      // Revert optimistic state
      setIsFollowing(!willFollow);
      setFollowersCount((prev) => (willFollow ? Math.max(0, prev - 1) : prev + 1));
    } finally {
      setIsTogglingFollow(false);
    }
  };

  const handleShareProfile = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Dynamic calculations for stats & metrics
  const totalLikes =
    userStories.length > 0
      ? userStories.reduce((acc, s) => acc + (s.likesCount || 0), 0)
      : profile.writingStats?.totalLikes || 0;

  const totalReads =
    userStories.length > 0
      ? userStories.reduce((acc, s) => acc + (s.readsCount || 0), 0)
      : profile.writingStats?.totalReads || 0;

  const publishedCount =
    userStories.length > 0
      ? userStories.filter((s) => s.status === "published").length || userStories.length
      : profile.writingStats?.storiesPublished || 0;

  const followersDisplay = formatCompactNumber(followersCount);
  const likesDisplay = formatCompactNumber(totalLikes);

  // Loading State
  if (profileLoading) {
    return (
      <AuthGuard featureName="Storyteller Profile">
        <div className="flex flex-col items-center justify-center py-24 space-y-4 text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          <p className="text-xs font-semibold">Loading storyteller profile from archives...</p>
        </div>
      </AuthGuard>
    );
  }

  // Storyteller Not Found State
  if (profileNotFound) {
    return (
      <AuthGuard featureName="Storyteller Profile">
        <div className="text-center py-24 px-4 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Storyteller Not Found
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              The author profile @{username} does not exist or may have been updated.
            </p>
          </div>
          <Link href="/explore">
            <Button className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold text-xs rounded-xl px-5">
              <Compass className="w-4 h-4 mr-1.5" /> Explore Storytellers
            </Button>
          </Link>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard featureName="Storyteller Profile">
      <div className="space-y-6 pb-24 max-w-5xl mx-auto font-sans text-stone-900 dark:text-stone-100">
        {/* 1. USER PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pt-2">
          {/* Avatar with Gold Ring & Active Indicator */}
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
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight font-serif">
                    {profile.penName || profile.displayName}
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
                        className="bg-[#D4AF37] hover:bg-[#B89628] text-black rounded-full text-xs font-bold px-4"
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
                      disabled={isTogglingFollow}
                      className={`rounded-full text-xs font-bold px-4 py-2 transition-all ${
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
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Location, Specialty & Joined Date */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {profile.country || "Pan-African"}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                {profile.traditionSpecialty || "Folklore & Mythology"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {formatJoinDate(profile.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. STATS BAR (Followers, Following, Stories, Likes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
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
                {publishedCount}
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
            <span>Stories ({publishedCount})</span>
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
            <span>Badges ({profile.badges?.length || 0})</span>
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

        {/* TAB 1: STORIES (Dynamic Cards Grid from GET /api/v1/stories?author=:username) */}
        {activeTab === "stories" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
                {isOwnProfile ? "Authored Manuscripts" : `Stories by ${profile.penName || profile.displayName}`}
              </h2>
              {isOwnProfile && (
                <Link href="/studio/new">
                  <Button size="sm" variant="ghost" className="text-xs text-[#D4AF37] hover:text-[#B8860B] font-bold">
                    <Plus className="w-3.5 h-3.5 mr-1" /> New Story
                  </Button>
                </Link>
              )}
            </div>

            {loadingStories ? (
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
                    href={`/story/${story.slug || story.id}`}
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
                    {isOwnProfile
                      ? "You haven't written any stories yet. Step into the Creator Studio and craft your first branching interactive legend."
                      : "This storyteller has not published any folklore manuscripts yet."}
                  </p>
                </div>
                {isOwnProfile && (
                  <div className="pt-2">
                    <Link href="/studio/new">
                      <Button className="bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold text-xs rounded-full px-5 py-2.5">
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Pen Your First Tale
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: READING LIST */}
        {activeTab === "reading" && (
          <div className="space-y-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
              Current Reading Journey
            </h2>
            {isOwnProfile ? (
              continueReading.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {continueReading.map((item) => (
                    <Link
                      key={item.storyId}
                      href={`/story/${item.storyId}/read`}
                      className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-[#D4AF37] transition-all group"
                    >
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-stone-700">
                        <SafeImage src={item.coverImage} alt={item.storyTitle} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                          Chapter {item.lastChapterNumber}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate font-serif">
                          {item.storyTitle}
                        </h4>
                        <div className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-[#D4AF37] rounded-full"
                            style={{ width: `${item.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No active reading books. Discover new folklore tales on Explore!
                </div>
              )
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Stories Read</span>
                    <strong className="text-2xl font-black text-[#D4AF37]">
                      {profile.readingStats?.booksRead || 45}
                    </strong>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Chapters Read</span>
                    <strong className="text-2xl font-black text-stone-900 dark:text-white">
                      {profile.readingStats?.chaptersRead || 180}
                    </strong>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 col-span-2 sm:col-span-1">
                    <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Reading Streak</span>
                    <strong className="text-2xl font-black text-[#D4AF37]">
                      {profile.readingStats?.readingStreakDays || 32} Days 🔥
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS & BADGES */}
        {activeTab === "achievements" && (
          <div className="space-y-4 bg-white dark:bg-[#141318] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white font-serif">
              Storyteller Badges & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.badges?.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
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
                  {totalReads.toLocaleString()}
                </strong>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Monthly Active Readers</span>
                <strong className="text-2xl font-black text-stone-900 dark:text-white">
                  {Math.round(totalReads * 0.4).toLocaleString()}
                </strong>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Total Likes</span>
                <strong className="text-2xl font-black text-[#D4AF37]">
                  {totalLikes.toLocaleString()}
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

        {/* Support Author Dialog Modal (GET /api/v1/users/support/:userId) */}
        <SupportAuthorDialog
          authorProfile={profile}
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
      </div>
    </AuthGuard>
  );
}
