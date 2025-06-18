import type React from "react";
import { StackSelector } from "src/components/ui/StackSelector";
import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import type { BasicTranslateComponentProps } from "src/types/props";

export const ProjectProcess: React.FC<BasicTranslateComponentProps> = ({
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  return (
    <section className="container">
      <h3 className="font-title text-primary-700 text-4xl font-medium">
        Mi proceso con tu proyecto
      </h3>
      <StackSelector text="enum.ProjectProcess.Discover" url={url} />
    </section>
  );
};
