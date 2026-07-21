import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { ModalRef, TrajectoryCardProps } from "@data/props";
import { marked } from "marked";
import { Prose } from "@primitives/Prose";
import { STRAPI_URL } from "astro:env/client";
import Modal from "@primitives/Modal";
import { useRef } from "react";
import { TrajectoryModal } from "./TrajectoryModal";

export const TrajectoryCard: React.FC<TrajectoryCardProps> = ({
  trajectory,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const modal = useRef<ModalRef>(null)

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

  const createMarkUp = (val: string) => {
    return { __html: marked(val) };
  };

  return (
    <>
      <div className="font-body relative flex flex-col items-center gap-3 rounded-lg bg-neutral-400 px-10 py-8 text-neutral-800 shadow-md cursor-pointer"
        onClick={() => modal.current?.open()}
      >
        <div className="bg-alert-d-300 outline-neutral-w absolute -top-7 aspect-square size-14 overflow-clip rounded-full shadow-md outline-4">
          <img
            src={`${STRAPI_URL}${trajectory.thumbnail.url}`}
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
          {trajectory.showEnd
          ? `${startDate} - ${endDate ?? t("trajectory.card.currently")}`
          : startDate}
        </p>
        {trajectory.successes && (
          <Prose>
            <div
              dangerouslySetInnerHTML={createMarkUp(trajectory.successes)}
              className="line-clamp-2 md:line-clamp-3"
            />
          </Prose>
        )}
      </div>

      <Modal ref={modal}
        title={trajectory.title}
        showDefaultHeader
        url={url}
      >
        <TrajectoryModal trajectory={trajectory} url={url} />
      </Modal>
    </>

  );
};
