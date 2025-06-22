import type { ButtonGroupProps } from "@data/props";

export const ButtonGroup = <T,>({
  Selected,
  onClick,
  items,
  resources,
}: ButtonGroupProps<T>) => {
  return (
    <div className="inline-flex rounded-md shadow-xs" role="group">
      {items.map((item, index) => (
        <button
          type="button"
          className={`font-body border px-3 py-1 text-sm transition-colors first:rounded-s-xl first:border-r-0 last:rounded-e-xl last:border-l-0 md:text-xl ${
            Selected === item
              ? "bg-primary-700 border-primary-800 text-neutral-300"
              : "text-primary-800 border-primary-300 cursor-pointer bg-neutral-300 hover:bg-neutral-400"
          }`}
          onClick={() => onClick(item)}
          key={index}
        >
          {resources
            ? resources.find((x) => x.type === item)?.resource
            : String(item)}
        </button>
      ))}
    </div>
  );
};
