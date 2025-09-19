import type { CategoryFoundationProps } from "@data/props";
import FoundationIcon from "@generics/Foundation";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
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
      case FoundationType.Data:
        return t("service.data");
    }
  };
  return (
    <div className="bg-primary-300 group flex items-center gap-2.5 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:gap-0 hover:md:gap-2.5">
      <div>
        <FoundationIcon Foundation={FinalCategory} ClassSize="size-4" />
      </div>
      <span className="font-body text-xs whitespace-nowrap transition-all duration-300 ease-in-out md:max-w-0 md:opacity-0 group-hover:md:max-w-xs group-hover:md:opacity-100">
        {Trasnlation(FinalCategory)}
      </span>
    </div>
  );
};
