"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  AuthUser,
  FirestoreUserData,
  signUpUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getUserProfile,
  updateUserProfileDoc,
  onAuthChange,
  sendVerificationEmail,
  checkEmailVerification,
} from "@/src/services/authService";

export interface AuthContextType {
  user: AuthUser | null;
  profile: FirestoreUserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  emailVerified: boolean;
  loginWithEmail: (
    email: string,
    pass: string
  ) => Promise<{ user: AuthUser | null; profile: FirestoreUserData | null }>;
  signupWithEmail: (
    email: string,
    pass: string,
    displayName: string,
    role?: "author" | "reader"
  ) => Promise<void>;
  loginWithGoogleProvider: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<FirestoreUserData>) => Promise<void>;
  sendVerification: () => Promise<void>;
  checkVerification: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<FirestoreUserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userDoc = await getUserProfile(authUser.uid);
        setProfile(userDoc);
      } else {
        // Check local storage fallback
        if (typeof window !== "undefined") {
          const storedAuth = localStorage.getItem("inkoma_authenticated");
          if (storedAuth === "true") {
            const storedProfile = localStorage.getItem("inkoma_user_profile");
            if (storedProfile) {
              try {
                const parsed = JSON.parse(storedProfile);
                setProfile(parsed);
                setUser({
                  uid: parsed.uid || parsed.id || "",
                  id: parsed.uid || parsed.id || "",
                  email: parsed.email || "",
                  displayName: parsed.displayName || "Storyteller",
                  photoURL: parsed.photoURL || "",
                  emailVerified: Boolean(parsed.emailVerified),
                });
              } catch {}
            }
          } else {
            setUser(null);
            setProfile(null);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await loginUser(email, pass);
      if (result.user) setUser(result.user);
      if (result.profile) setProfile(result.profile);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const signupWithEmail = useCallback(
    async (
      email: string,
      pass: string,
      displayName: string,
      role: "author" | "reader" = "author"
    ) => {
      setLoading(true);
      try {
        const result = await signUpUser(email, pass, displayName, role);
        if (result.user) setUser(result.user);
        if (result.profile) setProfile(result.profile);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loginWithGoogleProvider = useCallback(async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.user) setUser(result.user);
      if (result.profile) setProfile(result.profile);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<FirestoreUserData>) => {
      if (profile?.uid) {
        await updateUserProfileDoc(profile.uid, data);
        setProfile((prev) => (prev ? { ...prev, ...data } : null));
      }
    },
    [profile]
  );

  const sendVerification = useCallback(async () => {
    if (user) {
      await sendVerificationEmail(user);
    }
  }, [user]);

  const checkVerification = useCallback(async () => {
    if (!user) return false;
    const isVerified = await checkEmailVerification(user);
    if (isVerified) {
      setUser((prev) => (prev ? { ...prev, emailVerified: true } : null));
      setProfile((prev) => (prev ? { ...prev, emailVerified: true } : null));
    }
    return isVerified;
  }, [user]);

  const isVerified = !!user?.emailVerified || !!profile?.emailVerified;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user || !!profile,
        emailVerified: isVerified,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogleProvider,
        logout,
        updateProfile,
        sendVerification,
        checkVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
