"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { UserProfile } from "@/types";

export function useAuth() {
  try {
    const context = useAuthContext();
    const rawCreated = context.profile?.createdAt;
    let creationDateStr: string = new Date().toISOString();
    if (rawCreated) {
      if (typeof rawCreated === "object" && rawCreated !== null && "toDate" in (rawCreated as Record<string, unknown>)) {
        creationDateStr = ((rawCreated as { toDate: () => Date }).toDate()).toISOString();
      } else if (typeof rawCreated === "string") {
        creationDateStr = rawCreated;
      }
    } else if (context.user?.metadata?.creationTime) {
      creationDateStr = new Date(context.user.metadata.creationTime).toISOString();
    }

    const effectiveDisplayName =
      context.profile?.displayName ||
      context.user?.displayName ||
      (context.user?.email ? context.user.email.split("@")[0] : "Storyteller");

    const effectiveEmail = context.profile?.email || context.user?.email || undefined;
    const effectivePhoto = context.profile?.photoURL || context.user?.photoURL || "";
    const effectiveUid = context.profile?.uid || context.user?.uid || "";

    const rawUsername =
      (context.profile as any)?.username ||
      (effectiveDisplayName
        ? effectiveDisplayName.toLowerCase().replace(/\s+/g, "_")
        : (effectiveEmail ? effectiveEmail.split("@")[0].toLowerCase() : "storyteller"));

    const adaptedProfile: UserProfile | null = (context.profile || context.user)
      ? {
          id: effectiveUid,
          username: rawUsername,
          displayName: effectiveDisplayName,
          penName: context.profile?.penName || effectiveDisplayName,
          email: effectiveEmail,
          avatarUrl: effectivePhoto,
          bio: context.profile?.bio || "Preserving ancestral lore through interactive storytelling.",
          country: context.profile?.country || "Pan-African",
          traditionSpecialty: context.profile?.traditionSpecialty || "Pan-African Folklore",
          role: ((context.profile?.role || "storyteller") as "reader" | "writer" | "storyteller" | "elder_admin"),
          followersCount: (context.profile as any)?.followersCount ?? 0,
          followingCount: (context.profile as any)?.followingCount ?? 0,
          badges: (context.profile as any)?.badges || [],
          createdAt: creationDateStr,
        }
      : null;

    return {
      user: context.user
        ? {
            id: context.user.uid,
            uid: context.user.uid,
            displayName: context.user.displayName,
            photoURL: context.user.photoURL,
            email: context.user.email || undefined,
            emailVerified: context.user.emailVerified,
          }
        : null,
      firebaseUser: context.user,
      profile: adaptedProfile,
      loading: context.loading,
      isAuthenticated: context.isAuthenticated,
      emailVerified: context.emailVerified,
      signIn: async (email?: string, pass?: string) => {
        if (!email || !pass) {
          throw new Error("Email and password are required.");
        }
        return await context.loginWithEmail(email, pass);
      },
      signUp: context.signupWithEmail,
      signInWithGoogle: context.loginWithGoogleProvider,
      signOut: context.logout,
      sendVerification: context.sendVerification,
      checkVerification: context.checkVerification,
      updateProfile: context.updateProfile,
    };
  } catch {
    // Fallback if rendered outside of AuthProvider
    return {
      user: null,
      firebaseUser: null,
      profile: null,
      loading: false,
      isAuthenticated: false,
      emailVerified: false,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      signOut: async () => {},
      sendVerification: async () => {},
      checkVerification: async () => false,
      updateProfile: async () => {},
    };
  }
}
