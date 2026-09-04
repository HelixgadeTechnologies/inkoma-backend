"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface NetworkUser {
  id: string;
  username: string;
  displayName: string;
  penName?: string;
  avatarUrl: string;
  bio: string;
  specialty?: string;
  followersCount: number;
  isVerified?: boolean;
  isFollowing?: boolean;
}

const MOCK_FOLLOWERS: NetworkUser[] = [
  {
    id: "user-1",
    username: "amina_djenne",
    displayName: "Amina Diallo",
    penName: "Amina of Djenné",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    bio: "Chronicle collector of Songhai empires, Sundiata epics, and West African oral histories.",
    specialty: "Mali Empire / Griot Lore",
    followersCount: 3420,
    isVerified: true,
    isFollowing: true,
  },
  {
    id: "user-2",
    username: "chidi_eze",
    displayName: "Chidi Eze",
    penName: "Nze Chidi",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Writing fantasy romances and Igbo ancestral cosmology stories.",
    specialty: "Romance & Igbo Folklore",
    followersCount: 1890,
    isVerified: true,
    isFollowing: false,
  },
  {
    id: "user-3",
    username: "zola_khumalo",
    displayName: "Zola Khumalo",
    penName: "Zola the Bard",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
    bio: "Exploring Zulu mythology, dark thrillers, and heroic warrior legends.",
    specialty: "Thriller / Zulu Myths",
    followersCount: 4120,
    isVerified: true,
    isFollowing: true,
  },
  {
    id: "user-4",
    username: "tariq_egypt",
    displayName: "Tariq Mansour",
    penName: "Scribe Tariq",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "Architect of Sci-Fi mystery and ancient Nubian constellation archives.",
    specialty: "Sci-Fi & Nubian Mysteries",
    followersCount: 950,
    isVerified: false,
    isFollowing: false,
  },
  {
    id: "user-5",
    username: "nia_adebayo",
    displayName: "Nia Adebayo",
    penName: "Nia of Yorubaland",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Contemporary YA romance and urban urban fantasy writer based in Lagos.",
    specialty: "Young Adult / Romance",
    followersCount: 2780,
    isVerified: true,
    isFollowing: true,
  },
];

const MOCK_FOLLOWING: NetworkUser[] = [
  {
    id: "user-1",
    username: "amina_djenne",
    displayName: "Amina Diallo",
    penName: "Amina of Djenné",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
    bio: "Chronicle collector of Songhai empires, Sundiata epics, and West African oral histories.",
    specialty: "Mali Empire / Griot Lore",
    followersCount: 3420,
    isVerified: true,
    isFollowing: true,
  },
  {
    id: "user-3",
    username: "zola_khumalo",
    displayName: "Zola Khumalo",
    penName: "Zola the Bard",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
    bio: "Exploring Zulu mythology, dark thrillers, and heroic warrior legends.",
    specialty: "Thriller / Zulu Myths",
    followersCount: 4120,
    isVerified: true,
    isFollowing: true,
  },
  {
    id: "user-5",
    username: "nia_adebayo",
    displayName: "Nia Adebayo",
    penName: "Nia of Yorubaland",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Contemporary YA romance and urban urban fantasy writer based in Lagos.",
    specialty: "Young Adult / Romance",
    followersCount: 2780,
    isVerified: true,
    isFollowing: true,
  },
  {
    id: "user-6",
    username: "kofi_mensah",
    displayName: "Kofi Mensah",
    penName: "Kofi of Gold Coast",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    bio: "Creating interactive horror books and trickster tales for digital readers.",
    specialty: "Horror & Interactive Fiction",
    followersCount: 5200,
    isVerified: true,
    isFollowing: true,
  },
];

export default function UserNetworkPage() {
  const params = useParams();
  const username = (params?.username as string) || "kwame_asante";

  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");
  const [searchQuery, setSearchQuery] = useState("");
  const [followersList, setFollowersList] = useState<NetworkUser[]>(MOCK_FOLLOWERS);
  const [followingList, setFollowingList] = useState<NetworkUser[]>(MOCK_FOLLOWING);

  const toggleFollow = (userId: string, isFollowingTab: boolean) => {
    if (isFollowingTab) {
      setFollowingList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u))
      );
    } else {
      setFollowersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u))
      );
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
          href={`/profile/${username}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to @{username}&apos;s Profile</span>
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
            onClick={() => setActiveTab("followers")}
            className={`flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "followers"
                ? "bg-[#D4AF37] dark:bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <span>Followers</span>
            <Badge className="bg-white/20 text-current text-[10px] px-1.5 py-0">
              {followersList.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("following")}
            className={`flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "following"
                ? "bg-[#D4AF37] dark:bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <span>Following</span>
            <Badge className="bg-white/20 text-current text-[10px] px-1.5 py-0">
              {followingList.length}
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
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <Users className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
            No Connections Found
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            No users matched your search query. Try adjusting your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <Link href={`/profile/${user.username}`} className="shrink-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={user.avatarUrl}
                      alt={user.displayName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Link
                      href={`/profile/${user.username}`}
                      className="font-bold text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] text-sm font-serif truncate"
                    >
                      {user.penName || user.displayName}
                    </Link>

                    {user.isVerified && (
                      <Badge className="bg-emerald-600 dark:bg-emerald-700 text-white text-[10px] py-0 px-1.5 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 fill-white text-emerald-600" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    @{user.username}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 pt-0.5">
                    {user.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Meta & Follow Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                {user.specialty ? (
                  <span className="text-[11px] font-semibold text-[#D4AF37] dark:text-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20 dark:border-[#D4AF37]/30">
                    {user.specialty}
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 font-medium">
                    {user.followersCount.toLocaleString()} followers
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <Link href={`/profile/${user.username}`}>
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
                    onClick={() => toggleFollow(user.id, activeTab === "following")}
                    className={`text-xs font-bold rounded-xl gap-1.5 px-3.5 ${
                      user.isFollowing
                        ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-200"
                        : "bg-[#D4AF37] hover:bg-[#B89628] dark:bg-[#D4AF37] dark:hover:bg-[#B89628] text-stone-950 font-bold"
                    }`}
                  >
                    {user.isFollowing ? (
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
