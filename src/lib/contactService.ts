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
  token?:string
): Promise<SubmissionResponse> {
  const endpoint = "/api/contact";
  if (!token) {
    throw new Error("no token");
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({formData, token}),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Fallo en la petición a la API");
    }

    return res.json() as SubmissionResponse;
  } catch (error) {
    console.error("Ha ocurrido un error en sendContactForm:", error);
    throw error;
  }
}
