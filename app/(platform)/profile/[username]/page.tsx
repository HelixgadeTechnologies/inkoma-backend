"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { UserProfile, Story } from "@/types";
import { MOCK_CURRENT_USER, MOCK_STORIES } from "@/config/mock-data";
import { SupportAuthorDialog } from "@/components/features/story-details/support-author-dialog";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import {
  User,
  Heart,
  BookOpen,
  Eye,
  Clock,
  Flame,
  Building2,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  UserPlus,
  UserCheck,
  Calendar,
  ShieldCheck,
  Sliders,
  Plus,
  Share2,
  Award,
  Trees,
  Volume2,
  Shield,
  Layers,
  Lock,
  LogOut,
  Bell,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const MOCK_USER_PROFILES: Record<string, UserProfile> = {
  kwame_asante: MOCK_CURRENT_USER,
  amina_diallo: {
    id: "user-amina-02",
    username: "amina_diallo",
    displayName: "Amina Diallo",
    penName: "Amina of Djenné",
    bio: "Sahel historian, poet, and griot preserving epic Manden poetry and ancient royal dynasties of West Africa.",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    country: "Mali",
    role: "storyteller",
    traditionSpecialty: "Pan-African",
    createdAt: "2025-08-14",
    followersCount: 3820,
    followingCount: 142,
    onboardingCompleted: true,
    writingStats: {
      storiesPublished: 8,
      draftStories: 1,
      totalChaptersPublished: 24,
      totalReads: 54800,
      totalLikes: 4190,
      totalComments: 680,
    },
    readingStats: {
      booksRead: 34,
      chaptersRead: 112,
      readingStreakDays: 28,
      favoriteGenres: ["Historical Epics", "Warrior Lore"],
      interests: ["Manden Epics", "Djenné History", "Oral Poetry"],
    },
    supportDetails: {
      paystackLink: "https://paystack.com/pay/amina-diallo",
      bankName: "Bank of Africa Mali",
      accountName: "Amina Diallo",
      accountNumber: "9876543210",
      isAcceptingSupport: true,
    },
    badges: [
      {
        id: "badge-sahel",
        name: "Sahel Historian",
        description: "Preserved 5+ ancient Sahel kingdom epics",
        iconName: "Shield",
        tier: "elder",
        unlockedAt: "2025-11-20",
      },
      {
        id: "badge-master-griot",
        name: "Master Griot",
        description: "Performed 20,000+ oral recitations",
        iconName: "Volume2",
        tier: "gold",
        unlockedAt: "2026-01-10",
      },
    ],
  },
  chief_adebayo: {
    id: "user-adebayo-03",
    username: "chief_adebayo",
    displayName: "Chief Adebayo Olawale",
    penName: "Adebayo Olawale (Storyteller of Oyo)",
    bio: "Yoruba traditional archivist, playwright, and narrator of coastal legends, Mami Wata mysteries, and Orisha lore.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    country: "Nigeria",
    role: "storyteller",
    traditionSpecialty: "Yoruba",
    createdAt: "2025-09-02",
    followersCount: 2940,
    followingCount: 105,
    onboardingCompleted: true,
    writingStats: {
      storiesPublished: 6,
      draftStories: 3,
      totalChaptersPublished: 18,
      totalReads: 32100,
      totalLikes: 2780,
      totalComments: 410,
    },
    readingStats: {
      booksRead: 22,
      chaptersRead: 78,
      readingStreakDays: 19,
      favoriteGenres: ["Spiritual Lore", "Orisha Mythos"],
      interests: ["Coastal Delta", "Yoruba Rituals", "Ancestral Voices"],
    },
    supportDetails: {
      paystackLink: "https://paystack.com/pay/chief-adebayo",
      bankName: "First Bank of Nigeria",
      accountName: "Adebayo Olawale",
      accountNumber: "3019284756",
      isAcceptingSupport: true,
    },
    badges: [
      {
        id: "badge-orisha",
        name: "Orisha Guardian",
        description: "Authored 4+ Yoruba spirit realm narratives",
        iconName: "Flame",
        tier: "gold",
        unlockedAt: "2025-12-05",
      },
    ],
  },
  oumar_sangare: {
    id: "user-oumar-04",
    username: "oumar_sangare",
    displayName: "Oumar Sangare",
    penName: "Oumar Sangare the Astrologer",
    bio: "Bandiagara escarpment scholar documenting ancient cliff architecture, Sigui rituals, and Dogon star maps.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    country: "Mali",
    role: "storyteller",
    traditionSpecialty: "Dogon",
    createdAt: "2025-11-10",
    followersCount: 2150,
    followingCount: 76,
    onboardingCompleted: true,
    writingStats: {
      storiesPublished: 4,
      draftStories: 1,
      totalChaptersPublished: 14,
      totalReads: 19800,
      totalLikes: 1740,
      totalComments: 310,
    },
    readingStats: {
      booksRead: 15,
      chaptersRead: 52,
      readingStreakDays: 12,
      favoriteGenres: ["Cosmology & Astronomy", "Afrofuturism"],
      interests: ["Sirius Star Dancers", "Sigui Rituals"],
    },
    supportDetails: {
      paystackLink: "https://paystack.com/pay/oumar-sangare",
      bankName: "Ecobank Mali",
      accountName: "Oumar Sangare",
      accountNumber: "4567890123",
      isAcceptingSupport: true,
    },
    badges: [
      {
        id: "badge-star",
        name: "Star Dancers Elder",
        description: "Preserved ancient Sirius constellation maps",
        iconName: "Sparkles",
        tier: "elder",
        unlockedAt: "2026-01-25",
      },
    ],
  },
};

export default function UserProfilePage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername ? rawUsername.toLowerCase() : "";

  // Determine if viewing own profile
  const isOwnProfile = !username || username === MOCK_CURRENT_USER.username.toLowerCase();

  // Retrieve user profile data
  const profile: UserProfile = isOwnProfile
    ? MOCK_CURRENT_USER
    : MOCK_USER_PROFILES[username] || {
        id: `user-${username || "guest"}`,
        username: username || "storyteller",
        displayName: (username ? username.replace(/_/g, " ") : "African Storyteller").replace(/\b\w/g, (l) => l.toUpperCase()),
        penName: `${(username ? username.replace(/_/g, " ") : "African Storyteller").replace(/\b\w/g, (l) => l.toUpperCase())}`,
        bio: "Preserver of living African folklore, traditional trickster tales, and ancestral oral wisdom.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        country: "Pan-African",
        role: "storyteller",
        traditionSpecialty: "Pan-African",
        createdAt: "2025-10-01",
        followersCount: 1240,
        followingCount: 65,
        onboardingCompleted: true,
        writingStats: {
          storiesPublished: 3,
          draftStories: 1,
          totalChaptersPublished: 10,
          totalReads: 14200,
          totalLikes: 1120,
          totalComments: 230,
        },
        readingStats: {
          booksRead: 14,
          chaptersRead: 42,
          readingStreakDays: 10,
          favoriteGenres: ["Trickster Lore", "Historical Epics"],
          interests: ["Oral Performance", "Branching Destinies"],
        },
        supportDetails: {
          paystackLink: "https://paystack.com",
          bankName: "Pan-African Bank",
          accountName: username || "Storyteller",
          accountNumber: "0123456789",
          isAcceptingSupport: true,
        },
        badges: [
          {
            id: "badge-storyteller",
            name: "Circle Storyteller",
            description: "Active contributor to the Inkoma oral archives",
            iconName: "Sparkles",
            tier: "gold",
            unlockedAt: "2026-01-01",
          },
        ],
      };

  // State
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followersCount);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"stories" | "stats" | "badges" | "settings">("stories");

  // Settings State
  const [settingsName, setSettingsName] = useState(profile.displayName);
  const [settingsUsername, setSettingsUsername] = useState(profile.username);
  const [settingsBio, setSettingsBio] = useState(profile.bio || "");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Authored stories matching this profile
  const publishedStories = MOCK_STORIES.filter(
    (s) =>
      s.authorId === profile.id ||
      s.authorName?.toLowerCase() === profile.displayName?.toLowerCase() ||
      s.authorPenName?.toLowerCase() === profile.penName?.toLowerCase() ||
      (profile.username === "kwame_asante" && s.authorId === "user-kwame-01")
  );

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const handleCopyAcc = (acc: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(acc);
      setCopiedAcc(true);
      setTimeout(() => setCopiedAcc(false), 2500);
    }
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header Hero */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-9 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Avatar & User Info */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#680C07] dark:border-red-500 shadow-md bg-stone-100 dark:bg-stone-800 shrink-0">
              <Image
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                alt={profile.displayName}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
                  {profile.penName || profile.displayName}
                </h1>
                <Badge className="bg-emerald-600 dark:bg-emerald-700 text-white border-0 text-xs px-2.5 py-0.5 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  Verified Author
                </Badge>
              </div>

              {/* Followers & Following Stats - Positioned Higher Up */}
              <div className="flex items-center gap-4 text-xs font-medium text-stone-700 dark:text-stone-300">
                <Link
                  href={`/profile/${profile.username}/network`}
                  className="cursor-pointer hover:underline hover:text-[#680C07] dark:hover:text-red-400 transition-colors"
                >
                  <strong className="text-stone-900 dark:text-stone-100 text-sm font-extrabold">{followersCount.toLocaleString()}</strong> Followers
                </Link>
                <span>•</span>
                <Link
                  href={`/profile/${profile.username}/network`}
                  className="cursor-pointer hover:underline hover:text-[#680C07] dark:hover:text-red-400 transition-colors"
                >
                  <strong className="text-stone-900 dark:text-stone-100 text-sm font-extrabold">{profile.followingCount}</strong> Following
                </Link>
                <span>•</span>
                <span className="font-mono text-stone-500 dark:text-stone-400">@{profile.username}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {isOwnProfile ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("settings")}
                  className={`rounded-xl text-xs font-bold gap-1.5 border-stone-300 dark:border-stone-700 ${
                    activeTab === "settings"
                      ? "bg-[#680C07] text-white dark:bg-red-700"
                      : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" /> Settings
                </Button>

                <Link href="/studio/new" className="flex-1 sm:flex-none">
                  <Button className="w-full bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl text-xs font-bold gap-1.5 shadow-sm">
                    <Plus className="w-4 h-4 stroke-[3]" /> Create New Story
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleFollowToggle}
                  className={`border-stone-300 dark:border-stone-700 rounded-xl text-xs flex-1 sm:flex-none font-bold ${
                    isFollowing
                      ? "bg-[#680C07]/10 dark:bg-red-500/20 border-[#680C07]/20 text-[#680C07] dark:text-red-400"
                      : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 mr-1.5 text-[#680C07] dark:text-red-400" /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Follow Author
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => setShowSupportModal(true)}
                  className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-xs flex-1 sm:flex-none"
                >
                  <Heart className="w-3.5 h-3.5 mr-1.5 fill-white" />
                  Support Author
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShareProfile}
                  className="border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900"
                  title="Share profile link"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl font-medium">
          {profile.bio}
        </p>

        {/* Engagement Summary */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 font-medium">
          <div>
            <strong className="text-stone-900 dark:text-stone-100 text-sm font-bold">
              {(profile.writingStats?.totalReads || 38420).toLocaleString()}
            </strong> Total Reads
          </div>
          <div>
            <strong className="text-stone-900 dark:text-stone-100 text-sm font-bold">
              {(profile.writingStats?.totalLikes || 2840).toLocaleString()}
            </strong> Story Likes
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("stories")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "stories"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Authored Books ({publishedStories.length})
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "stats"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Author & Reader Metrics
        </button>

        <button
          onClick={() => setActiveTab("badges")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "badges"
              ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Badges & Achievements ({profile.badges?.length || 3})
        </button>

        {isOwnProfile && (
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "settings"
                ? "bg-[#680C07] dark:bg-red-700 text-white shadow-sm"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Account Settings
          </button>
        )}
      </div>

      {/* TAB 1: AUTHORED MANUSCRIPTS */}
      {activeTab === "stories" && (
        <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Folklore Manuscripts by {profile.penName || profile.displayName}
            </h2>
            {isOwnProfile && (
              <Link href="/studio">
                <Button size="sm" variant="outline" className="text-xs rounded-xl border-stone-300">
                  Manage in Writer Studio
                </Button>
              </Link>
            )}
          </div>

          {publishedStories.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-stone-500 text-xs font-medium">
                No published manuscripts available yet.
              </p>
              {isOwnProfile && (
                <Link href="/studio/new">
                  <Button className="bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold">
                    Write First Story
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {publishedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-[16/10] w-full bg-stone-100">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <Badge className="bg-stone-900/80 text-white text-[10px] backdrop-blur-xs">
                        {story.tradition}
                      </Badge>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-200" /> {story.estimatedReadTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-400 fill-current" /> {story.likesCount}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#680C07] uppercase tracking-wider block">
                        {story.mainGenre}
                      </span>
                      <Link href={`/story/${story.id}`}>
                        <h3 className="text-sm font-bold text-stone-900 font-serif group-hover:text-[#680C07] transition-colors line-clamp-1">
                          {story.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {story.synopsis}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <Link href={`/story/${story.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs rounded-xl border-stone-300">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/story/${story.id}/read`} className="flex-1">
                        <Button size="sm" className="w-full bg-[#680C07] hover:bg-[#520905] text-white text-xs font-bold rounded-xl">
                          Read
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STORYTELLING & READER STATS */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Writing Stats */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Flame className="w-5 h-5 text-[#680C07]" />
              <h2 className="text-base font-bold text-stone-900 font-serif">
                Storytelling Statistics
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Stories Authored</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {profile.writingStats?.storiesPublished || publishedStories.length}
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Chapters Penned</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {profile.writingStats?.totalChaptersPublished || 28}
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Total Reads</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {(profile.writingStats?.totalReads || 38420).toLocaleString()}
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Patron Support</span>
                <p className="text-2xl font-extrabold text-[#680C07] font-serif">
                  ${profile.supportDetails?.totalTipsReceived || 1250}
                </p>
              </div>
            </div>
          </div>

          {/* Reading Journey */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <BookOpen className="w-5 h-5 text-[#680C07]" />
              <h2 className="text-base font-bold text-stone-900 font-serif">
                Reader Journey Metrics
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Stories Completed</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {profile.readingStats?.booksRead || 19}
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Chapters Explored</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {profile.readingStats?.chaptersRead || 64}
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Reading Streak</span>
                <p className="text-2xl font-extrabold text-stone-900 font-serif">
                  {profile.readingStats?.readingStreakDays || 14} Days
                </p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-medium">Tradition Focus</span>
                <p className="text-sm font-bold text-stone-900 truncate">
                  {profile.traditionSpecialty || "Pan-African"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BADGES & ACHIEVEMENTS */}
      {activeTab === "badges" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Ancestral Badges & Folklore Honor
            </h2>
            <p className="text-xs text-stone-500">
              Unlocked achievements earned through story preservation and oral performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(profile.badges || []).map((badge) => (
              <div
                key={badge.id}
                className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-3 space-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#680C07]/10 border border-[#680C07]/20 text-[#680C07] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-stone-900 font-serif">
                      {badge.name}
                    </h3>
                    <Badge className="bg-[#680C07] text-white text-[9px] uppercase font-bold py-0 px-1.5">
                      {badge.tier}
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pt-0.5">
                    {badge.description}
                  </p>
                  <span className="text-[10px] text-stone-400 block pt-1">
                    Unlocked {badge.unlockedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ACCOUNT SETTINGS (Embedded in Profile) */}
      {activeTab === "settings" && isOwnProfile && (
        <div className="space-y-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                Account & Profile Settings
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage your public profile details, account credentials, and platform preferences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Edit Profile */}
            <div className="space-y-4 p-5 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 font-bold text-sm text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-2">
                <User className="w-4 h-4 text-[#680C07] dark:text-red-400" />
                <span>Public Profile Info</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Display Name</label>
                <Input
                  value={settingsName}
                  onChange={(e) => setSettingsName(e.target.value)}
                  className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Username</label>
                <Input
                  value={settingsUsername}
                  onChange={(e) => setSettingsUsername(e.target.value)}
                  className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Bio</label>
                <textarea
                  rows={3}
                  value={settingsBio}
                  onChange={(e) => setSettingsBio(e.target.value)}
                  className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                />
              </div>

              <Button
                type="button"
                onClick={() => {
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 2000);
                }}
                className="bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white text-xs font-bold rounded-xl gap-1.5 w-full py-2.5"
              >
                {settingsSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{settingsSaved ? "Profile Saved!" : "Save Profile Details"}</span>
              </Button>
            </div>

            {/* Section 2: Password & Security */}
            <div className="space-y-4 p-5 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <Lock className="w-4 h-4 text-[#680C07] dark:text-red-400" />
                  <span>Security & Password</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Current Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-xs"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (currentPassword && newPassword) {
                      setPasswordSaved(true);
                      setCurrentPassword("");
                      setNewPassword("");
                      setTimeout(() => setPasswordSaved(false), 2000);
                    }
                  }}
                  className="border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold rounded-xl gap-1.5 w-full py-2.5"
                >
                  {passwordSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{passwordSaved ? "Password Updated!" : "Update Password"}</span>
                </Button>
              </div>

              {/* Log Out Button */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-bold rounded-xl gap-2 py-2.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Account</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PATRON SUPPORT & BANKING BOX */}
      <div className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-3xl border border-[#680C07]/20 dark:border-stone-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#680C07]" />
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              Support {profile.penName || profile.displayName}&apos;s Circle
            </h2>
          </div>
          {isOwnProfile && (
            <Link href="/settings">
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-stone-300">
                Edit Payout Settings
              </Button>
            </Link>
          )}
        </div>

        <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
          Patron support goes directly to this storyteller to enable research trips, village elder recordings, and new interactive manuscript episodes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Paystack Button */}
          <a
            href={profile.supportDetails?.paystackLink || "https://paystack.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-[#680C07] hover:bg-[#520905] text-white font-bold py-6 rounded-2xl shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> Paystack Patron Tip Link
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>

          {/* Copy Account Info Box */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <p className="text-stone-500">
                {profile.supportDetails?.bankName || "Access Bank"} • {profile.supportDetails?.accountName || profile.displayName}
              </p>
              <p className="font-mono font-bold text-stone-900 text-sm">
                {profile.supportDetails?.accountNumber || "0123456789"}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopyAcc(profile.supportDetails?.accountNumber || "0123456789")}
              className="text-xs rounded-xl border-stone-300"
            >
              {copiedAcc ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy Acc
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Support Author Dialog Modal */}
      {!isOwnProfile && (
        <SupportAuthorDialog
          authorProfile={profile}
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
      )}

      {/* Styled Log Out Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
        }}
        title="Log Out of INKOMA"
        description="Are you sure you want to log out of your account session? You can log back in anytime to continue reading and writing."
        confirmText="Log Out"
        cancelText="Stay Logged In"
        variant="danger"
      />
    </div>
  );
}
