"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CustomSelectProps {
  options: (SelectOption | string)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className,
  triggerClassName,
  menuClassName,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Normalize options list into SelectOption format
  const normalizedOptions: SelectOption[] = React.useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full text-left", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 bg-white text-stone-900 shadow-xs transition-all hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#680C07] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          isOpen && "border-[#680C07] ring-2 ring-[#680C07]/20 shadow-sm",
          triggerClassName
        )}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-stone-400 font-normal">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-stone-400 shrink-0 ml-2 transition-transform duration-200",
            isOpen && "rotate-180 text-[#680C07]"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-1.5 max-h-60 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 scrollbar-none",
            menuClassName
          )}
        >
          {normalizedOptions.length === 0 ? (
            <div className="px-3 py-2 text-xs text-stone-400 text-center">No options available</div>
          ) : (
            normalizedOptions.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors cursor-pointer",
                    isSelected
                      ? "bg-[#680C07]/10 text-[#680C07]"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  <span className="truncate flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#680C07] shrink-0 stroke-[3]" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
