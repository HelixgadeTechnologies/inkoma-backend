"use client";

import { useState } from "react";
import Image from "next/image";
import { Story, UserProfile } from "@/types";
import {
  Heart,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Building2,
  User,
  CreditCard,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SupportAuthorDialogProps {
  story?: Story;
  authorProfile?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export function SupportAuthorDialog({
  story,
  authorProfile,
  isOpen,
  onClose,
}: SupportAuthorDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const penName = story?.authorPenName || authorProfile?.penName || authorProfile?.displayName || "Griot Storyteller";
  const avatar = story?.authorAvatar || authorProfile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";
  const bio = story?.authorBio || authorProfile?.bio || "Traditional African storyteller preserving oral mythology and branching folklore manuscripts.";
  
  const bankName = authorProfile?.supportDetails?.bankName || "Access Bank Plc";
  const accountName = authorProfile?.supportDetails?.accountName || (authorProfile?.displayName || "Kwame Kofi Asante");
  const accountNumber = authorProfile?.supportDetails?.accountNumber || "0123456789";
  const paystackLink = authorProfile?.supportDetails?.paystackLink || "https://paystack.com/pay/kwame-griot";

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-white border border-stone-200 shadow-2xl rounded-3xl p-6 sm:p-7 space-y-5">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-amber-600 text-amber-600" />
          </div>
          <DialogTitle className="text-2xl font-bold font-serif text-stone-900">
            Support the Griot
          </DialogTitle>
          <DialogDescription className="text-xs text-stone-500">
            Send patron support directly to this traditional author to sustain their lore recording and writing.
          </DialogDescription>
        </DialogHeader>

        {/* Author Card */}
        <div className="flex items-center gap-3.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-amber-300">
            <Image src={avatar} alt={penName} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-stone-900 truncate font-serif">{penName}</h4>
            <p className="text-xs text-stone-500 line-clamp-1">{bio}</p>
          </div>
        </div>

        {/* Option 1: Paystack Direct Link */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Option 1 • Instant Card / Mobile Money
          </span>
          <a
            href={paystackLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-5 shadow-sm rounded-xl">
              <Sparkles className="w-4 h-4 mr-2" />
              Pay with Paystack
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        {/* Option 2: Direct Bank Transfer Details */}
        <div className="space-y-2 pt-1 border-t border-stone-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Option 2 • Direct Bank Transfer
          </span>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" /> Bank Name:
              </span>
              <span className="font-bold text-stone-900">{bankName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-stone-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" /> Account Name:
              </span>
              <span className="font-bold text-stone-900">{accountName}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <span className="text-stone-500 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-stone-400" /> Account Number:
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-900 text-sm tracking-wider">
                  {accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(accountNumber, "acc_num")}
                  className="p-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
                  title="Copy account number"
                >
                  {copiedField === "acc_num" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% of contributions go directly to the storyteller
        </div>
      </DialogContent>
    </Dialog>
  );
}
