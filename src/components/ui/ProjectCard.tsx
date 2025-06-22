import { ProjectCategoryBadge } from "./ProjectCategoryBadge";
import { type ProjectCardProps } from "@data/props";
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "src/i18n/utils";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);

  return (
    <div
      className={`font-body flex flex-col gap-10 text-neutral-800 lg:flex-row-reverse lg:items-center`}
    >
      <a
        href={translatePath(`/projects/${project.slug}`)}
        className="relative basis-2/6 transition-all"
      >
        <img
          src={`http://192.168.1.82:1337${project.thumbnail.formats.medium.url}`}
          alt={project.thumbnail.alternativeText}
          width={project.thumbnail.formats.medium.width}
          height={project.thumbnail.formats.medium.height}
          loading="lazy"
          className="rounded-md"
        />
        <div className="group hover:bg-primary-700/60 absolute inset-0 flex items-center justify-center rounded-md transition-all duration-300 hover:backdrop-blur-xs">
          <span className="hidden font-bold text-neutral-300 group-hover:block">
            {t("projectCard.project.seeMore")}
          </span>
        </div>
      </a>

      <div className="flex basis-4/6 flex-col gap-5">
        <div>
          <span className="text-lg font-light text-neutral-700">
            {project.company}
          </span>
          <a href={translatePath(`/projects/${project.slug}`)}>
            <h5 className="font-title text-3xl font-medium hover:underline">
              {project.title}
            </h5>
          </a>
        </div>
        <p className="line-clamp-3">{project.description}</p>

        {project.categories && (
          <div className="flex flex-wrap gap-3">
            {project.categories.map((category) => (
              <ProjectCategoryBadge
                key={category}
                category={category}
                url={url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
