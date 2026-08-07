import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}) {
  return (
    <div className="relative w-full max-w-md">
      {/* Glow highlight */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-folklore-terracotta via-folklore-amber to-folklore-gold opacity-20 blur-xl"></div>

      <Card className="relative border-folklore-amber/30 bg-folklore-obsidian/95 p-2 sm:p-4 shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-folklore-terracotta to-folklore-amber text-folklore-night shadow-lg">
            <Sparkles className="h-6 w-6 fill-current" />
          </div>
          <CardTitle className="text-2xl font-serif font-bold text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-neutral-400 max-w-xs mx-auto">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">{children}</CardContent>

        {footerText && footerLinkHref && (
          <CardFooter className="justify-center text-xs text-neutral-400 pt-4">
            <span>{footerText}</span>{" "}
            <Link
              href={footerLinkHref}
              className="ml-1 font-semibold text-folklore-gold hover:underline"
            >
              {footerLinkText}
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
