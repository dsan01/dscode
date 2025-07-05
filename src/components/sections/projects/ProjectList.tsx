import { useState, useEffect } from "react";
import type { BasicTranslateComponentProps } from "@data/props";
import type { ProjectType } from "@data/data";
import type { ParsedQs } from "qs";
import { CategoryFilterType } from "@data/enums";

import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import { ProjectCard } from "@ui/ProjectCard";
import fetchApi from "@lib/strapi";
import ProjectCategoryFilter from "@ui/ProjectCategoryFilter";

export const ProjectList: React.FC<BasicTranslateComponentProps> = ({
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  const [activeFilter, setActiveFilter] = useState<CategoryFilterType>(
    CategoryFilterType.All,
  );
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Opciones para los botones de filtro
  const filterOptions = [
    CategoryFilterType.All,
    CategoryFilterType.Desing,
    CategoryFilterType.Develop,
    CategoryFilterType.Managment,
  ];

  // Este 'useEffect' se ejecutará cada vez que 'activeFilter' cambie
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true); // Empezamos a cargar
      setError(null);
      try {
        const query: ParsedQs = {
          populate: "thumbnail",
          sort: ["finish_date:desc"],
        };
        if (activeFilter != CategoryFilterType.All) {
          query.filters = {
            categories: {
              $containsi: String(activeFilter),
            },
          };
        }

        const filteredProjects = await fetchApi<ProjectType[]>({
          endpoint: "projects",
          query: query,
          wrappedByKey: "data",
        });
        setProjects(filteredProjects);
      } catch (err) {
        setError(`No se pudieron cargar los proyectos. ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [activeFilter]);

  return (
    <section className="container flex flex-col gap-4 py-7">
      <div className="flex flex-col gap-7">
        <h3 className="font-title text-primary-700 text-2xl font-medium">
          {t("projects.page.allProjetcsList")}
        </h3>
        <div className="flex flex-wrap gap-4">
          {filterOptions.map((type) => (
            <ProjectCategoryFilter
              key={type}
              category={type}
              isActive={activeFilter === type}
              onClick={setActiveFilter}
              url={url}
            />
          ))}
        </div>
      </div>

      <div>
        {loading && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <p className="text-2xl">(˃ ⤙ ˂)</p>
            <p className="text-center">{t("projects.page.loadingProjects")}</p>
          </div>
        )}
        {error && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <span className="text-2xl">(ᵕ—ᴗ—)</span>
            <h6 className="text-2xl font-medium">
              {t("projects.page.errorProjectsTitlte")}
            </h6>
            <p>{t("projects.page.errorProjectsDesc")}</p>
          </div>
        )}

        {!loading && !error && projects && (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} url={url} />
            ))}
            {projects.length > 0 && projects.length < 3 && (
              <div className="font-body space-y-3 py-10 text-center text-neutral-500">
                <p className="text-2xl">(ᵕ—ᴗ—)</p>
                <p>{t("projects.page.futureProjects")}</p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && (!projects || projects.length < 1) && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <p className="text-2xl">(¬_¬")</p>
            <p>{t("projects.page.notFoundProjects")}</p>
          </div>
        )}
      </div>
    </section>
  );
};
