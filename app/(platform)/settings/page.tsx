"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";
import { uploadAvatarImage } from "@/src/services/storageService";
import {
  User,
  Heart,
  Bell,
  Check,
  Sparkles,
  Save,
  Camera,
  Shield,
  Building2,
  CreditCard,
  Lock,
  Key,
  AlertCircle,
  Loader2,
  Phone,
  AtSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/components/shared/auth-guard";

type SettingsTab = "profile" | "creator_support" | "privacy" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const { user } = useAuth();
  const {
    userProfile,
    updateProfile,
    updateSupportDetails,
    privacySettings,
    updatePrivacySettings,
    notificationSettings,
    updateNotificationSettings,
    updatePassword,
    isLoading,
    isSaving,
  } = useSettings();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Form State
  const [displayName, setDisplayName] = useState(userProfile.displayName || "");
  const [username, setUsername] = useState(userProfile.username || "");
  const [penName, setPenName] = useState(userProfile.penName || "");
  const [phone, setPhone] = useState(userProfile.phone || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Creator Support Form State
  const [bankName, setBankName] = useState(userProfile.supportDetails?.bankName || "");
  const [accountName, setAccountName] = useState(userProfile.supportDetails?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(userProfile.supportDetails?.accountNumber || "");
  const [paystackLink, setPaystackLink] = useState(userProfile.supportDetails?.paystackLink || "");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [tabError, setTabError] = useState<string | null>(null);

  // Sync profile values when backend fetch completes
  useEffect(() => {
    if (userProfile) {
      if (userProfile.displayName) setDisplayName(userProfile.displayName);
      if (userProfile.username) setUsername(userProfile.username);
      if (userProfile.penName !== undefined) setPenName(userProfile.penName);
      if (userProfile.phone !== undefined) setPhone(userProfile.phone);
      if (userProfile.bio !== undefined) setBio(userProfile.bio);
      if (userProfile.avatarUrl) setAvatarUrl(userProfile.avatarUrl);
      if (userProfile.supportDetails) {
        if (userProfile.supportDetails.bankName) setBankName(userProfile.supportDetails.bankName);
        if (userProfile.supportDetails.accountName) setAccountName(userProfile.supportDetails.accountName);
        if (userProfile.supportDetails.accountNumber) setAccountNumber(userProfile.supportDetails.accountNumber);
        if (userProfile.supportDetails.paystackLink) setPaystackLink(userProfile.supportDetails.paystackLink);
      }
    }
  }, [userProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setTabError("Please select a valid image file (JPEG, PNG, WebP).");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setTabError("Avatar image must be under 2MB.");
        return;
      }
      setAvatarFile(file);
      setTabError(null);

      // Local preview
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Immediate upload to Cloudinary via POST /api/v1/users/me/avatar
      try {
        setIsUploadingAvatar(true);
        showToast("Uploading profile avatar...");
        const cdnUrl = await uploadAvatarImage(file, user?.id);
        setAvatarUrl(cdnUrl);
        // Also sync profile with new avatar URL
        await updateProfile({ avatarUrl: cdnUrl });
        showToast("Profile avatar updated successfully!");
      } catch (err: any) {
        console.warn("[Settings] Avatar upload error:", err);
        setTabError(err?.message || "Failed to upload avatar image.");
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setTabError(null);

    // Basic username validation if provided
    if (username && !/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      setTabError("Username must be 3-30 alphanumeric characters or underscores.");
      return;
    }

    try {
      await updateProfile({
        displayName: displayName.trim(),
        username: username.trim().toLowerCase(),
        penName: penName.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        avatarUrl,
      });
      showToast("Profile settings saved successfully!");
    } catch (err: any) {
      setTabError(err?.message || "Failed to save profile. Please try again.");
    }
  };

  const handleSaveSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    setTabError(null);

    const cleanAccount = accountNumber.trim();
    if (cleanAccount && !/^\d{10}$/.test(cleanAccount)) {
      setTabError("Bank account number must be exactly 10 digits.");
      return;
    }

    if (!bankName.trim() || !cleanAccount || !accountName.trim()) {
      setTabError("Please fill in Bank Name, 10-digit Account Number, and Account Holder Name.");
      return;
    }

    try {
      await updateSupportDetails({
        bankName: bankName.trim(),
        accountNumber: cleanAccount,
        accountHolderName: accountName.trim(),
        paystackLink: paystackLink.trim(),
      });
      showToast("Creator payout & banking details saved successfully!");
    } catch (err: any) {
      setTabError(err?.message || "Failed to save banking details.");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setTabError(null);

    if (newPassword.length < 8) {
      setTabError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setTabError("New passwords do not match! Please check and try again.");
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);
      showToast("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setTabError(err?.message || "Failed to update password. Check your current password.");
    }
  };

  return (
    <AuthGuard featureName="Account Settings">
      <div className="space-y-8 pb-16">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
            Account & Settings
          </h1>
          <p className="text-sm text-stone-600">
            Manage your personal profile, author payout details, privacy, and preferences.
          </p>
        </div>

        {/* Global Loading State */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-stone-500 py-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
            Loading settings from server...
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setActiveTab("profile");
              setTabError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "profile"
                ? "bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile Settings
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("creator_support");
              setTabError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "creator_support"
                ? "bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Creator Support & Bank Payout
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("privacy");
              setTabError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "privacy"
                ? "bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy & Security
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("notifications");
              setTabError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "notifications"
                ? "bg-[#D4AF37] text-stone-950 font-bold shadow-sm"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </button>
        </div>

        {/* Tab Error Banner */}
        {tabError && (
          <div className="max-w-2xl bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <div className="flex-1 font-medium">{tabError}</div>
          </div>
        )}

        {/* Tab 1: Profile Settings */}
        {activeTab === "profile" && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl"
          >
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
                disabled={isUploadingAvatar}
                className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-stone-100 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 transition-transform hover:scale-105"
                title="Click to upload profile photo"
              >
                <Image
                  src={
                    avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  }
                  alt="Avatar"
                  fill
                  unoptimized
                  className="object-cover transition-opacity group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUploadingAvatar ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mb-0.5" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Upload</span>
                    </>
                  )}
                </div>
              </button>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-stone-900">Profile Photo</h3>
                <p className="text-xs text-stone-500">
                  Click on the circle to upload a photo directly to Cloudinary (JPEG, PNG, WebP, max 2MB).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Full Name
                  </label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    placeholder="e.g. Kwame Mensah"
                    className="bg-white border-stone-300 text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                    <AtSign className="w-3.5 h-3.5 text-stone-400" /> Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="kwame_folklore"
                    className="bg-white border-stone-300 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" /> Phone Number
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="bg-white border-stone-300 text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Author Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short bio with your readers..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold text-xs rounded-xl px-6 py-5 flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Profile
              </Button>
            </div>
          </form>
        )}

        {/* Tab 2: Creator Support & Bank Details */}
        {activeTab === "creator_support" && (
          <form
            onSubmit={handleSaveSupport}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
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
                    required
                    className="bg-white border-stone-300 text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-stone-400" /> Account Number (10 Digits)
                  </label>
                  <Input
                    placeholder="10-digit Account Number"
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                    required
                    className="bg-white border-stone-300 text-stone-900 font-mono"
                  />
                  {accountNumber && accountNumber.length !== 10 && (
                    <p className="text-[10px] text-amber-600 font-medium">
                      Must be exactly 10 digits ({accountNumber.length}/10 entered)
                    </p>
                  )}
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
                  required
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-bold text-xs rounded-xl px-6 py-5 flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Banking Details
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
                  <Key className="w-4 h-4 text-[#D4AF37]" /> Change Password
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
                  placeholder="New Password (min. 8 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
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

              <Button
                type="submit"
                disabled={isSaving}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs rounded-xl flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                Update Password
              </Button>
            </form>

            {/* Privacy Toggles */}
            <div className="pt-6 border-t border-stone-100 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 font-serif">Community Privacy Controls</h3>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Public Profile</span>
                    <span className="text-stone-500">Allow your author profile to be discoverable in community searches</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.publicProfile ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updatePrivacySettings({ publicProfile: val });
                        showToast(`Public Profile ${val ? "enabled" : "disabled"}`);
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update privacy setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Public Reading Activity</span>
                    <span className="text-stone-500">Allow community members to view your saved quotes and reading milestones</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.showReadingActivity ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updatePrivacySettings({ showReadingActivity: val });
                        showToast(`Reading Activity visibility updated`);
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update privacy setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Allow Followers</span>
                    <span className="text-stone-500">Permit readers and peers to follow your storytelling profile</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.allowFollowers ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updatePrivacySettings({ allowFollowers: val });
                        showToast(`Followers permissions updated`);
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update privacy setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Public Reading History</span>
                    <span className="text-stone-500">Display recently read folklore stories in your public profile</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.publicReadingHistory ?? false}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updatePrivacySettings({ publicReadingHistory: val });
                        showToast(`Reading history visibility updated`);
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update privacy setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
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
              <Bell className="w-4 h-4 text-[#D4AF37]" /> Circle Notification Preferences
            </h3>

            {/* Email Notifications */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Email Notifications
              </h4>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">New Chapters & Releases</span>
                    <span className="text-stone-500">Email alerts when authors you follow publish new story chapters</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNewChapters ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ emailNewChapters: val });
                        showToast("Email preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Comments & Discussions</span>
                    <span className="text-stone-500">Email alerts for comments and reader discussions on your stories</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailComments ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ emailComments: val });
                        showToast("Email preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Patron Support & Tips</span>
                    <span className="text-stone-500">Email notifications when supporters tip or support you via Paystack</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailPatronSupport ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ emailPatronSupport: val });
                        showToast("Email preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Weekly Folklore Digest</span>
                    <span className="text-stone-500">Curated weekly highlights of African folklore and trending tales</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.weeklyFolkloreDigest ?? false}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ weeklyFolkloreDigest: val });
                        showToast("Digest preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* In-App / Platform Alerts */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                In-App Platform Alerts
              </h4>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">New Chapter Alerts</span>
                    <span className="text-stone-500">Instant notification when stories you follow add new chapters</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.newChapterAlerts ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ newChapterAlerts: val });
                        showToast("Alert preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Discussion Replies</span>
                    <span className="text-stone-500">Alerts when someone replies to your community posts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.commentReplies ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ commentReplies: val });
                        showToast("Alert preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Patron Support & Tips</span>
                    <span className="text-stone-500">Alerts when a reader tips or sends creator support</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.patronTips ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ patronTips: val });
                        showToast("Alert preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100/50 transition-colors">
                  <div>
                    <span className="font-bold text-stone-900 block">Community Announcements</span>
                    <span className="text-stone-500">Folklore competitions, grant opportunities, and platform updates</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.communityAnnouncements ?? true}
                    onChange={async (e) => {
                      const val = e.target.checked;
                      try {
                        await updateNotificationSettings({ communityAnnouncements: val });
                        showToast("Alert preferences updated");
                      } catch (err: any) {
                        setTabError(err?.message || "Failed to update notification setting");
                      }
                    }}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
