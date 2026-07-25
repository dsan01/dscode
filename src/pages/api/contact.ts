import type { APIRoute } from "astro";
import { STRAPI_BEARER, CAP_SECRET } from "astro:env/server";
import { CAP_URL, CAP_SITE } from "astro:env/client";
import apiClient from "@lib/apiClient";
import { escapeHtml, transporter } from "@lib/mail";
import { BaseEmail } from "@email/baseEmail";
import { useTranslations } from "@i18n/utils";

// Podrías importar este tipo si lo tienes definido
interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  if (!body.formData.name || !body.formData.email || !body.formData.message) {
    return new Response(
      JSON.stringify({ success: false, message: "Faltan campos requeridos." }),
      { status: 400 },
    );
  }

  if (!body.token) {
    return new Response(
      JSON.stringify({ success: false, message: "Falta validacion." }),
      { status: 400 },
    );
  }

  const lang = body.lang ?? "es";
  const t = useTranslations(lang);

  try {
    const validation_res = await fetch(`${CAP_URL}/${CAP_SITE}/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: CAP_SECRET,
        response: body.token,
      }),
    });

    if (!validation_res.ok) {
      throw new Error("Fallo en el servidor Captcha");
    }

    let vali = await validation_res.json();

    if (!vali.success) {
      throw new Error("Fallo en validación interna del Captcha");
    }

    const response = await apiClient<SubmissionResponse>({
      endpoint: "/contacts",
      method: "POST",
      body: {
        data: body.formData,
      },
      headers: {
        Authorization: `Bearer ${STRAPI_BEARER}`,
      },
    });

    if (response) {
      const htmlContent = BaseEmail({
        lang: lang,
        title: t("email.contact.title"),
        subtitle: t("email.contact.subtitle"),
        body: `
            <p>${t("email.contact.hello")}, <strong>${escapeHtml(body.formData.name)}</strong>.</p>
            <p>
              ${t("email.contact.body")}
            </p>
            <p>
              ${t("email.contact.card")}
            </p>
            <div
              style="
                margin:32px 0;
                padding:24px;
                border-left:4px solid #16B87F;
                background:#F5FBF8;
                border-radius:10px;
              "
            >
              ${escapeHtml(body.formData.message).replace(/\n/g, "<br>")}
            </div>
            <p>
              ${t("email.contact.close")}
            </p>
        `,
      });

      await transporter.sendMail({
        from:'"DSCode Contacto" <contact@devdscode.com>',
        to: `${body.formData.email}, contact@devdscode.com`,
        subject: t("email.contact.subject"),
        html: htmlContent,
      });

    }

    return new Response(
      JSON.stringify({ success: true, message: "Mensaje enviado" }),
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Error en el endpoint /api/contact al llamar a apiClient:",
      error,
    );
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 },
    );
  }
};
