"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Story } from "@/types";
import {
  Lock,
  Sparkles,
  BookOpen,
  Volume2,
  GitFork,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialAuth } from "@/components/features/auth/social-auth";

interface StoryReadingAuthDialogProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
  selectedChapterNumber?: number;
}

export function StoryReadingAuthDialog({
  story,
  isOpen,
  onClose,
  selectedChapterNumber = 1,
}: StoryReadingAuthDialogProps) {
  const router = useRouter();
  const readUrl = `/story/${story.id}/read`;
  const signupUrl = `/signup?redirect=${encodeURIComponent(readUrl)}`;
  const loginUrl = `/login?redirect=${encodeURIComponent(readUrl)}`;

  const handleGoogleSuccess = () => {
    onClose();
    router.push(readUrl);
  };

  const chaptersCount = story.chapters?.length || 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-white border border-stone-200 shadow-2xl rounded-3xl p-6 sm:p-7 space-y-5 text-stone-900 overflow-hidden">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B] flex items-center justify-center shadow-inner">
            <Lock className="w-5 h-5" />
          </div>
          <DialogTitle className="text-xl font-bold font-serif text-stone-900">
            Sign In to Read Story
          </DialogTitle>
          <DialogDescription className="text-xs text-stone-500">
            Join the Inkoma community to unlock all {chaptersCount} chapters and interactive folklore choices.
          </DialogDescription>
        </DialogHeader>

        {/* Story Snapshot Card */}
        <div className="flex items-center gap-3.5 p-3.5 bg-stone-50 border border-stone-200 rounded-2xl">
          <div className="relative w-14 h-18 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge className="bg-[#D4AF37]/15 text-[#B8860B] border-0 text-[10px] font-bold py-0 px-1.5">
                {story.tradition}
              </Badge>
              <span className="text-[11px] text-stone-400 font-medium">
                {chaptersCount} {chaptersCount === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
            <p className="text-sm font-bold text-stone-900 font-serif line-clamp-1">
              {story.title}
            </p>
            <p className="text-xs text-stone-500 truncate">
              By {story.authorPenName || story.authorName}
            </p>
          </div>
        </div>

        {/* Membership Perks */}
        <div className="space-y-2 py-1 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B8860B] shrink-0" />
            <span>Read Chapter {selectedChapterNumber} & all branching oral episodes</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#B8860B] shrink-0" />
            <span>Make choices that reshape folklore outcomes</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#B8860B] shrink-0" />
            <span>Synchronized oral audio narration & offline reading</span>
          </div>
        </div>

        {/* Auth CTA Actions */}
        <div className="space-y-2.5 pt-2">
          {/* Quick Google Sign In */}
          <SocialAuth onSuccess={handleGoogleSuccess} />

          <div className="relative my-2 text-center text-xs">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              Or with email
            </span>
          </div>

          <Link href={signupUrl} className="block w-full">
            <Button className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold py-2.5 text-xs rounded-xl shadow-xs gap-1.5 cursor-pointer">
              <UserPlus className="w-4 h-4" />
              Register Free to Read
            </Button>
          </Link>

          <Link href={loginUrl} className="block w-full">
            <Button
              variant="outline"
              className="w-full border-stone-200 hover:bg-stone-50 text-stone-700 font-bold py-2.5 text-xs rounded-xl gap-1.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Already have an account? Log In
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
