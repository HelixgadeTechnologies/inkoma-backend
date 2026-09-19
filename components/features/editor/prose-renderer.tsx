"use client";

import React from "react";

interface ProseRendererProps {
  content: string;
  className?: string;
  fontSize?: "sm" | "md" | "lg" | "xl";
}

export function ProseRenderer({ content, className = "", fontSize = "md" }: ProseRendererProps) {
  if (!content || !content.trim()) {
    return (
      <p className="italic text-stone-400 dark:text-stone-500 text-sm">
        No chapter prose written yet. Use the editor above to begin writing your story.
      </p>
    );
  }

  const fontSizeClass =
    fontSize === "sm"
      ? "text-sm sm:text-base leading-relaxed"
      : fontSize === "lg"
      ? "text-lg sm:text-xl leading-relaxed sm:leading-loose"
      : fontSize === "xl"
      ? "text-xl sm:text-2xl leading-relaxed sm:leading-loose"
      : "text-base sm:text-lg leading-relaxed sm:leading-loose";

  // Parse paragraphs and special markdown-like folklore syntax
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className={`space-y-4 font-serif text-stone-800 dark:text-stone-200 ${fontSizeClass} ${className}`}>
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();

        // 1. Scene break / Divider: *** or --- or * * *
        if (/^(\*\s*\*\s*\*|---|___)$/.test(trimmed)) {
          return (
            <div key={idx} className="flex items-center justify-center my-8 gap-3 text-[#D4AF37] select-none">
              <span className="h-[1px] w-12 bg-[#D4AF37]/30"></span>
              <span className="text-xs tracking-widest font-sans font-bold">✦ ✦ ✦</span>
              <span className="h-[1px] w-12 bg-[#D4AF37]/30"></span>
            </div>
          );
        }

        // 2. Heading 1: # Title
        if (trimmed.startsWith("# ")) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white pt-4 pb-2 border-b border-stone-200/60 dark:border-stone-800 font-serif tracking-tight"
            >
              {renderInlineFormatting(trimmed.slice(2))}
            </h2>
          );
        }

        // 3. Heading 2: ## Subtitle
        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white pt-3 pb-1 font-serif"
            >
              {renderInlineFormatting(trimmed.slice(3))}
            </h3>
          );
        }

        // 4. Heading 3: ### Section
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="text-lg sm:text-xl font-bold text-[#D4AF37] pt-2 font-serif"
            >
              {renderInlineFormatting(trimmed.slice(4))}
            </h4>
          );
        }

        // 5. Blockquote / Ancestral Proverb: > Quote
        if (trimmed.startsWith(">")) {
          const quoteLines = trimmed
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join(" ");
          return (
            <blockquote
              key={idx}
              className="my-5 pl-5 py-3.5 border-l-4 border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 rounded-r-2xl italic text-stone-700 dark:text-stone-300 shadow-2xs"
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl font-serif text-[#D4AF37] leading-none -mt-1">&ldquo;</span>
                <span className="flex-1">{renderInlineFormatting(quoteLines)}</span>
                <span className="text-2xl font-serif text-[#D4AF37] leading-none self-end">&rdquo;</span>
              </div>
            </blockquote>
          );
        }

        // 6. Oral Lore Callout: :::lore ... :::
        if (trimmed.startsWith(":::lore") && trimmed.endsWith(":::")) {
          const innerText = trimmed.replace(/^:::lore\s*/, "").replace(/\s*:::$/, "");
          return (
            <div
              key={idx}
              className="my-6 p-5 rounded-2xl border border-[#D4AF37]/40 bg-[#FAF6EE] dark:bg-[#1a1815] shadow-xs relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2 text-[#B8860B] dark:text-[#E5C158] font-sans text-xs font-extrabold uppercase tracking-wider">
                <span>📜 Oral Lore &amp; Cultural Note</span>
              </div>
              <div className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                {renderInlineFormatting(innerText)}
              </div>
            </div>
          );
        }

        // 7. Bullet List (- or *)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").filter(Boolean);
          return (
            <ul key={idx} className="list-disc list-inside space-y-1 my-3 pl-2 text-stone-800 dark:text-stone-200">
              {items.map((item, i) => (
                <li key={i}>{renderInlineFormatting(item.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        // 8. Numbered List (1. 2. 3.)
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split("\n").filter(Boolean);
          return (
            <ol key={idx} className="list-decimal list-inside space-y-1 my-3 pl-2 text-stone-800 dark:text-stone-200">
              {items.map((item, i) => (
                <li key={i}>{renderInlineFormatting(item.replace(/^\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        // Standard prose paragraph
        return (
          <p key={idx} className="leading-relaxed sm:leading-loose text-justify">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Inline formatting helper for **bold**, *italic*, <u>underline</u>, ~~strikethrough~~
function renderInlineFormatting(text: string): React.ReactNode[] {
  // Split text by formatting tokens
  const regex = /(\*\*.*?\*\*|\*.*?\*|<u>.*?<\/u>|~~.*?~~|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-stone-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("<u>") && part.endsWith("</u>")) {
      return (
        <u key={i} className="underline underline-offset-4 decoration-[#D4AF37]">
          {part.slice(3, -4)}
        </u>
      );
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <del key={i} className="line-through text-stone-400 dark:text-stone-500">
          {part.slice(2, -2)}
        </del>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-mono text-xs text-[#B8860B] dark:text-[#D4AF37]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
