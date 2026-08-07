import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-folklore-terracotta/20 text-folklore-terracotta border-folklore-terracotta/30",
        gold:
          "border-folklore-gold/40 bg-folklore-gold/15 text-folklore-gold",
        amber:
          "border-folklore-amber/40 bg-folklore-amber/15 text-folklore-amber",
        moss:
          "border-folklore-moss/40 bg-folklore-moss/20 text-emerald-400",
        secondary:
          "border-white/10 bg-white/5 text-neutral-300",
        outline: "text-foreground border-white/20",
        interactive:
          "border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
