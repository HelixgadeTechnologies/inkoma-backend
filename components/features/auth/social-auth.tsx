'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";

export function SocialAuth() {
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null);

  const handleOAuth = (provider: string) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="space-y-2.5">
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleOAuth("google")}
        className="w-full gap-2.5 h-11 border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 shadow-sm"
        disabled={loadingProvider !== null}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
