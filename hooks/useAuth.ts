"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "@/types";
import { MOCK_CURRENT_USER } from "@/config/mock-data";

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const authState = localStorage.getItem("inkoma_authenticated");
      // Default: if inkoma_authenticated is explicitly "true", set authenticated user.
      // If "false" or null (guest), set user to null.
      if (authState === "true") {
        setUser({ id: MOCK_CURRENT_USER.id, email: "kwame@inkoma.app" });
        setProfile(MOCK_CURRENT_USER);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback((email?: string) => {
    localStorage.setItem("inkoma_authenticated", "true");
    setUser({ id: MOCK_CURRENT_USER.id, email: email || "kwame@inkoma.app" });
    setProfile(MOCK_CURRENT_USER);
  }, []);

  const signOut = useCallback(() => {
    localStorage.setItem("inkoma_authenticated", "false");
    setUser(null);
    setProfile(null);
  }, []);

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };
}
