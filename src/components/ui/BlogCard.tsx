import { type BlogCardProps } from "@data/props";
import { STRAPI_URL } from "astro:env/client";
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "@i18n/utils";

export const BlogCard: React.FC<BlogCardProps> = ({ blog, url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);

  return (
    <div className="group/all font-body flex flex-col gap-7">
      <a
        href={translatePath(`/blog/${blog.slug}`)}
        className="group relative transition-all"
      >
        <img
          src={`${STRAPI_URL}${blog.thumbnail.formats?.medium?.url ?? blog.thumbnail.url}`}
          alt={blog.thumbnail.alternativeText ?? "demo"}
          width={blog.thumbnail.formats?.medium?.width ?? blog.thumbnail.width}
          height={
            blog.thumbnail.formats?.medium?.height ?? blog.thumbnail.height
          }
          loading="lazy"
          className="max-h-[180px] w-full rounded-t-xl object-cover object-center"
        />
        <div className="group-hover:bg-primary-700/30 absolute bottom-0 flex h-[50px] w-full items-center justify-center rounded-md transition-all duration-300 group-hover:backdrop-blur-xs">
          <span className="hidden font-bold text-neutral-300 transition-all group-hover:block">
            {t("blog.card.cta")}
          </span>
        </div>
      </a>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <a href={translatePath(`/blog/${blog.slug}`)}>
            <h4 className="font-title text-xl hover:underline">{blog.title}</h4>
          </a>
          <span className="text-sm">
            {blog.publishedAt.toLocaleDateString(lang, {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="space-y-3">
          <p className="line-clamp-2"> {blog.description}</p>
        </div>
      </div>
    </div>
  );
};
