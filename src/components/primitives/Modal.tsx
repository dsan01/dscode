import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { TbX } from "react-icons/tb";
import { type ModalProps , type ModalRef } from '@data/props'
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import "./Modal.css";

export const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      id,
      title,
      children,
      footer,
      showCloseButton = true,
      showDefaultHeader = false,
      showDefaultFooter = false,
      url,
      onClose,
      ...props
    },
    ref,
  ) => {

    const dialogRef = useRef<HTMLDialogElement>(null);
    const lang = getLangFromUrl(url);
    const t = useTranslations(lang);

    const hideModal = () => {
      dialogRef.current?.classList.add("hide");
    };

    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current?.showModal();
      },

      close() {
        hideModal();
      },
    }), [hideModal]);

    useEffect(() => {
      const dialog = dialogRef.current;

      if (!dialog) return;

      const handleBackdrop = (event: MouseEvent) => {
        if (event.target === dialog) hideModal();
      };

      const handleCancel = (event: Event) => {
        event.preventDefault();
        hideModal();
      };

      const handleAnimation = (event: AnimationEvent) => {
        if (event.animationName !== "hide-modal") return;

        dialog.classList.remove("hide");
        dialog.close();

        onClose?.();
      };

      dialog.addEventListener("click", handleBackdrop);
      dialog.addEventListener("cancel", handleCancel);
      dialog.addEventListener("animationend", handleAnimation);

      return () => {
        dialog.removeEventListener("click", handleBackdrop);
        dialog.removeEventListener("cancel", handleCancel);
        dialog.removeEventListener("animationend", handleAnimation);
      };
    }, [hideModal, onClose]);

    return (
      <dialog
        {...props}
        ref={dialogRef}
        className="container m-auto space-y-8 overscroll-contain rounded-lg py-8 shadow backdrop:bg-neutral-400/20 backdrop:backdrop-blur-sm"
        id={id ? `modal-${id}` : undefined}
      >
        {showDefaultHeader && (
          <div className="flex grow items-center justify-between">
            <h4 className="font-title text-2xl font-medium text-pretty">
              {t(title) ?? title}
            </h4>

            {showCloseButton && (
              <button
                className="cursor-pointer text-xl font-bold text-neutral-800 outline-0 hover:text-neutral-700"
                onClick={hideModal}
                title={t('modal.close')}
              >
                <TbX aria-hidden='true' />
                <span className='sr-only'>{t('modal.close')}</span>
              </button>
            )}
          </div>
        )}

        {children}

        {showDefaultFooter && <footer>{footer}</footer>}
      </dialog>
    );
  },
);

export default Modal