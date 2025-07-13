import React from "react";
import type { TextboxProps } from "@data/props";

const Textbox = React.forwardRef<HTMLTextAreaElement, TextboxProps>(
  ({ name, label, placeholder, errors, errorMessage, ...Props }, ref) => {
    return (
      <label className="font-body h-min w-full text-base font-normal">
        <span className="font-medium"> {label} </span>
        <textarea
          placeholder={placeholder}
          className="peer outline-primary-600 focus:outline-primary-700 mt-2 mb-0.5 min-h-20 w-full resize-none rounded-md bg-transparent px-3 py-3 text-neutral-800 outline transition-all placeholder:text-neutral-600 focus:outline-2 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-500 disabled:placeholder:text-neutral-600"
          name={name}
          {...Props}
          ref={ref}
        />
        {errors && <p className="text-alert-d-500 text-xs">{errorMessage}</p>}
      </label>
    );
  },
);

export default Textbox;
