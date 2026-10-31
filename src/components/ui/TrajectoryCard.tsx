import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { ModalRef, TrajectoryCardProps } from "@data/props";
import { marked } from "marked";
import { Prose } from "@primitives/Prose";
import Modal from "@primitives/Modal";
import { useRef } from "react";
import { TrajectoryModal } from "./TrajectoryModal";
import StrapiImage from "@primitives/StrapiImage";
import { ImageFormat } from "@data/enums";

export const TrajectoryCard: React.FC<TrajectoryCardProps> = ({
  trajectory,
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const modal = useRef<ModalRef>(null);

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

  const Trasnlation = (type: number) => {
    switch (type) {
      case 0:
        return t("enum.TrajectoryType.Experience");
      case 1:
        return t("enum.TrajectoryType.Studies");
      case 2:
        return t("enum.TrajectoryType.Certificates");
    }
  };

  return (
    <>
      <div
        className="font-body relative flex cursor-pointer flex-col items-center gap-3 rounded-lg bg-neutral-400 px-6 py-8 text-neutral-800 shadow-md md:px-10"
        onClick={() => modal.current?.open()}
      >
        <div className="bg-alert-d-300 outline-neutral-w absolute -top-7 aspect-square size-14 overflow-clip rounded-full shadow-md outline-4">
          <StrapiImage
            media={trajectory.thumbnail}
            url={url}
            className="aspect-square size-14"
            context={trajectory.company}
            displayFormat={ImageFormat.Thumbnail}
          />
        </div>
        <div>
          <h4 className="font-title text-primary-800 text-center text-2xl font-medium">
            {trajectory.title}
          </h4>
          <p className="text-center text-sm">{trajectory.company}</p>
        </div>
        <p className="text-center font-light">
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

      <Modal
        ref={modal}
        title={Trasnlation(Number(trajectory.trajectories[0]))}
        showDefaultHeader
        url={url}
      >
        <TrajectoryModal trajectory={trajectory} url={url} />
      </Modal>
    </>
  );
};
