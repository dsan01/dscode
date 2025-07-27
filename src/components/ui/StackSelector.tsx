import type { StackSelectorProps } from "@data/props";
import { TbArrowNarrowRight } from "react-icons/tb";
import { getLangFromUrl, useTranslations } from "@i18n/utils";

export const StackSelector: React.FC<StackSelectorProps> = ({
  text,
  isSelected = false,
  url,
  onClick,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  return (
    <button
      className={`group font-title flex items-center justify-between gap-3 border-l-2 border-transparent px-2.5 py-2 text-xl text-neutral-800 transition-colors ${isSelected ? "border-l-primary-700 border-l-2" : "cursor-pointer hover:border-l-2 hover:border-l-neutral-500"}`}
      onClick={() => onClick()}
    >
      <span> {t(text) ?? text} </span>
      <div>
        <TbArrowNarrowRight
          className={`text-2xl transition-transform ${isSelected ? "-rotate-45" : "group-hover:-rotate-45"}`}
        />
      </div>
    </button>
  );
};
