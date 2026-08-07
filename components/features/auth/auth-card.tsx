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
      <Card className="relative border-stone-200 bg-white p-2 sm:p-4 shadow-xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#680C07] text-white shadow-md">
            <Sparkles className="h-6 w-6 fill-current" />
          </div>
          <CardTitle className="text-2xl font-serif font-bold text-stone-900">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-stone-600 max-w-xs mx-auto font-medium">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">{children}</CardContent>

        {footerText && footerLinkHref && (
          <CardFooter className="justify-center text-xs text-stone-600 pt-4 font-medium">
            <span>{footerText}</span>{" "}
            <Link
              href={footerLinkHref}
              className="ml-1 font-bold text-folklore-amber hover:underline"
            >
              {footerLinkText}
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
