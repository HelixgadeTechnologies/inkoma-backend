"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  UserPlus,
  UserCheck,
  Search,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Users,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AuthGuard } from "@/components/shared/auth-guard";
import { useAuth } from "@/hooks/useAuth";
import {
  followStoryteller,
  unfollowStoryteller,
  getUserFollowers,
  getUserFollowing,
  NetworkUser,
} from "@/src/services/userService";

function NetworkLoadingSkeleton() {
  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto animate-pulse">
      <div className="h-6 w-36 bg-stone-200 dark:bg-stone-800 rounded-lg" />
      <div className="space-y-2">
        <div className="h-8 w-64 bg-stone-200 dark:bg-stone-800 rounded-lg" />
        <div className="h-4 w-96 bg-stone-200 dark:bg-stone-800 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800" />
        ))}
      </div>
    </div>
  );
}

function UserNetworkContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile: authProfile } = useAuth();

  const rawParamUsername = params?.username as string;
  const username = rawParamUsername || authProfile?.username || "storyteller";

  const tabParam = searchParams?.get("tab");
  const initialTab = tabParam === "following" ? "following" : "followers";
  const [activeTab, setActiveTab] = useState<"followers" | "following">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [followersList, setFollowersList] = useState<NetworkUser[]>([]);
  const [followingList, setFollowingList] = useState<NetworkUser[]>([]);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingTotal, setFollowingTotal] = useState(0);

  // Sync activeTab when query param changes
  useEffect(() => {
    if (tabParam === "following" || tabParam === "followers") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Debounce search input to query API smoothly
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch initial total counts for both tabs
  useEffect(() => {
    let isCancelled = false;
    async function fetchCounts() {
      try {
        const [fRes, ingRes] = await Promise.all([
          getUserFollowers(username, { page: 1, limit: 1 }),
          getUserFollowing(username, { page: 1, limit: 1 }),
        ]);
        if (!isCancelled) {
          setFollowersTotal(fRes.pagination.total);
          setFollowingTotal(ingRes.pagination.total);
        }
      } catch (err) {
        console.warn("[NetworkPage] Error fetching counts:", err);
      }
    }
    if (username) {
      fetchCounts();
    }
    return () => {
      isCancelled = true;
    };
  }, [username]);

  // Fetch active tab users whenever tab, username, or search changes
  useEffect(() => {
    let isCancelled = false;

    async function loadNetworkData() {
      setIsLoading(true);
      try {
        if (activeTab === "followers") {
          const res = await getUserFollowers(username, {
            page: 1,
            limit: 50,
            search: debouncedSearch.trim() || undefined,
          });
          if (!isCancelled) {
            setFollowersList(res.users);
            setFollowersTotal(res.pagination.total);
          }
        } else {
          const res = await getUserFollowing(username, {
            page: 1,
            limit: 50,
            search: debouncedSearch.trim() || undefined,
          });
          if (!isCancelled) {
            setFollowingList(res.users);
            setFollowingTotal(res.pagination.total);
          }
        }
      } catch (err) {
        console.error("[NetworkPage] Error loading connections:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    if (username) {
      loadNetworkData();
    }

    return () => {
      isCancelled = true;
    };
  }, [username, activeTab, debouncedSearch]);

  const handleTabChange = (tab: "followers" | "following") => {
    setActiveTab(tab);
    const basePath = rawParamUsername ? `/profile/${rawParamUsername}/network` : "/profile/network";
    router.replace(`${basePath}?tab=${tab}`, { scroll: false });
  };

  const toggleFollow = async (userId: string, isFollowingTab: boolean) => {
    const list = isFollowingTab ? followingList : followersList;
    const target = list.find((u) => u.id === userId);
    if (!target) return;
    const willFollow = !target.isFollowing;

    // Optimistic update
    if (isFollowingTab) {
      setFollowingList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isFollowing: willFollow } : u))
      );
    } else {
      setFollowersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isFollowing: willFollow } : u))
      );
    }

    try {
      if (willFollow) {
        await followStoryteller(userId);
      } else {
        await unfollowStoryteller(userId);
      }
    } catch (err) {
      console.error("Failed to update follow status:", err);
      // Revert on error
      if (isFollowingTab) {
        setFollowingList((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isFollowing: !willFollow } : u))
        );
      } else {
        setFollowersList((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isFollowing: !willFollow } : u))
        );
      }
    }
  };

  const currentList = activeTab === "followers" ? followersList : followingList;
  const filteredList = currentList.filter(
    (u) =>
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.penName && u.penName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.specialty && u.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <Link
          href={rawParamUsername ? `/profile/${rawParamUsername}` : "/profile"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {rawParamUsername ? `@${rawParamUsername}'s` : "Your"} Profile</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] dark:text-[#D4AF37] flex items-center gap-1.5">
          <Users className="w-4 h-4" /> Community Network
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
          Followers & Following
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Discover readers, authors, and collaborators connected with @{username}.
        </p>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={() => handleTabChange("followers")}
            className={`flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "followers"
                ? "bg-[#D4AF37] dark:bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <span>Followers</span>
            <Badge className="bg-white/20 text-current text-[10px] px-1.5 py-0">
              {followersTotal || followersList.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("following")}
            className={`flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "following"
                ? "bg-[#D4AF37] dark:bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <span>Following</span>
            <Badge className="bg-white/20 text-current text-[10px] px-1.5 py-0">
              {followingTotal || followingList.length}
            </Badge>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search connections..."
            className="pl-10 text-xs bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl"
          />
        </div>
      </div>

      {/* Network User Cards List */}
      {isLoading && currentList.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
            />
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <Users className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
            {searchQuery
              ? "No Connections Found"
              : activeTab === "followers"
              ? "No Followers Yet"
              : "Not Following Anyone"}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {searchQuery
              ? "No users matched your search query. Try adjusting your search term."
              : activeTab === "followers"
              ? `@${username} does not have any followers yet.`
              : `@${username} is not following any storytellers yet.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((netUser) => (
            <div
              key={netUser.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <Link href={`/profile/${netUser.username}`} className="shrink-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={netUser.avatarUrl}
                      alt={netUser.displayName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Link
                      href={`/profile/${netUser.username}`}
                      className="font-bold text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] text-sm font-serif truncate"
                    >
                      {netUser.penName || netUser.displayName}
                    </Link>

                    {netUser.isVerified && (
                      <Badge className="bg-emerald-600 dark:bg-emerald-700 text-white text-[10px] py-0 px-1.5 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 fill-white text-emerald-600" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    @{netUser.username}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 pt-0.5">
                    {netUser.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Meta & Follow Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                {netUser.specialty ? (
                  <span className="text-[11px] font-semibold text-[#D4AF37] dark:text-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
                    {netUser.specialty}
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 font-medium">
                    {netUser.followersCount.toLocaleString()} followers
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <Link href={`/profile/${netUser.username}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-3"
                    >
                      Profile
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    onClick={() => toggleFollow(netUser.id, activeTab === "following")}
                    className={`text-xs font-bold rounded-xl gap-1.5 px-3.5 ${
                      netUser.isFollowing
                        ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-200"
                        : "bg-[#D4AF37] hover:bg-[#B89628] dark:bg-[#D4AF37] dark:hover:bg-[#B89628] text-stone-950 font-bold"
                    }`}
                  >
                    {netUser.isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" /> Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" /> Follow
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserNetworkPage() {
  return (
    <AuthGuard featureName="Storyteller Network">
      <Suspense fallback={<NetworkLoadingSkeleton />}>
        <UserNetworkContent />
      </Suspense>
    </AuthGuard>
  );
}
