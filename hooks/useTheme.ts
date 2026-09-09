"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark] = useState(false);

  useEffect(() => {
    // Always enforce light theme across the platform
    document.documentElement.classList.remove("dark");
    localStorage.setItem("inkoma_theme", "light");
  }, []);

  const toggle = () => {
    // Light mode enforced
    document.documentElement.classList.remove("dark");
    localStorage.setItem("inkoma_theme", "light");
  };

  return { isDark: false, toggle };
}
