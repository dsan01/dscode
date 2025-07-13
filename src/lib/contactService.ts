import type { ContactType } from "@data/data";
import apiClient from "./apiClient";

// Podrías definir el tipo de la respuesta esperada, si la hay
interface SubmissionResponse {
  success: boolean;
  message: string;
}

/**
 * Envía los datos de un formulario de contacto a la API.
 * @param formData - Los datos del formulario a enviar.
 */
export async function sendContactForm(
  formData: ContactType,
): Promise<SubmissionResponse> {
  const endpoint = "/contacts";

  const headers: Record<string, string> = {};

  headers.Authorization = `Bearer 7f0d82772674c180b3042b22b589ef0b104f1005fd433b0fad0d4341d15b3b691069e91c48c74412412d48c3d9a0215a69777332039bcc23480eb0d10c3352d576f9ba458289d2ffc67fe6fec2b398ea8c9618b6ad396cbc550e11afb7691dbb382647a9fd5e03174d0f428f8fe4064a62905c489406ad31aca2901d41a26a6d`;
  return apiClient<SubmissionResponse>({
    endpoint,
    headers: headers,
    method: "POST",
    body: {
      data: formData,
    },
  });
}
