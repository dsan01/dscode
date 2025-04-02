import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import type { TrajectoryCardProps } from "src/types/props";

export const TrajectoryCard: React.FC<TrajectoryCardProps> = ({
  trajectory,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  return (
    <div className="font-body relative flex flex-col items-center gap-3 rounded-lg bg-neutral-400 px-10 py-8 shadow-md text-neutral-800">
      <div className="bg-alert-d-300 outline-neutral-w absolute -top-7 aspect-square size-14 overflow-clip rounded-full shadow-md outline-4">
        <img
          src={trajectory.Image}
          alt={trajectory.Company}
          draggable={false}
          loading="lazy"
        />
      </div>
      <div>
        <h4 className="font-title text-primary-800 text-center text-2xl">
          {trajectory.Title}
        </h4>
        <p className="text-center text-sm font-light">
          {trajectory.Company}
        </p>
      </div>
      <p className="text-center font-medium">
        {trajectory.StartDate.toLocaleDateString(lang, {
          month: "short",
          year: "numeric",
        })}{" "}
        -{" "}
        {trajectory.EndDate?.toLocaleDateString(lang, {
          month: "short",
          year: "numeric",
        }) || t("trajectory.card.currently")}
      </p>
      {(trajectory.Successes?.length ?? 0 > 0) ? (
        <ul className="list-inside list-disc text-base">
          <li>{trajectory.Successes[0]}</li>
        </ul>
      ) : null}
    </div>
  );
};
