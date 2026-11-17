"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
  className,
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split string value into array of single chars
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const sanitized = rawVal.replace(/\D/g, ""); // Only numbers

    if (!sanitized) {
      // Cleared the input
      const newDigits = [...digits];
      newDigits[index] = "";
      onChange(newDigits.join(""));
      return;
    }

    if (sanitized.length > 1) {
      // Pasted or multiple characters
      handlePasteString(sanitized, index);
      return;
    }

    // Single digit input
    const char = sanitized[sanitized.length - 1];
    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join("");
    onChange(newValue);

    // Auto-focus next input if available
    if (index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move to previous box if current is empty
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePasteString = (pasteData: string, startIndex = 0) => {
    const sanitized = pasteData.replace(/\D/g, "").slice(0, length - startIndex);
    if (!sanitized) return;

    const newDigits = [...digits];
    for (let i = 0; i < sanitized.length; i++) {
      if (startIndex + i < length) {
        newDigits[startIndex + i] = sanitized[i];
      }
    }

    const newValue = newDigits.join("");
    onChange(newValue);

    const nextIndex = Math.min(startIndex + sanitized.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain");
    handlePasteString(pasteData, index);
  };

  return (
    <div className={cn("flex items-center justify-between gap-2 sm:gap-3", className)}>
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6} // Allow paste up to full length on any input
            value={digits[index] || ""}
            disabled={disabled}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(e, index)}
            className={cn(
              "w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl border transition-all duration-150 outline-none select-none shadow-sm",
              "bg-white text-stone-900 border-stone-200",
              "focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 focus:scale-105",
              isFilled && "border-[#D4AF37]/60 bg-amber-50/20 text-stone-950 font-extrabold",
              error && "border-red-400 focus:border-red-500 focus:ring-red-400/20 bg-red-50/20 text-red-900",
              disabled && "opacity-50 cursor-not-allowed bg-stone-100"
            )}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        );
      })}
    </div>
  );
}
