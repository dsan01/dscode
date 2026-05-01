import type React from "react";
import { type Props, default as GitHubCalendar } from "react-github-calendar";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { BasicTranslateComponentProps } from "@data/props";

const CommitHistory: React.FC<BasicTranslateComponentProps> = ({ url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const actualYear = new Date().getFullYear();

  const labels = {
    months: [
      t("about.github.jan"),
      t("about.github.feb"),
      t("about.github.mar"),
      t("about.github.apr"),
      t("about.github.may"),
      t("about.github.jun"),
      t("about.github.jul"),
      t("about.github.aug"),
      t("about.github.sep"),
      t("about.github.oct"),
      t("about.github.nov"),
      t("about.github.dec"),
    ],
    weekdays: [
      t("about.github.sun"),
      t("about.github.mon"),
      t("about.github.tue"),
      t("about.github.wed"),
      t("about.github.thu"),
      t("about.github.fri"),
      t("about.github.sat"),
    ],
    totalCount: t("about.github.totalCount"),
    legend: {
      less: t("about.github.legend.less"),
      more: t("about.github.legend.more"),
    },
  } satisfies Props["labels"];

  return (
    <section className="font-body container flex flex-col gap-4 py-10 text-neutral-800">
      <h3 className="font-title text-primary-700 text-4xl font-medium">
        {t("about.github.title")}
      </h3>
      <p>{t("about.github.desc")}</p>
      <div className="flex justify-center">
        <GitHubCalendar
          username="dsan01"
          colorScheme="light"
          labels={labels}
          year={actualYear}
        />
      </div>
    </section>
  );
};

export default CommitHistory;
