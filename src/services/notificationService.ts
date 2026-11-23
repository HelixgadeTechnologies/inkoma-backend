import { apiClient } from "@/src/services/api";

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
  createdAt?: string;
}

export interface GetNotificationsResult {
  notifications: NotificationItem[];
  unreadCount: number;
  total: number;
  page: number;
  limit: number;
}

export function normalizeNotification(raw: any): NotificationItem {
  if (!raw) {
    return {
      id: "",
      type: "system",
      title: "",
      description: "",
      timestamp: "Just now",
      read: false,
    };
  }

  const id = String(raw._id || raw.id || "");
  const sender = raw.sender || raw.user || {};
  const senderName =
    typeof sender === "string"
      ? sender
      : sender.displayName || sender.name || sender.username || "";
  const senderAvatar =
    typeof sender === "object"
      ? sender.avatarUrl || sender.avatar || sender.photoURL || ""
      : "";

  let timestamp = "Recently";
  if (raw.createdAt) {
    try {
      const diffMs = Date.now() - new Date(raw.createdAt).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffMins < 1) timestamp = "Just now";
      else if (diffMins < 60) timestamp = `${diffMins}m ago`;
      else if (diffHours < 24) timestamp = `${diffHours}h ago`;
      else timestamp = `${diffDays}d ago`;
    } catch {
      timestamp = "Recently";
    }
  }

  return {
    id,
    type: (raw.type as NotificationItem["type"]) || "system",
    title: raw.title || "Notification",
    description: raw.description || raw.message || raw.content || "",
    timestamp: raw.timestamp || timestamp,
    read: Boolean(raw.read || raw.isRead),
    user: senderName
      ? {
          name: senderName,
          avatar:
            senderAvatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        }
      : undefined,
    link: raw.link || raw.targetUrl || undefined,
    metadata: raw.metadata || {},
    createdAt: raw.createdAt,
  };
}

/**
 * 3. Notifications Center
 * GET /api/v1/notifications (Protected)
 * Returns paginated notifications with unreadCount.
 */
export async function getNotifications(options: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
} = {}): Promise<GetNotificationsResult> {
  try {
    const params: Record<string, string | number | boolean> = {
      page: options.page || 1,
      limit: options.limit || 30,
    };
    if (options.unreadOnly) params.unreadOnly = true;

    const res = await apiClient.get<any>("/notifications", { params });
    const data = res?.data || res || {};

    const rawList: any[] =
      data.notifications || data.items || (Array.isArray(data) ? data : []);

    const notifications = rawList.map(normalizeNotification);
    const unreadCount = Number(
      data.unreadCount ??
        notifications.filter((n) => !n.read).length
    );

    return {
      notifications,
      unreadCount,
      total: Number(data.total ?? notifications.length),
      page: Number(data.page ?? (options.page || 1)),
      limit: Number(data.limit ?? (options.limit || 30)),
    };
  } catch (error) {
    console.warn("[NotificationService] Failed to fetch notifications:", error);
    return {
      notifications: [],
      unreadCount: 0,
      total: 0,
      page: options.page || 1,
      limit: options.limit || 30,
    };
  }
}

/**
 * PATCH /api/v1/notifications/:id/read (Protected)
 * Mark single notification as read.
 */
export async function markNotificationAsRead(id: string): Promise<boolean> {
  if (!id) return false;
  try {
    await apiClient.patch(`/notifications/${encodeURIComponent(id)}/read`, {});
    return true;
  } catch (error) {
    console.warn(`[NotificationService] Failed to mark notification ${id} as read:`, error);
    return false;
  }
}

/**
 * PATCH /api/v1/notifications/read-all (Protected)
 * Mark all user notifications as read.
 */
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    await apiClient.patch("/notifications/read-all", {});
    return true;
  } catch (error) {
    console.warn("[NotificationService] Failed to mark all notifications as read:", error);
    return false;
  }
}

/**
 * DELETE /api/v1/notifications/:id (Protected)
 * Delete single notification.
 */
export async function deleteNotification(id: string): Promise<boolean> {
  if (!id) return false;
  try {
    await apiClient.delete(`/notifications/${encodeURIComponent(id)}`);
    return true;
  } catch (error) {
    console.warn(`[NotificationService] Failed to delete notification ${id}:`, error);
    return false;
  }
}

/**
 * DELETE /api/v1/notifications (Protected)
 * Clear all notifications.
 */
export async function clearAllNotifications(): Promise<boolean> {
  try {
    await apiClient.delete("/notifications");
    return true;
  } catch (error) {
    console.warn("[NotificationService] Failed to clear all notifications:", error);
    return false;
  }
}
