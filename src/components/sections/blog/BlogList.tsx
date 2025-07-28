import { useState, useEffect } from "react";
import type { BasicTranslateComponentProps } from "@data/props";

import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { BlogType, CategoryType } from "@data/data";
import type { ParsedQs } from "qs";
import fetchApi from "@lib/strapi";
import { StackSelector } from "@ui/StackSelector";
import { BlogCard } from "@ui/BlogCard";
import Select from "@primitives/Select";

export const BlogList: React.FC<BasicTranslateComponentProps> = ({ url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [filters, setFilters] = useState<CategoryType[]>([]);

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCatFilter, setActiveCatFilter] = useState<string | undefined>();

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await fetchApi<CategoryType[]>({
          endpoint: "categories",
          wrappedByKey: "data",
          lang: lang,
        });
        setFilters(filters);
      } catch (err) {
        setError(`No se pudieron cargar los filtros. ${err}`);
      } finally {
      }
    };
    loadFilters();
  }, [lang]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query: ParsedQs = {
          populate: ["thumbnail", "category"],
          sort: ["publishedAt:desc"],
        };

        if (activeCatFilter) {
          query.filters = {
            category: {
              slug: { $eq: activeCatFilter },
            },
          };
        }

        const filteredPosts = await fetchApi<BlogType[]>({
          endpoint: "blogs",
          query: query,
          wrappedByKey: "data",
          lang: lang,
        });
        setBlogs(filteredPosts);
      } catch (err) {
        setError(`No se pudieron cargar los posts. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [activeCatFilter, lang]);

  return (
    <section className="container flex min-h-[450px] flex-col gap-10 py-4 md:flex-row">
      <aside className="md:basis-1/4">
        <div className="hidden flex-col gap-6 md:flex">
          <h6 className="font-title text-lg text-neutral-700">
            {t("blog.page.categoryFilter")}
          </h6>
          <StackSelector
            text={"blog.page.defaultCategoryFilter"}
            url={url}
            isSelected={activeCatFilter === undefined}
            onClick={() => setActiveCatFilter(undefined)}
            key={0}
          />
          {filters &&
            filters.map((cat) => (
              <StackSelector
                text={cat.title}
                url={url}
                isSelected={activeCatFilter === cat.slug}
                onClick={() => setActiveCatFilter(cat.slug)}
                key={cat.id}
              />
            ))}
        </div>
        <div className="md:hidden">
          <Select<CategoryType>
            name="category-filter"
            label={t("blog.page.categoryFilter")}
            value={activeCatFilter || ""}
            onChange={(e) => {
              setActiveCatFilter(e.target.value || undefined);
            }}
            options={filters}
            getOptionValue={(cat: CategoryType) => cat.slug ?? ""}
            getOptionLabel={(cat: CategoryType) => cat.title}
            defaultOption={t("blog.page.defaultCategoryFilter")}
          />
        </div>
      </aside>
      <div className="grid grid-cols-1 gap-10 md:basis-3/4 lg:grid-cols-2">
        {loading && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500 lg:col-span-2">
            <p className="text-2xl">(˃ ⤙ ˂)</p>
            <p className="text-center">{t("blog.page.loadingProjects")}</p>
          </div>
        )}
        {error && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <span className="text-2xl">(ᵕ—ᴗ—)</span>
            <h6 className="text-2xl font-medium">
              {t("blog.page.errorProjectsTitlte")}
            </h6>
            <p>{t("blog.page.errorProjectsDesc")}</p>
          </div>
        )}

        {!loading && !error && blogs && blogs.length > 0 && (
          <>
            {blogs.map((blog) => (
              <BlogCard blog={blog} url={url} key={blog.id} />
            ))}
            {blogs.length > 0 && blogs.length < 4 && (
              <div className="font-body space-y-3 py-10 text-center text-neutral-500 lg:col-span-2">
                <p className="text-2xl">(ᵕ—ᴗ—)</p>
                <p>{t("blog.page.futureBlogs")}</p>
              </div>
            )}
          </>
        )}

        {!loading && !error && (!blogs || blogs.length < 1) && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500 lg:col-span-2">
            <p className="text-2xl">(¬_¬")</p>
            <p>{t("blog.page.notFoundProjects")}</p>
          </div>
        )}
      </div>
    </section>
  );
};
