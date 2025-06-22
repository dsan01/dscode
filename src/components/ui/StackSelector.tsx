import type { StackSelectorProps } from "@data/props";
import { TbArrowNarrowRight } from "react-icons/tb";
import { getLangFromUrl, useTranslations } from "src/i18n/utils";

export const StackSelector: React.FC<StackSelectorProps> = ({
  text,
  isSelected = false,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  return (
    <button className="group font-title flex items-center justify-center gap-3 border-l-2 border-transparent px-2.5 py-2 text-xl text-neutral-800 transition-colors hover:border-l-2 hover:border-l-neutral-500">
      <span> {t(text)}</span>
      <slot name="Icon" />
      <TbArrowNarrowRight className="text-2xl transition-transform group-hover:-rotate-45" />
    </button>
  );
};
