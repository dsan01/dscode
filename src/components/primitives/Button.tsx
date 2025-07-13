import React from "react";
import type { ButtonProps } from "@data/props";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "button rounded-lg flex flex-row items-center justify-center px-4 py-1.5 gap-4 font-body transition-all duration-200 cursor-pointer disabled:cursor-not-allowed not-disabled:active:scale-[98%] focus:outline-1 focus:outline-primary-700",
  {
    variants: {
      variant: {
        default:
          "bg-primary-800 shadow text-neutral-300 hover:bg-primary-700 disabled:bg-neutral-500",
        outlined:
          "border border-solid border-primary-800 bg-transparent text-primary-800 hover:border-primary-700 hover:text-primary-700",
      },
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", isLoading, ...Props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant })}
        {...Props}
        ref={ref}
        disabled={Props.disabled ? Props.disabled : isLoading}
      >
        {Props.children}
      </button>
    );
  },
);

export default Button;
