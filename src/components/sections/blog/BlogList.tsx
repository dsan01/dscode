import { useState, useEffect } from "react";
import type { BasicTranslateComponentProps } from "@data/props";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type {
  BlogType,
  CategoryType,
  StrapiPagination,
  TagType,
} from "@data/data";
import type { ParsedQs } from "qs";
import fetchApi from "@lib/strapi";
import { StackSelector } from "@ui/StackSelector";
import { BlogCard } from "@ui/BlogCard";
import Select from "@primitives/Select";
import { TbTagOff } from "react-icons/tb";
import Badge from "@primitives/Badge";
import { Paginator } from "@generics/Paginator";
import ButtonIcon from "@primitives/ButtonIcon";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationInfo, setPaginationInfo] = useState<
    Partial<StrapiPagination | undefined>
  >({ page: 1 });

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const { items: categoriesResponse } = await fetchApi<CategoryType[]>({
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
        const { items: TagsResponse } = await fetchApi<TagType[]>({
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
    const loadActualPage = () => {
      const urlActualPage = url.searchParams.get("page");
      const pageNumber = urlActualPage ? parseInt(urlActualPage, 10) : 1;
      setCurrentPage(pageNumber);
    };
    loadFilters();
    loadActualPage();
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
          pagination: {
            page: currentPage,
            pageSize: 10,
          },
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

        const { items, pagination } = await fetchApi<BlogType[]>({
          endpoint: "blogs",
          query: query,
          wrappedByKey: "data",
          lang: lang,
        });
        setBlogs(items);
        setPaginationInfo(pagination);
      } catch (err) {
        setError(`No se pudieron cargar los posts. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [activeCatFilter, activeTagFilter, lang, currentPage]);

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

  const handleCategoryChange = (slug: string | undefined) => {
    setActiveCatFilter(slug);
    handlePageChange(1);
    updateUrlParams({
      page: null,
      category: slug ?? null,
    });
  };

  const handleTagChange = (slug: string | undefined) => {
    setActiveTagFilter(slug);
    handlePageChange(1);
    updateUrlParams({
      page: null,
      tag: slug ?? null,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams({
      page: page === 1 ? null : page.toString(),
    });
  };

  return (
    <section className="container flex min-h-[450px] flex-col gap-10 py-4 md:flex-row">
      <aside className="relative md:basis-1/4">
        <div className="sticky top-[70px] flex flex-col gap-8">
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
                {t("aside.tags.title")}
              </h3>
              <ButtonIcon
                onClick={() => handleTagChange(undefined)}
                disabled={!activeTagFilter}
                title={`${t('aside.tags.clear')} `}
              >
                <TbTagOff aria-hidden="true" />
              </ButtonIcon>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    onClick={() => handleTagChange(tag.slug)}
                    key={tag.slug}
                    state={activeTagFilter === tag.slug ? "active" : "default"}
                    title={`${t("aside.tags.filter")} ${tag.title}`}
                  >
                    {tag.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
      <div className="space-y-10 md:basis-3/4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {!loading && !error && blogs && blogs.length > 0 && (
            <>
              {blogs.map((blog) => (
                <BlogCard blog={blog} url={url} key={blog.id} />
              ))}
              {blogs.length > 0 &&
                blogs.length < 4 &&
                (paginationInfo?.pageCount ?? 1) == 1 && (
                  <div className="font-body space-y-3 py-10 text-center text-neutral-500 lg:col-span-2">
                    <p className="text-2xl">(ᵕ—ᴗ—)</p>
                    <p>{t("blog.page.futureBlogs")}</p>
                  </div>
                )}
            </>
          )}
        </div>
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

        {!loading && !error && (!blogs || blogs.length < 1) && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500 lg:col-span-2">
            <p className="text-2xl">(¬_¬")</p>
            <p>{t("blog.page.notFoundProjects")}</p>
          </div>
        )}
        {paginationInfo && (paginationInfo?.pageCount ?? 1) > 1 && (
          <Paginator
            Pagination={paginationInfo}
            url={url}
            onChangePage={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};
