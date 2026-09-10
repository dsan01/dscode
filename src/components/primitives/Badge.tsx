import React from "react";
import type { BadgeProps } from "@data/props";
import { cva } from "class-variance-authority";

export const BadgeVariants = cva(
  "badge font-body items-center rounded-md px-2.5 py-1 text-xs font-medium shadow-xs transition-colors",
  {
    variants: {
      state: {
        default:
          "cursor-pointer bg-primary-800 text-neutral-400 hover:bg-primary-400 dark:hover:bg hover:text-neutral-700",
        active: " bg-primary-300 text-neutral-700",
      },
    },
  },
);

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ state = "default", ...Props }, ref) => {
    return (
      <button className={BadgeVariants({ state })} {...Props} ref={ref}>
        {Props.children}
      </button>
    );
  },
);

export default Badge;
