import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { TrajectoryCardProps } from "@data/props";
import { marked } from "marked";
import { Prose } from "@primitives/Prose";

export const TrajectoryCard: React.FC<TrajectoryCardProps> = ({
  trajectory,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const formatedStartDate = new Date(trajectory.startDate);
  const formatedEndDate = trajectory.endDate
    ? new Date(trajectory.endDate)
    : null;

  const createMarkUp = (val: string) => {
    return { __html: marked(val) };
  };

  return (
    <div className="font-body relative flex flex-col items-center gap-3 rounded-lg bg-neutral-400 px-10 py-8 text-neutral-800 shadow-md">
      <div className="bg-alert-d-300 outline-neutral-w absolute -top-7 aspect-square size-14 overflow-clip rounded-full shadow-md outline-4">
        <img
          src={`http://192.168.1.82:1337${trajectory.thumbnail.url}`}
          alt={trajectory.company}
          draggable={false}
          loading="lazy"
        />
      </div>
      <div>
        <h4 className="font-title text-primary-800 text-center text-2xl">
          {trajectory.title}
        </h4>
        <p className="text-center text-sm font-light">{trajectory.company}</p>
      </div>
      <p className="text-center font-medium">
        {formatedStartDate.toLocaleDateString(lang, {
          month: "short",
          year: "numeric",
        })}{" "}
        -{" "}
        {formatedEndDate?.toLocaleDateString(lang, {
          month: "short",
          year: "numeric",
        }) || t("trajectory.card.currently")}
      </p>
      {trajectory.successes && (
        <Prose>
          <div
            dangerouslySetInnerHTML={createMarkUp(trajectory.successes)}
            className="line-clamp-2"
          />
        </Prose>
      )}
    </div>
  );
};
