import React from "react";
import type { ButtonProps } from "@data/props";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "button rounded-lg flex flex-row items-center justify-center px-4 py-1.5 gap-4 font-body transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary-400 shadow text-neutral-800 hover:bg-primary-300 disabled:bg-neutral-500",
        outlined:
          "border border-solid border-primary-400 bg-transparent text-primary-400 hover:border-primary-300 ",
      },
    },
  },
);

const Textbox = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", ...Props }, ref) => {
    return (
      <button className={buttonVariants({ variant })} {...Props} ref={ref}>
        {Props.children}
      </button>
    );
  },
);

export default Textbox;
