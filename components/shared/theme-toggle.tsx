'use client';

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-neutral-300 hover:text-folklore-amber"
      title="Toggle Light/Night Lore Mode"
    >
      {isDark ? <Sun className="h-4 w-4 text-folklore-gold" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
