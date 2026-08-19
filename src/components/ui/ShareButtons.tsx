import { useCallback } from "react";
import {
  TbMail,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbShare,
} from "react-icons/tb";
import { createPortal } from "react-dom";
import type { ShareButtonsProps } from "@data/props";
import { Toaster, toast } from "sonner";
import { getLangFromUrl, useTranslations } from "@i18n/utils";

const ShareButtons = ({
  title = "",
  description = "",
  url,
}: ShareButtonsProps) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const shareByEmail = `mailto:?subject=${encodeURIComponent(
    `${t("aside.share.title")}: ${title}`,
  )}&body=${encodeURIComponent(
    `${t("aside.share.description")}:\n\n${title}\n${description}\n\n${url.href}`,
  )}`;

  const shareByLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.href)}`;

  const shareByWhatsapp = `whatsapp://send?text=${encodeURIComponent(
    `${t("aside.share.title")}: ${title}\n\n${url.href}`,
  )}`;

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: url.href,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          toast.warning(t("aside.share.warning"));
          return;
        }
        toast.error(t("aside.share.error"));
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url.href);
      toast.info(t("aside.share.clipboard"));
    } catch (error) {
      toast.error(t("aside.share.error"));
    }
  }, [title, description, url]);

  return (
    <>
      <div className="">
        <h3 className="font-title text-primary-700 mb-4 text-xl font-medium">
          {t("aside.share.shareApi")}
        </h3>
        <div className="flex gap-4">
          <a
            className="flex aspect-square items-center justify-center rounded-full bg-neutral-300 p-1.5 align-middle transition-colors hover:bg-neutral-400"
            href={shareByEmail}
            title={t("aside.share.email")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-umami-event="share-content"
            data-umami-event-to="Email"
          >
            <TbMail className="text-2xl text-neutral-800" aria-hidden="true" />
          </a>

          <a
            className="flex aspect-square items-center justify-center rounded-full bg-neutral-300 p-1.5 align-middle transition-colors hover:bg-neutral-400"
            href={shareByLinkedIn}
            title={t("aside.share.linkedIn")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-umami-event="share-content"
            data-umami-event-to="Linkedin"
          >
            <TbBrandLinkedin
              className="text-2xl text-neutral-800"
              aria-hidden="true"
            />
          </a>

          <a
            className="flex aspect-square items-center justify-center rounded-full bg-neutral-300 p-1.5 align-middle transition-colors hover:bg-neutral-400"
            href={shareByWhatsapp}
            title={t("aside.share.whatsApp")}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-umami-event="share-content"
            data-umami-event-to="Whatsapp"
            data-action="share/whatsapp/share"
          >
            <TbBrandWhatsapp
              className="text-2xl text-neutral-800"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-300 p-1.5 align-middle transition-colors hover:bg-neutral-400"
            title={t("aside.share.shareApi")}
            onClick={handleShare}
            data-umami-event="share-content"
            data-umami-event-to="ShareApi"
          >
            <TbShare className="text-2xl text-neutral-800" aria-hidden="true" />
          </button>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <Toaster
            position="top-right"
            richColors
            className="font-body!"
            visibleToasts={6000}
            style={{ zIndex: 100 }}
          />,
          document.body,
        )}
    </>
  );
};

export default ShareButtons;
