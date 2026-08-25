"use client";

import * as React from "react";
import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
        return <AlertTriangle className="w-6 h-6 text-[#680C07]" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-[#680C07]" />;
      case "info":
        return <Info className="w-6 h-6 text-[#680C07]" />;
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "danger":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-[#680C07]/10 border-[#680C07]/20";
      case "info":
        return "bg-[#680C07]/10 border-[#680C07]/20";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-6 sm:p-7 space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl bg-white dark:bg-stone-900">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${getIconBg()}`}
          >
            {getIcon()}
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs px-4"
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
                ? "bg-[#680C07] hover:bg-[#520905] dark:bg-red-700 dark:hover:bg-red-800 text-white"
                : "bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 text-white"
            }`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
