import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-orange-600/30 bg-orange-50 text-orange-800 font-semibold",
        gold:
          "border-amber-600/30 bg-amber-50 text-amber-800 font-semibold",
        amber:
          "border-amber-700/30 bg-amber-100/70 text-amber-900 font-semibold",
        moss:
          "border-emerald-700/30 bg-emerald-50 text-emerald-800 font-semibold",
        secondary:
          "border-stone-200 bg-stone-100 text-stone-700 font-medium",
        outline: "border-stone-300 text-stone-800 bg-white/80",
        interactive:
          "border-amber-600/30 bg-gradient-to-r from-amber-100/80 to-orange-100/80 text-amber-900 font-semibold",
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
