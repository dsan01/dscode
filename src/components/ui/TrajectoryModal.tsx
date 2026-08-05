import type { TrajectoryModalProps } from "@data/props";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import { STRAPI_URL } from "astro:env/client";
import { marked } from "marked";
import { Prose } from "@primitives/Prose";
import { TbArrowNarrowRight } from "react-icons/tb";

export const TrajectoryModal: React.FC<TrajectoryModalProps> = ({
  trajectory,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const createMarkUp = (val: string) => {
    return { __html: marked(val) };
  };

  const startDate = new Date(trajectory.startDate).toLocaleDateString(lang, {
    month: "short",
    year: "numeric",
  });

  const endDate = trajectory.endDate
    ? new Date(trajectory.endDate).toLocaleDateString(lang, {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="font-body">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex gap-2 w-full items-center">
          <div className="bg-alert-d-300 aspect-square size-17 overflow-clip rounded-full shadow-md md:size-22">
            <img
              src={`${STRAPI_URL}${trajectory.thumbnail.url}`}
              alt={trajectory.company}
              draggable={false}
              loading="lazy"
            />
          </div>
          <h4 className="font-title text-primary-800 text-xl/6 font-semibold md:text-3xl">
            {trajectory.title}
          </h4>
        </div>
        <div className="flex flex-col items-start justify-start w-full text-neutral-800">
          <p className="text-base/tight ">{trajectory.company}</p>
          <p className="text-sm font-light">
            {trajectory.showEnd
              ? `${startDate} - ${endDate ?? t("trajectory.card.currently")}`
              : startDate}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h5 className="font-title text-lg text-primary-800 md:text-xl">
          {t("trajectory.modal.contributions")}
        </h5>
        {trajectory.successes && (
          <Prose>
            <div
              dangerouslySetInnerHTML={createMarkUp(trajectory.successes)}
              className="w-full"
            />
          </Prose>
        )}
      </div>
      <div>
        {trajectory.projects?.length ? (
          <div className="flex flex-col gap-4">
            <h5 className="font-title text-lg text-primary-800 md:text-xl">
              {t("trajectory.modal.projects")}
            </h5>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {trajectory.projects.map((project) => (
                <a
                  className="group flex items-center justify-between gap-3 rounded bg-neutral-400 p-4 shadow-md transition-shadow hover:shadow-lg"
                  href={`/projects/${project.slug}`}
                  key={project.documentId}
                >
                  <div>
                    <h6 className="text-lg font-semibold text-neutral-700 group-hover:underline">
                      {project.title}
                    </h6>
                    <span className="text-sm font-light">
                      {project.company}{" "}
                    </span>
                  </div>
                  <TbArrowNarrowRight className="text-2xl transition-transform group-hover:-rotate-45" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
