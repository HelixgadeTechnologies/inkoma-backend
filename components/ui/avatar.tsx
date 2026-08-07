import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#680C07]/30 bg-[#680C07]/10 font-semibold text-[#680C07] items-center justify-center text-xs shadow-sm",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || "Avatar"} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
