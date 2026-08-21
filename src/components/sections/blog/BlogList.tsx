import { useState, useEffect } from "react";
import type { BasicTranslateComponentProps } from "@data/props";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { BlogType, CategoryType, TagType } from "@data/data";
import type { ParsedQs } from "qs";
import fetchApi from "@lib/strapi";
import { StackSelector } from "@ui/StackSelector";
import { BlogCard } from "@ui/BlogCard";
import Select from "@primitives/Select";
import { TbTagOff } from "react-icons/tb";
import Badge from "@primitives/Badge";

export const BlogList: React.FC<BasicTranslateComponentProps> = ({ url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCatFilter, setActiveCatFilter] = useState<string | undefined>();
  const [activeTagFilter, setActiveTagFilter] = useState<string | undefined>();

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const categoriesResponse = await fetchApi<CategoryType[]>({
          endpoint: "categories",
          wrappedByKey: "data",
          lang: lang,
        });
        setCategories(categoriesResponse);
        const urlFilterCategory = url.searchParams.get("category");
        const filterCategory = categoriesResponse.find(
          (x) => x.slug === urlFilterCategory,
        );
        if (filterCategory) setActiveCatFilter(filterCategory.slug);
        const TagsResponse = await fetchApi<TagType[]>({
          endpoint: "tags",
          wrappedByKey: "data",
          lang: lang,
        });
        setTags(TagsResponse);
        const urlFilterTag = url.searchParams.get("tag");
        const filterTag = TagsResponse.find((x) => x.slug == urlFilterTag);
        if (filterTag) setActiveTagFilter(filterTag.slug);
      } catch (err) {
        setError(`No se pudieron cargar los filtros. ${err}`);
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
          populate: ["thumbnail", "category", "tags"],
          sort: ["publishedAt:desc"],
          filters: {},
        };

        if (activeCatFilter) {
          query.filters.category = {
            slug: { $eq: activeCatFilter },
          };
        }

        if (activeTagFilter) {
          query.filters.tags = {
            slug: { $eq: activeTagFilter },
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
  }, [activeCatFilter, activeTagFilter, lang]);

  const handleCategoryChange = (slug: string | undefined) => {
    const url = new URL(window.location.href);
    setActiveCatFilter(slug);
    if (!slug) {
      url.searchParams.delete("category");
      window.history.replaceState(null, "", url.toString());

      return;
    }
    url.searchParams.set("category", slug);
    window.history.replaceState(null, "", url.toString());
  };

  const handleTagChange = (slug: string | undefined) => {
    const url = new URL(window.location.href);
    setActiveTagFilter(slug);
    if (!slug) {
      url.searchParams.delete("tag");
      window.history.replaceState(null, "", url.toString());

      return;
    }
    url.searchParams.set("tag", slug);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <section className="container flex min-h-[450px] flex-col gap-10 py-4 md:flex-row">
      <aside className="flex flex-col gap-8 md:basis-1/4">
        <div className="hidden flex-col gap-6 md:flex">
          <h3 className="font-title text-primary-700 text-xl font-medium">
            {t("blog.page.categoryFilter")}
          </h3>
          <StackSelector
            text={"blog.page.defaultCategoryFilter"}
            url={url}
            isSelected={activeCatFilter === undefined}
            onClick={() => handleCategoryChange(undefined)}
            key={0}
          />
          {categories &&
            categories.map((cat) => (
              <StackSelector
                text={cat.title}
                url={url}
                isSelected={activeCatFilter === cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                key={cat.id}
              />
            ))}
        </div>
        <div className="md:hidden">
          <h3 className="font-title text-primary-700 text-xl font-medium">
            {t("blog.page.categoryFilter")}
          </h3>
          <Select<CategoryType>
            name="category-filter"
            // label={t("blog.page.categoryFilter")}
            value={activeCatFilter || ""}
            onChange={(e) => {
              handleCategoryChange(e.target.value || undefined);
            }}
            options={categories}
            getOptionValue={(cat: CategoryType) => cat.slug ?? ""}
            getOptionLabel={(cat: CategoryType) => cat.title}
            defaultOption={t("blog.page.defaultCategoryFilter")}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-primary-700 text-xl font-medium">
              {t('aside.tags.title')}
            </h3>
            <button
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-300 p-1.5 align-middle transition-colors hover:bg-neutral-400"
              title={`${t('aside.tags.clear')} `}
            >
              <TbTagOff
                onClick={() => handleTagChange(undefined)}
                className="text-xl text-neutral-800"
                aria-hidden="true"
              />
            </button>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge
                  onClick={() => handleTagChange(tag.slug)}
                  key={tag.slug}
                  state={activeTagFilter === tag.slug ? "active" : "default"}
                  title={`${t('aside.tags.filter')} ${tag.title}`}
                >
                  {tag.title}
                </Badge>
              ))}
            </div>
          )}
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
