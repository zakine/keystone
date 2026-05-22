import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../src/lib/cn";
import { Icon, type KeystoneIconName } from "./icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2 border text-sm font-medium tracking-normal transition-colors duration-200 ease-keystone-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.62_0.18_270_/_0.12)] disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      size: {
        compact: "h-8 px-3 text-xs",
        default: "h-11 px-5",
        icon: "h-10 w-10 px-0",
        touch: "h-[52px] px-6 text-base",
      },
      variant: {
        danger:
          "border-[oklch(0.62_0.18_25_/_0.3)] bg-[oklch(0.62_0.18_25_/_0.06)] text-[oklch(0.5_0.18_25)]",
        ghost: "border-transparent bg-transparent text-ink-2 hover:bg-paper-2",
        ink: "border-ink-1 bg-ink-0 text-white",
        outline: "border-line bg-white text-ink-1 hover:bg-paper-2",
        primary:
          "border-transparent bg-aurora text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_6px_20px_rgba(124,107,241,0.35)]",
      },
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: KeystoneIconName;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, icon, size, variant, ...props }, ref) => (
    <button className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
      {icon ? <Icon name={icon} size={size === "compact" ? 14 : 16} stroke={1.8} /> : null}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
