"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  CheckCheck,
  MessageSquare,
  Heart,
  BookOpen,
  Sparkles,
  Coins,
  Trash2,
  Settings,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface NotificationItem {
  id: string;
  type: "comment" | "like" | "chapter" | "tip" | "system" | "follow";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  link?: string;
  metadata?: {
    storyTitle?: string;
    tipAmount?: string;
  };
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "tip",
    title: "Received Cowrie Tip!",
    description: "Amara Okafor gifted you 500 Cowrie Shells for your interactive chapter 'The Feast of the Baobab Spirit'.",
    timestamp: "12m ago",
    read: false,
    user: {
      name: "Amara Okafor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    },
    link: "/studio",
    metadata: {
      storyTitle: "The Feast of the Baobab Spirit",
      tipAmount: "500 Shells",
    },
  },
  {
    id: "notif-2",
    type: "comment",
    title: "New Chapter Comment",
    description: "Kofi Mensah replied: 'The branch choice leading into the Ashanti forest was incredible! Can't wait for Part 2.'",
    timestamp: "45m ago",
    read: false,
    user: {
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    link: "/story/anansi-calabash",
    metadata: {
      storyTitle: "Anansi & the Sacred Calabash",
    },
  },
  {
    id: "notif-3",
    type: "chapter",
    title: "New Story Chapter Released",
    description: "Elder Nii Armah published Chapter 4: 'Echoes of the Dogon Star Chamber' in Sahel Chronicles.",
    timestamp: "2h ago",
    read: false,
    user: {
      name: "Elder Nii Armah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
    link: "/story/sahel-chronicles",
    metadata: {
      storyTitle: "Sahel Chronicles",
    },
  },
  {
    id: "notif-4",
    type: "like",
    title: "Story Liked",
    description: "Zola Dlamini and 14 others added 'Queen Amina: Sword of Zazzau' to their favorite folklore list.",
    timestamp: "5h ago",
    read: true,
    user: {
      name: "Zola Dlamini",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    link: "/story/queen-amina",
  },
  {
    id: "notif-5",
    type: "follow",
    title: "New Storyteller Follower",
    description: "Tunde Bakare is now following your storyteller circle.",
    timestamp: "1d ago",
    read: true,
    user: {
      name: "Tunde Bakare",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    },
    link: "/profile/tunde_bakare",
  },
  {
    id: "notif-6",
    type: "system",
    title: "Weekly Lore Digest & Leaderboard",
    description: "Your tale 'Anansi & the Sacred Calabash' reached #3 on the Weekly African Folklore Trending list!",
    timestamp: "2d ago",
    read: true,
    link: "/explore",
  },
];

type FilterType = "all" | "unread" | "comments" | "chapters" | "tips";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.read;
    if (activeFilter === "comments") return item.type === "comment" || item.type === "like";
    if (activeFilter === "chapters") return item.type === "chapter";
    if (activeFilter === "tips") return item.type === "tip";
    return true;
  });

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "like":
        return <Heart className="w-4 h-4 text-rose-500 fill-current" />;
      case "chapter":
        return <BookOpen className="w-4 h-4 text-[#680C07]" />;
      case "tip":
        return <Coins className="w-4 h-4 text-amber-600" />;
      case "follow":
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case "system":
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Circle Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-[#680C07] hover:bg-[#520905] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {unreadCount} New
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Stay updated on reader comments, story chapter releases, patron tips, and community lore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs border-stone-300 text-stone-700 hover:bg-stone-100 gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#680C07]" />
              Mark all read
            </Button>
          )}
          <Link href="/settings">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-stone-600 hover:text-stone-900 gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-100">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "all"
              ? "bg-[#680C07] text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          onClick={() => setActiveFilter("unread")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "unread"
              ? "bg-[#680C07] text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setActiveFilter("comments")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "comments"
              ? "bg-[#680C07] text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
          }`}
        >
          Reactions & Comments
        </button>

        <button
          onClick={() => setActiveFilter("chapters")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "chapters"
              ? "bg-[#680C07] text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
          }`}
        >
          Story Releases
        </button>

        <button
          onClick={() => setActiveFilter("tips")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === "tips"
              ? "bg-[#680C07] text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
          }`}
        >
          Tips & Support
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800 font-serif">No notifications here</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {activeFilter === "unread"
              ? "You are all caught up! No unread notifications at the moment."
              : "No notifications found in this category."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
                notif.read
                  ? "bg-white border-stone-200/80 hover:border-stone-300"
                  : "bg-[#680C07]/[0.03] border-[#680C07]/30 shadow-xs ring-1 ring-[#680C07]/10"
              }`}
            >
              {/* Unread Indicator Dot */}
              {!notif.read && (
                <div className="absolute top-5 left-2 w-2 h-2 rounded-full bg-[#680C07]" />
              )}

              {/* Avatar / Icon Badge */}
              <div className="relative flex-shrink-0">
                {notif.user ? (
                  <div className="relative">
                    <Image
                      src={notif.user.avatar}
                      alt={notif.user.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover border border-stone-200 shadow-xs"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white border border-stone-200 shadow-xs">
                      {getNotificationIcon(notif.type)}
                    </div>
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#680C07]/10 border border-[#680C07]/20 flex items-center justify-center text-[#680C07]">
                    {getNotificationIcon(notif.type)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                    {notif.title}
                  </h4>
                  {notif.metadata?.tipAmount && (
                    <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] py-0 px-2 font-bold">
                      +{notif.metadata.tipAmount}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {notif.description}
                </p>

                <div className="flex items-center gap-3 mt-2.5 text-[11px] text-stone-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {notif.timestamp}
                  </span>
                  {notif.link && (
                    <Link
                      href={notif.link}
                      className="text-[#680C07] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    title="Mark as read"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-[#680C07] hover:bg-stone-100 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  title="Delete notification"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
