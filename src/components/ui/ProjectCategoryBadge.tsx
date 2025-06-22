import type { CategoryFoundationProps } from "@data/props";
import FoundationIcon from "@generics/Foundation";
import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import { FoundationType } from "@data/enums";

export const ProjectCategoryBadge: React.FC<CategoryFoundationProps> = ({
  category,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  const FinalCategory = parseInt(category);
  const Trasnlation = (type: FoundationType) => {
    switch (type) {
      case FoundationType.Desing:
        return t("service.desing");
      case FoundationType.Develop:
        return t("service.develop");
      case FoundationType.Managment:
        return t("service.managment");
    }
  };
  return (
    <div className="bg-primary-300 group flex items-center gap-2.5 rounded-full px-3 py-1 transition-all">
      <FoundationIcon Foundation={FinalCategory} ClassSize="size-4" />
      <span className="font-body text-xs group-hover:block md:hidden">
        {Trasnlation(FinalCategory)}
      </span>
    </div>
  );
};
