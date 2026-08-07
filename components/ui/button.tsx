import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folklore-amber disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-folklore-terracotta text-white shadow hover:bg-folklore-clay hover:shadow-md",
        folklore:
          "bg-gradient-to-r from-folklore-terracotta to-folklore-amber text-white font-semibold shadow-md hover:shadow-lg hover:brightness-105",
        gold:
          "bg-folklore-gold text-white font-semibold hover:bg-folklore-amber shadow hover:shadow-md",
        outline:
          "border border-stone-300 bg-white/90 text-stone-800 hover:bg-amber-50 hover:border-folklore-amber hover:text-stone-900 shadow-sm",
        secondary:
          "bg-stone-100/90 border border-stone-200 text-stone-800 hover:bg-stone-200/80 hover:text-stone-950",
        ghost: "text-stone-700 hover:bg-amber-100/50 hover:text-stone-950",
        link: "text-folklore-amber font-semibold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
