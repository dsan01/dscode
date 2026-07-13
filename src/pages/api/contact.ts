import type { APIRoute } from "astro";
import { STRAPI_BEARER, CAP_SECRET } from "astro:env/server";
import { CAP_URL, CAP_SITE } from "astro:env/client";
// 1. Importa tu cliente de API genérico, no el de Strapi
import apiClient from "@lib/apiClient";

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

  try {

    const validation_res = await fetch(`${CAP_URL}/${CAP_SITE}/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "secret":CAP_SECRET,
        "response":body.token
      }),
    });


    if (!validation_res.ok) {
      throw new Error("Fallo en el servidor Captcha");
    }

    let vali = await validation_res.json()

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
