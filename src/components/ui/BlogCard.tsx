import { type BlogCardProps } from "@data/props";
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "@i18n/utils";
import { ImageFormat } from "@data/enums";
import StrapiImage from "@primitives/StrapiImage";

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
        <StrapiImage
          media={blog.thumbnail}
          displayFormat={ImageFormat.Medium}
          className="h-[180px] w-full rounded-t-xl object-cover object-center"
          url={url}
          context={t("meta.title.blog")}
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
          <time dateTime={blog.publishedAt.toISOString()} className="text-sm">
            {blog.publishedAt.toLocaleDateString(lang, {
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
        <div className="space-y-3">
          <p className="line-clamp-2"> {blog.description}</p>
        </div>
      </div>
    </div>
  );
};
