import React, { useState, useEffect } from "react";
import type { MediaType } from "@data/data";
import { ImageFormat } from "@data/enums";
import type { LazyImageProps } from "@data/props";
import { STRAPI_URL } from "astro:env/client";
import { TbPhotoCancel } from "react-icons/tb";
import { getLangFromUrl, useTranslations } from "@i18n/utils";

const getImageUrlWithFallback = (
  media: MediaType,
  format: ImageFormat = ImageFormat.Medium,
): string => {
  const formatPriority: (
    | ImageFormat
    | "thumbnail"
    | "small"
    | "medium"
    | "large"
    | "original"
  )[] = [
    format,
    ImageFormat.Medium,
    ImageFormat.Small,
    ImageFormat.Large,
    ImageFormat.Original,
  ];

  for (const fmt of formatPriority) {
    if (fmt === ImageFormat.Original && media.url) {
      return `${STRAPI_URL}${media.url}`;
    }
    if (media.formats?.[fmt]?.url) {
      return `${STRAPI_URL}${media.formats[fmt].url}`;
    }
  }
  return "";
};

const StrapiImage: React.FC<LazyImageProps> = ({
  media,
  displayFormat,
  className,
  context,
  url,
  showCaption = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const placeholderSrc = media.formats?.thumbnail?.url
    ? `${STRAPI_URL}${media.formats.thumbnail.url}`
    : "";

  const highResSrc = getImageUrlWithFallback(media, displayFormat);

  useEffect(() => {
    if (!highResSrc) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = highResSrc;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [highResSrc]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral-400 text-neutral-700 ${className}`}
      >
        <TbPhotoCancel className="text-6xl" />
        {`${context ? `${t("image.errorCaptionContetx")} ${context}` : t("image.errorCaption")}`}
      </div>
    );
  }

  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-lg bg-neutral-400 ${className}`}
      >
        <img
          src={placeholderSrc}
          alt=""
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-lg filter transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />

        <img
          src={highResSrc}
          alt={media.alternativeText || `${t("image.noAltContetx")} ${context}`}
          title={
            media.alternativeText || `${t("image.noAltContetx")} ${context}`
          }
          height={media.height}
          width={media.width}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {showCaption && media.caption && (
        <figcaption className="font-body mt-2 text-center text-sm text-neutral-600 italic">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
};

export default StrapiImage;
