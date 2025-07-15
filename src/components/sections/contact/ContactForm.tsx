import { useState } from "react";
import { getLangFromUrl, useTranslations } from "@i18n/utils";
import type { BasicTranslateComponentProps } from "@data/props";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@primitives/Input";
import Textbox from "@primitives/Textbox";
import { useForm } from "react-hook-form";
import type { ContactType } from "@data/data";
import Button from "@primitives/Button";
import { sendContactForm } from "@lib/contactService";
import { Toaster, toast } from "sonner";

export const ContactForm: React.FC<BasicTranslateComponentProps> = ({
  url,
}) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup.string().required(t("contact.formErrorRequired.name")),
    email: yup
      .string()
      .required(t("contact.formErrorRequired.email"))
      .email(t("contact.formErrorInvalid.email")),
    message: yup.string().required(t("contact.formErrorRequired.message")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactType>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: ContactType) => {
    setIsLoading(true);
    try {
      const success = await sendContactForm(data);
      if (success) {
        toast.success(t("contact.toast.success"));
        reset();
        return;
      }
      toast.error(t("contact.toast.error"));
    } catch {
      toast.error(t("contact.toast.serverError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-title text-primary-700 text-center text-2xl font-medium">
        {t("contact.form.title")}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label={t("contact.formLabel.name")}
          placeholder={t("contact.formPlace.name")}
          type="text"
          errors={errors.name != null}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          label={t("contact.formLabel.email")}
          placeholder={t("contact.formPlace.email")}
          errors={errors.email != null}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <Textbox
          label={t("contact.formLabel.message")}
          placeholder={t("contact.formPlace.message")}
          errors={errors.message != null}
          errorMessage={errors.message?.message}
          {...register("message")}
        />
        <Button type="submit" variant="default" isLoading={isLoading}>
          {!isLoading ? t("contact.form.sendButton") : t("generic.loading")}
        </Button>
        <Toaster position="top-right" richColors className="!font-body" />
      </form>
    </div>
  );
};
