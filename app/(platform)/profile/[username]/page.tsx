"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MOCK_CURRENT_USER, MOCK_STORIES } from "@/config/mock-data";
import { SupportAuthorDialog } from "@/components/features/story-details/support-author-dialog";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UserProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const [isFollowing, setIsFollowing] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);

  const profile = MOCK_CURRENT_USER;
  const publishedStories = MOCK_STORIES.filter((s) => s.authorId === profile.id || s.authorPenName === profile.penName);

  const handleCopyAcc = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-stone-100 shrink-0">
              <Image
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                alt={profile.displayName}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  {profile.penName || profile.displayName}
                </h1>
                <Badge className="bg-amber-100 text-amber-900 border border-amber-300 text-xs">
                  {profile.role === "writer" ? "Master Storyteller" : "Reader"}
                </Badge>
              </div>
              <p className="text-xs text-stone-500 font-mono">@{profile.username}</p>
              <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
                <Calendar className="w-3.5 h-3.5" /> Joined {profile.createdAt}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`border-stone-300 rounded-xl text-xs flex-1 sm:flex-none ${
                isFollowing ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold" : "bg-white text-stone-700"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 mr-1 text-amber-600" /> Following
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 mr-1" /> Follow
                </>
              )}
            </Button>

            <Button
              onClick={() => setShowSupportModal(true)}
              className="bg-[#680C07] hover:bg-[#520905] text-white rounded-xl text-xs font-semibold shadow-xs flex-1 sm:flex-none"
            >
              <Heart className="w-3.5 h-3.5 mr-1 fill-white" />
              Support Author
            </Button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-stone-700 leading-relaxed max-w-3xl">
          {profile.bio}
        </p>

        {/* Followers & Counts */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-100 text-xs text-stone-600">
          <div>
            <strong className="text-stone-900 text-sm font-bold">{profile.followersCount}</strong> Followers
          </div>
          <div>
            <strong className="text-stone-900 text-sm font-bold">{profile.followingCount}</strong> Following
          </div>
          <div>
            <strong className="text-stone-900 text-sm font-bold">{profile.writingStats?.totalLikes || 1800}</strong> Total Likes
          </div>
        </div>
      </div>

      {/* Writing & Reading Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Writing Stats */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Flame className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Storytelling Statistics
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Stories Authored</span>
              <p className="text-xl font-bold text-stone-900">{profile.writingStats?.storiesAuthored || publishedStories.length}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Chapters Penned</span>
              <p className="text-xl font-bold text-stone-900">{profile.writingStats?.chaptersAuthored || 14}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Total Reads</span>
              <p className="text-xl font-bold text-stone-900">{profile.writingStats?.totalReads.toLocaleString() || "12,400"}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Patron Support</span>
              <p className="text-xl font-bold text-amber-800">${profile.supportDetails?.totalTipsReceived || 1250}</p>
            </div>
          </div>
        </div>

        {/* Reading Stats */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Reader Journeys
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Stories Completed</span>
              <p className="text-xl font-bold text-stone-900">{profile.readingStats?.storiesRead || 18}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Chapters Explored</span>
              <p className="text-xl font-bold text-stone-900">{profile.readingStats?.chaptersRead || 46}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Hours at the Hearth</span>
              <p className="text-xl font-bold text-stone-900">{profile.readingStats?.hoursRead || 32}h</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-stone-400">Branches Discovered</span>
              <p className="text-xl font-bold text-stone-900">{profile.readingStats?.branchesDiscovered || 28}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Published Stories by Author */}
      <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-lg font-bold text-stone-900 font-serif">
            Authored Folklore Manuscripts ({publishedStories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col bg-white rounded-2xl border border-stone-200 p-4 justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex gap-3">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                  <Image src={story.coverImage} alt={story.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 space-y-1">
                  <Badge className="bg-amber-100 text-amber-900 text-[10px]">
                    {story.tradition}
                  </Badge>
                  <Link href={`/story/${story.id}`}>
                    <h4 className="text-sm font-bold text-stone-900 truncate font-serif hover:text-amber-700">
                      {story.title}
                    </h4>
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span>{story.readsCount} reads</span>
                    <span>•</span>
                    <span>{story.likesCount} likes</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <Link href={`/story/${story.id}`}>
                  <Button size="sm" variant="outline" className="text-xs rounded-xl">
                    View Details
                  </Button>
                </Link>
                <Link href={`/story/${story.id}/read`}>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs rounded-xl">
                    Read Story
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Creator Support Box on Profile */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#680C07]/20 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#680C07]" />
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Support {profile.penName || profile.displayName}&apos;s Storyteller Circle
          </h2>
        </div>
        <p className="text-xs text-stone-600 max-w-xl leading-relaxed">
          Your patron tips go 100% directly to this storyteller to support folklore research, village elder interviews, and new interactive chapter releases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Paystack CTA */}
          <a
            href={profile.supportDetails?.paystackLink || "https://paystack.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-6 rounded-2xl shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> Paystack Support Link
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>

          {/* Copy Account Box */}
          <div className="p-3 bg-white rounded-2xl border border-amber-300 flex items-center justify-between text-xs">
            <div>
              <p className="text-stone-500">{profile.supportDetails?.bankName} • {profile.supportDetails?.accountName}</p>
              <p className="font-mono font-bold text-stone-900 text-sm">{profile.supportDetails?.accountNumber}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopyAcc(profile.supportDetails?.accountNumber || "")}
              className="text-xs rounded-xl border-amber-300"
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
      <SupportAuthorDialog
        authorProfile={profile}
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
}
