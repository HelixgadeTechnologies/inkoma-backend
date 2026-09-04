"use client";

import * as React from "react";
import { AlertTriangle, Info, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <AlertTriangle className="w-6 h-6 text-[#B8860B]" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-[#B8860B]" />;
      case "info":
        return <Info className="w-6 h-6 text-[#B8860B]" />;
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "danger":
        return "bg-[#D4AF37]/15 border-[#D4AF37]/30";
      case "warning":
        return "bg-[#D4AF37]/15 border-[#D4AF37]/30";
      case "info":
        return "bg-[#D4AF37]/15 border-[#D4AF37]/30";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-6 sm:p-7 space-y-5 rounded-3xl border border-stone-200 shadow-2xl bg-white text-stone-900">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${getIconBg()}`}
          >
            {getIcon()}
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <h3 className="text-xl font-bold font-serif text-stone-900 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border-stone-300 text-stone-700 text-xs px-4"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isLoading}
            className={`rounded-xl text-xs font-bold px-5 shadow-sm ${
              variant === "danger"
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950"
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
