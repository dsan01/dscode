import React from "react";
import type { SelectProps } from "@data/props";

const Select = React.forwardRef(function Select<T>(
  {
    name,
    label,
    placeholder,
    defaultOption,
    errors,
    errorMessage,
    options,
    getOptionValue,
    getOptionLabel,
    ...Props
  }: SelectProps<T>,
  ref: React.Ref<HTMLSelectElement>,
) {
  return (
    <label className="font-body h-min w-full text-base font-normal">
      <span className="font-medium"> {label} </span>
      <select
        name={name}
        {...Props}
        ref={ref}
        className="peer outline-primary-600 focus:outline-primary-700 mt-2 mb-0.5 h-10 w-full rounded-md bg-transparent p-2 text-neutral-800 outline transition-all placeholder:text-neutral-600 focus:outline-2 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-500"
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option, index) => (
          <option key={index} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
      {errors && <p className="text-alert-d-500 text-xs">{errorMessage}</p>}
    </label>
  );
});

export default Select;
