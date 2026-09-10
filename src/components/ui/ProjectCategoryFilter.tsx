import type { ProjectCategoryFilterProp } from "@data/props";
import FoundationIcon from "@generics/Foundation";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import { CategoryFilterType, FoundationType } from "@data/enums";

export const ProjectCategoryFilter: React.FC<ProjectCategoryFilterProp> = ({
  url,
  category,
  isActive,
  onClick,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const defaultClasses =
    "cursor-pointer text-neutral-500 border-neutral-500 *:fill-neutral-500 *:group-hover:fill-neutral-600 hover:border-neutral-600 hover:bg-neutral-300 hover:text-neutral-600 bg-transparent dark:hover:bg-neutral-400";
  const activeClasses =
    "cursor-default border-neutral-700 text-neutral-700 *:fill-neutral-700 bg-primary-300 ";

  const FoundationTypeTrans = () => {
    switch (category) {
      case CategoryFilterType.Desing:
        return {
          Foundation: FoundationType.Desing,
          Translation: t("service.desing"),
        };
      case CategoryFilterType.Develop:
        return {
          Foundation: FoundationType.Develop,
          Translation: t("service.develop"),
        };
      case CategoryFilterType.Managment:
        return {
          Foundation: FoundationType.Managment,
          Translation: t("service.managment"),
        };
      case CategoryFilterType.Data:
        return {
          Foundation: FoundationType.Data,
          Translation: t("service.data"),
        };
      case CategoryFilterType.All:
        return { Foundation: null, Translation: t("projects.filter.all") };
    }
  };

  return (
    <button
      onClick={() => onClick(category)}
      className={`group font-body flex items-center gap-2.5 rounded-full border px-3 py-1 text-xs transition-colors ${isActive ? activeClasses : defaultClasses}`}
    >
      {FoundationTypeTrans().Foundation != null ? (
        <FoundationIcon
          Foundation={FoundationTypeTrans().Foundation}
          ClassSize="size-4"
          ClassColor="transition-colors"
        />
      ) : null}
      {FoundationTypeTrans().Translation}
    </button>
  );
};

export default ProjectCategoryFilter;
