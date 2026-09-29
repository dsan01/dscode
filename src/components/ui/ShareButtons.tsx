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
import ButtonIcon from "@primitives/ButtonIcon";

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

  const handleShareSocial = useCallback(
    async (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [title, description, url],
  );

  return (
    <>
      <div className="">
        <h4 className="font-title text-primary-700 mb-4 text-xl font-medium">
          {t("aside.share.shareApi")}
        </h4>
        <div className="flex gap-4">
          <ButtonIcon
            onClick={() => handleShareSocial(shareByEmail)}
            title={t("aside.share.email")}
            data-umami-event="share-content"
            data-umami-event-to="Email"
          >
            <TbMail aria-hidden="true" />
          </ButtonIcon>

          <ButtonIcon
            onClick={() => handleShareSocial(shareByLinkedIn)}
            title={t("aside.share.linkedIn")}
            data-umami-event="share-content"
            data-umami-event-to="Linkedin"
          >
            <TbBrandLinkedin aria-hidden="true" />
          </ButtonIcon>

          <ButtonIcon
            onClick={() => handleShareSocial(shareByWhatsapp)}
            title={t("aside.share.whatsApp")}
            data-umami-event="share-content"
            data-umami-event-to="Whatsapp"
            data-action="share/whatsapp/share"
          >
            <TbBrandWhatsapp aria-hidden="true" />
          </ButtonIcon>

          <ButtonIcon
            title={t("aside.share.shareApi")}
            onClick={handleShare}
            data-umami-event="share-content"
            data-umami-event-to="ShareApi"
          >
            <TbShare aria-hidden="true" />
          </ButtonIcon>
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
