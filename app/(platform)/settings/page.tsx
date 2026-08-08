"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useSettings } from "@/hooks/useSettings";
import {
  User,
  Heart,
  Shield,
  Bell,
  Check,
  Building2,
  CreditCard,
  Lock,
  Sparkles,
  Save,
  Key,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SettingsTab = "profile" | "creator_support" | "privacy" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const {
    userProfile,
    updateProfile,
    updateSupportDetails,
    privacySettings,
    updatePrivacySettings,
    notificationSettings,
    updateNotificationSettings,
  } = useSettings();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Form State
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [penName, setPenName] = useState(userProfile.penName || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || "");

  // Creator Support Form State
  const [bankName, setBankName] = useState(userProfile.supportDetails?.bankName || "");
  const [accountName, setAccountName] = useState(userProfile.supportDetails?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(userProfile.supportDetails?.accountNumber || "");
  const [paystackLink, setPaystackLink] = useState(userProfile.supportDetails?.paystackLink || "");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Please select a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
          showToast("Profile photo selected! Click 'Save Profile' to save changes.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      penName,
      bio,
      avatarUrl,
    });
    showToast("Profile settings saved successfully!");
  };

  const handleSaveSupport = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupportDetails({
      bankName,
      accountName,
      accountNumber,
      paystackLink,
    });
    showToast("Creator payout & patron details updated!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match! Please check and try again.");
      return;
    }
    showToast("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
          Account & Circle Settings
        </h1>
        <p className="text-sm text-stone-600">
          Manage your personal profile, author payout details, privacy, and notifications.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "profile"
              ? "bg-[#680C07] text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Profile Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("creator_support")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "creator_support"
              ? "bg-[#680C07] text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Creator Support & Bank Payout
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "privacy"
              ? "bg-[#680C07] text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Privacy & Security
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "notifications"
              ? "bg-[#680C07] text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </button>
      </div>

      {/* Tab 1: Profile Settings */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-[#680C07] bg-stone-100 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#680C07] focus:ring-offset-2 transition-transform hover:scale-105"
              title="Click to upload profile photo"
            >
              <Image
                src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                alt="Avatar"
                fill
                className="object-cover transition-opacity group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 mb-0.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Upload</span>
              </div>
            </button>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-stone-900">Profile Photo</h3>
              <p className="text-xs text-stone-500">
                Click on the circle to upload a photo directly from your device.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Full Name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Author Pen Name
              </label>
              <Input
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
                placeholder="Kwame of Ashanti"
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Author Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-[#680C07] hover:bg-[#520905] text-white font-bold text-xs rounded-xl px-6 py-5">
              <Save className="w-4 h-4 mr-2" /> Save Profile
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Creator Support & Bank Details */}
      {activeTab === "creator_support" && (
        <form onSubmit={handleSaveSupport} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 text-[#680C07] border border-[#680C07]/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#680C07]" />
              Patron Donations & Royalties
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              African Banking & Paystack Settings
            </h2>
            <p className="text-xs text-stone-500">
              Readers and folklore lovers can support you directly. These details appear on your stories and profile.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Paystack Payment / Tip Link
              </label>
              <Input
                type="url"
                placeholder="https://paystack.com/pay/your-handle"
                value={paystackLink}
                onChange={(e) => setPaystackLink(e.target.value)}
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-stone-400" /> Bank Name
                </label>
                <Input
                  placeholder="e.g. Access Bank / KCB / Standard Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-stone-400" /> Account Number
                </label>
                <Input
                  placeholder="10-digit Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="bg-white border-stone-300 text-stone-900 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Account Holder Name
              </label>
              <Input
                placeholder="Name as registered with the bank"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-[#680C07] hover:bg-[#520905] text-white font-bold text-xs rounded-xl px-6 py-5">
              <Save className="w-4 h-4 mr-2" /> Save Banking Details
            </Button>
          </div>
        </form>
      )}

      {/* Tab 3: Privacy & Security */}
      {activeTab === "privacy" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8 max-w-2xl">
          {/* Change Password */}
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <Key className="w-4 h-4 text-[#680C07]" /> Change Password
              </h2>
              <p className="text-xs text-stone-500">Ensure your account is protected with a strong password.</p>
            </div>

            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white border-stone-300 text-stone-900"
              />
            </div>

            <Button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white text-xs rounded-xl">
              Update Password
            </Button>
          </form>

          {/* Privacy Toggles */}
          <div className="pt-6 border-t border-stone-100 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 font-serif">Privacy Controls</h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-bold text-stone-900 block">Public Reading Activity</span>
                  <span className="text-stone-500">Allow community members to view your saved quotes</span>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showReadingActivity}
                  onChange={(e) => updatePrivacySettings({ showReadingActivity: e.target.checked })}
                  className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-bold text-stone-900 block">Public Profile</span>
                  <span className="text-stone-500">Allow your author profile to be discoverable in community searches</span>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.publicProfile}
                  onChange={(e) => updatePrivacySettings({ publicProfile: e.target.checked })}
                  className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#680C07]" /> Circle Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">New Chapter Releases</span>
                <span className="text-stone-500">Get notified when authors you follow publish new branches</span>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.newChapterAlerts}
                onChange={(e) => updateNotificationSettings({ newChapterAlerts: e.target.checked })}
                className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Discussion Replies</span>
                <span className="text-stone-500">Receive alerts when someone replies to your community posts</span>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.commentReplies}
                onChange={(e) => updateNotificationSettings({ commentReplies: e.target.checked })}
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Patron Support & Tips</span>
                <span className="text-stone-500">Receive instant alerts when someone tips or supports your story</span>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.patronTips}
                onChange={(e) => updateNotificationSettings({ patronTips: e.target.checked })}
                className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Community Announcements</span>
                <span className="text-stone-500">Folklore competitions, grant opportunities, and platform updates</span>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.communityAnnouncements}
                onChange={(e) => updateNotificationSettings({ communityAnnouncements: e.target.checked })}
                className="rounded text-[#680C07] focus:ring-[#680C07] w-4 h-4"
              />
            </label>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
