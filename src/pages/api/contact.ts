import type { APIRoute } from "astro";
import { STRAPI_BEARER } from "astro:env/server";
// 1. Importa tu cliente de API genérico, no el de Strapi
import apiClient from "@lib/apiClient";

// Podrías importar este tipo si lo tienes definido
interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.json();

  if (!formData.name || !formData.email || !formData.message) {
    return new Response(
      JSON.stringify({ message: "Faltan campos requeridos." }),
      { status: 400 },
    );
  }

  try {
    const response = await apiClient<SubmissionResponse>({
      endpoint: "/contacts",
      method: "POST",
      body: {
        data: formData,
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
