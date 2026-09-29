import React, { type ButtonHTMLAttributes } from "react";

const ButtonIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((Props, ref) => {
  return (
    <button
      className="group bg-primary-400 hover:bg-primary-300 aspect-square cursor-pointer rounded-full p-1.5 text-center text-xl text-neutral-800 shadow transition-all group-hover:text-neutral-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:active:scale-100"
      {...Props}
      ref={ref}
      type="button"
    >
      {Props.children}
    </button>
  );
});

export default ButtonIcon;
