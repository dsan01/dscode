import { type PaginatorProps } from "@data/props";
import {
  TbChevronRight,
  TbChevronsRight,
  TbChevronLeft,
  TbChevronsLeft,
} from "react-icons/tb";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import ButtonIcon from "@primitives/ButtonIcon";

export const Paginator: React.FC<PaginatorProps> = ({
  Pagination,
  url,
  onChangePage,
}) => {
  const { page, pageCount } = Pagination;

  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  return (
    <div className="font-body flex justify-between text-neutral-800">
      <div className="text-sm">
        {t("paginator.text.pages")
          .replace("{{1}}", page.toString())
          .replace("{{2}}", pageCount.toString())}
      </div>
      <div className="flex gap-2">
        <ButtonIcon
          onClick={() => onChangePage(1)}
          disabled={Pagination.page === 1}
          title={t("paginator.actions.first")}
        >
          <TbChevronsLeft />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => onChangePage(page - 1)}
          disabled={Pagination.page === 1}
          title={t("paginator.actions.prev")}
        >
          <TbChevronLeft />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => onChangePage(page + 1)}
          disabled={Pagination.page === Pagination.pageCount}
          title={t("paginator.actions.next")}
        >
          <TbChevronRight />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => onChangePage(pageCount)}
          disabled={Pagination.page === Pagination.pageCount}
          title={t("paginator.actions.last")}
        >
          <TbChevronsRight />
        </ButtonIcon>
      </div>
    </div>
  );
};
