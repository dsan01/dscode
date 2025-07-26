import type { ContactType } from "@data/data";

// La respuesta que esperamos de nuestro propio endpoint de Astro
interface SubmissionResponse {
  success: boolean;
  message: string;
}

/**
 * Envía los datos de un formulario de contacto al endpoint de la API de Astro.
 * @param formData - Los datos del formulario a enviar.
 */
export async function sendContactForm(
  formData: ContactType,
): Promise<SubmissionResponse> {
  // 1. El endpoint ahora es el local de Astro
  const endpoint = "/api/contact";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 2. Enviamos los datos directamente, sin la envoltura 'data'
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Si nuestro endpoint devuelve un error, lo manejamos
      const errorData = await res.json();
      throw new Error(errorData.message || "Fallo en la petición a la API");
    }

    return res.json() as SubmissionResponse;
  } catch (error) {
    console.error("Ha ocurrido un error en sendContactForm:", error);
    throw error;
  }
}
