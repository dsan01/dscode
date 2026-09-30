import { useState, useEffect } from "react";
import type { BasicTranslateComponentProps } from "@data/props";
import type { ProjectType, StrapiPagination } from "@data/data";
import type { ParsedQs } from "qs";
import { CategoryFilterType } from "@data/enums";

import { getLangFromUrl, useTranslations } from "@i18n/utils";
import { ProjectCard } from "@ui/ProjectCard";
import fetchApi from "@lib/strapi";
import ProjectCategoryFilter from "@ui/ProjectCategoryFilter";
import { Paginator } from "@generics/Paginator";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationInfo, setPaginationInfo] = useState<
    Partial<StrapiPagination | undefined>
  >({ page: 1 });

  // Opciones para los botones de filtro
  const filterOptions = [
    CategoryFilterType.All,
    CategoryFilterType.Develop,
    CategoryFilterType.Data,
    CategoryFilterType.Desing,
    CategoryFilterType.Managment,
  ];

  const categoryFilterToString = (category: CategoryFilterType): string => {
    return CategoryFilterType[category].toLowerCase();
  };

  const stringToCategoryFilter = (
    category: string | null,
  ): CategoryFilterType => {
    if (!category) {
      return CategoryFilterType.All;
    }

    const key = Object.keys(CategoryFilterType).find(
      (key) => key.toLowerCase() === category.toLowerCase(),
    );

    if (!key) {
      return CategoryFilterType.All;
    }

    return CategoryFilterType[
      key as keyof typeof CategoryFilterType
    ] as CategoryFilterType;
  };

  useEffect(() => {
    const urlFilter = url.searchParams.get("category");
    if (urlFilter) {
      const validCategory = stringToCategoryFilter(urlFilter);
      if (validCategory != CategoryFilterType.All) {
        setActiveFilter(validCategory);
      } else {
        url.searchParams.delete("category");
        window.history.replaceState(null, "", url.toString());
      }
    }
    const urlActualPage = url.searchParams.get("page");
    const pageNumber = urlActualPage ? parseInt(urlActualPage, 10) : 1;
    setCurrentPage(pageNumber);
  }, [lang]);

  // Este 'useEffect' se ejecutará cada vez que 'activeFilter' cambie
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true); // Empezamos a cargar
      setError(null);
      try {
        const query: ParsedQs = {
          populate: "thumbnail",
          sort: ["finish_date:desc"],
          pagination: {
            page: currentPage,
            pageSize: 5,
          },
        };
        if (activeFilter != CategoryFilterType.All) {
          query.filters = {
            categories: {
              $containsi: String(activeFilter),
            },
          };
        }

        const { items: filteredProjects, pagination } = await fetchApi<
          ProjectType[]
        >({
          endpoint: "projects",
          query: query,
          wrappedByKey: "data",
          lang: lang,
        });
        setProjects(filteredProjects);
        setPaginationInfo(pagination);
      } catch (err) {
        setError(`No se pudieron cargar los proyectos. ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [activeFilter, currentPage]);

  const updateUrlParams = (params: Record<string, string | null>) => {
    const url = new URL(window.location.href);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });

    window.history.replaceState(null, "", url.toString());
  };

  const handleCategoryChange = (slug: CategoryFilterType) => {
    setActiveFilter(slug);
    handlePageChange(1);
    updateUrlParams({
      page: null,
      category:
        slug === CategoryFilterType.All ? null : categoryFilterToString(slug),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams({
      page: page === 1 ? null : page.toString(),
    });
  };

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
              onClick={handleCategoryChange}
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
            {projects.length > 0 &&
              projects.length < 3 &&
              (paginationInfo?.pageCount ?? 1) == 1 && (
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
        <div className="mt-4">
          {paginationInfo && (paginationInfo?.pageCount ?? 1) > 1 && (
            <Paginator
              Pagination={paginationInfo}
              url={url}
              onChangePage={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};
