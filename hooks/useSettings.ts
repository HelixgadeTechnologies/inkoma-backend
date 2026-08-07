"use client";

import { useState, useEffect } from "react";
import { UserProfile, CreatorSupportDetails } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export interface NotificationSettings {
  emailNewChapters?: boolean;
  emailComments?: boolean;
  emailPatronSupport?: boolean;
  weeklyFolkloreDigest?: boolean;
  newChapterAlerts?: boolean;
  commentReplies?: boolean;
  patronTips?: boolean;
  communityAnnouncements?: boolean;
}

export interface PrivacySettings {
  publicProfile?: boolean;
  publicReadingHistory?: boolean;
  allowFollowers?: boolean;
  showReadingActivity?: boolean;
}

export function useSettings() {
  const [profile, setProfile] = useState<UserProfile>(MOCK_CURRENT_USER);
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
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("inkoma_profile");
      const storedNotifs = localStorage.getItem("inkoma_notifs");
      const storedPrivacy = localStorage.getItem("inkoma_privacy");

      if (storedProfile) setProfile(JSON.parse(storedProfile));
      if (storedNotifs) setNotifications((prev) => ({ ...prev, ...JSON.parse(storedNotifs) }));
      if (storedPrivacy) setPrivacy((prev) => ({ ...prev, ...JSON.parse(storedPrivacy) }));
    } catch {
      // fallback
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("inkoma_profile", JSON.stringify(next));
      } catch {}
      return next;
    });
    showSaveIndicator();
  };

  const updateSupportDetails = (details: Partial<CreatorSupportDetails>) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        supportDetails: {
          ...prev.supportDetails,
          ...details,
        },
      };
      try {
        localStorage.setItem("inkoma_profile", JSON.stringify(next));
      } catch {}
      return next;
    });
    showSaveIndicator();
  };

  const updateNotifications = (updates: Partial<NotificationSettings>) => {
    setNotifications((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("inkoma_notifs", JSON.stringify(next));
      } catch {}
      return next;
    });
    showSaveIndicator();
  };

  const updatePrivacy = (updates: Partial<PrivacySettings>) => {
    setPrivacy((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("inkoma_privacy", JSON.stringify(next));
      } catch {}
      return next;
    });
    showSaveIndicator();
  };

  const showSaveIndicator = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return {
    profile,
    userProfile: profile,
    notifications,
    notificationSettings: notifications,
    privacy,
    privacySettings: privacy,
    isSaved,
    updateProfile,
    updateSupportDetails,
    updateNotifications,
    updateNotificationSettings: updateNotifications,
    updatePrivacy,
    updatePrivacySettings: updatePrivacy,
  };
}
