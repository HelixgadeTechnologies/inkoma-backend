"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile, CreatorSupportDetails } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import {
  getCurrentUserProfile,
  updateUserProfile,
  updateUserBanking,
  changeUserPassword,
  updateUserPrivacy,
  updateUserNotificationSettings,
  FullUserProfile,
  PrivacySettings,
  NotificationSettings,
  UpdateBankingPayload,
} from "@/src/services/userService";

const DEFAULT_EMPTY_PROFILE: UserProfile = {
  id: "",
  username: "",
  displayName: "",
  email: "",
  avatarUrl: "",
  bio: "",
  country: "",
  phone: "",
  traditionSpecialty: "",
  role: "reader",
  followersCount: 0,
  followingCount: 0,
  badges: [],
  createdAt: new Date().toISOString(),
};

export type { PrivacySettings, NotificationSettings };

export function useSettings() {
  const { profile: authProfile, updateProfile: updateAuthProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(authProfile || DEFAULT_EMPTY_PROFILE);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNewChapters: true,
    emailComments: true,
    emailPatronSupport: true,
    weeklyFolkloreDigest: false,
    newChapterAlerts: true,
    commentReplies: true,
    patronTips: true,
    communityAnnouncements: true,
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    publicProfile: true,
    publicReadingHistory: false,
    allowFollowers: true,
    showReadingActivity: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showSaveIndicator = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // 1. Initial profile fetch from backend /users/me
  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load cached local values first
      try {
        const storedProfile = localStorage.getItem("inkoma_profile");
        const storedNotifs = localStorage.getItem("inkoma_notifs");
        const storedPrivacy = localStorage.getItem("inkoma_privacy");

        if (storedProfile) setProfile((prev) => ({ ...prev, ...JSON.parse(storedProfile) }));
        if (storedNotifs) setNotifications((prev) => ({ ...prev, ...JSON.parse(storedNotifs) }));
        if (storedPrivacy) setPrivacy((prev) => ({ ...prev, ...JSON.parse(storedPrivacy) }));
      } catch {}

      const remoteData: FullUserProfile | null = await getCurrentUserProfile();

      if (remoteData) {
        setProfile((prev) => {
          const next: UserProfile = {
            ...prev,
            id: remoteData.id || prev.id,
            username: remoteData.username || prev.username,
            displayName: remoteData.name || remoteData.displayName || prev.displayName,
            email: remoteData.email || prev.email,
            avatarUrl: remoteData.avatarUrl || prev.avatarUrl,
            penName: remoteData.penName || prev.penName,
            bio: remoteData.bio || prev.bio,
            phone: remoteData.phone || prev.phone,
            supportDetails: {
              ...prev.supportDetails,
              bankName: remoteData.banking?.bankName || prev.supportDetails?.bankName || "",
              accountNumber: remoteData.banking?.accountNumber || prev.supportDetails?.accountNumber || "",
              accountName: remoteData.banking?.accountHolderName || prev.supportDetails?.accountName || "",
            },
          };
          try {
            localStorage.setItem("inkoma_profile", JSON.stringify(next));
          } catch {}
          return next;
        });

        if (remoteData.privacy) {
          setPrivacy((prev) => {
            const next = { ...prev, ...remoteData.privacy };
            try {
              localStorage.setItem("inkoma_privacy", JSON.stringify(next));
            } catch {}
            return next;
          });
        }

        if (remoteData.notifications) {
          setNotifications((prev) => {
            const next = { ...prev, ...remoteData.notifications };
            try {
              localStorage.setItem("inkoma_notifs", JSON.stringify(next));
            } catch {}
            return next;
          });
        }
      }
    } catch (err: any) {
      console.warn("[useSettings] Failed to fetch settings from backend:", err);
      setError(err?.message || "Failed to load user settings");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // 2. Update Profile (/api/v1/users/me/profile)
  const updateProfileHandler = async (updates: Partial<UserProfile>): Promise<void> => {
    setIsSaving(true);
    setError(null);
    try {
      const payload = {
        name: updates.displayName || profile.displayName,
        username: updates.username !== undefined ? updates.username : profile.username,
        penName: updates.penName !== undefined ? updates.penName : profile.penName,
        bio: updates.bio !== undefined ? updates.bio : profile.bio,
        phone: updates.phone !== undefined ? updates.phone : profile.phone,
        avatarUrl: updates.avatarUrl !== undefined ? updates.avatarUrl : profile.avatarUrl,
      };

      const updated = await updateUserProfile(payload);

      setProfile((prev) => {
        const next: UserProfile = {
          ...prev,
          displayName: updated.name || updated.displayName || prev.displayName,
          username: updated.username || prev.username,
          penName: updated.penName || prev.penName,
          bio: updated.bio || prev.bio,
          phone: updated.phone || prev.phone,
          avatarUrl: updated.avatarUrl || prev.avatarUrl,
        };
        try {
          localStorage.setItem("inkoma_profile", JSON.stringify(next));
        } catch {}
        return next;
      });

      if (updateAuthProfile) {
        updateAuthProfile({
          ...(payload.name && { displayName: payload.name }),
          ...(payload.penName && { penName: payload.penName }),
          ...(payload.bio !== undefined && { bio: payload.bio }),
          ...(payload.avatarUrl && { photoURL: payload.avatarUrl }),
        }).catch((err) => {
          console.warn("[useSettings] Sync to auth profile warning:", err);
        });
      }

      showSaveIndicator();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to update profile";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Update Banking (/api/v1/users/me/banking)
  const updateBankingHandler = async (details: {
    bankName: string;
    accountNumber: string;
    accountHolderName: string;
    paystackLink?: string;
  }): Promise<void> => {
    setIsSaving(true);
    setError(null);
    try {
      const payload: UpdateBankingPayload = {
        bankName: details.bankName.trim(),
        accountNumber: details.accountNumber.trim(),
        accountHolderName: details.accountHolderName.trim(),
      };

      await updateUserBanking(payload);

      setProfile((prev) => {
        const next: UserProfile = {
          ...prev,
          supportDetails: {
            ...prev.supportDetails,
            bankName: payload.bankName,
            accountNumber: payload.accountNumber,
            accountName: payload.accountHolderName,
            paystackLink: details.paystackLink !== undefined ? details.paystackLink : prev.supportDetails?.paystackLink,
          },
        };
        try {
          localStorage.setItem("inkoma_profile", JSON.stringify(next));
        } catch {}
        return next;
      });

      showSaveIndicator();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to update banking details";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Change Password (/api/v1/users/me/password)
  const updatePasswordHandler = async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    setIsSaving(true);
    setError(null);
    try {
      await changeUserPassword({ currentPassword, newPassword });
      showSaveIndicator();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to change password";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Update Privacy Settings (/api/v1/users/me/privacy)
  const updatePrivacyHandler = async (updates: Partial<PrivacySettings>): Promise<void> => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateUserPrivacy(updates);
      setPrivacy((prev) => {
        const next = { ...prev, ...updated };
        try {
          localStorage.setItem("inkoma_privacy", JSON.stringify(next));
        } catch {}
        return next;
      });
      showSaveIndicator();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Failed to update privacy settings";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Update Notification Settings (/api/v1/users/me/notifications)
  const updateNotificationsHandler = async (
    updates: Partial<NotificationSettings>
  ): Promise<void> => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateUserNotificationSettings(updates);
      setNotifications((prev) => {
        const next = { ...prev, ...updated };
        try {
          localStorage.setItem("inkoma_notifs", JSON.stringify(next));
        } catch {}
        return next;
      });
      showSaveIndicator();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to update notification preferences";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    userProfile: profile,
    notifications,
    notificationSettings: notifications,
    privacy,
    privacySettings: privacy,
    isLoading,
    isSaving,
    isSaved,
    error,
    refetch: fetchSettings,
    updateProfile: updateProfileHandler,
    updateSupportDetails: updateBankingHandler,
    updateBanking: updateBankingHandler,
    updatePassword: updatePasswordHandler,
    updateNotifications: updateNotificationsHandler,
    updateNotificationSettings: updateNotificationsHandler,
    updatePrivacy: updatePrivacyHandler,
    updatePrivacySettings: updatePrivacyHandler,
  };
}
