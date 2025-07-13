// Definimos la URL base de tu API en un solo lugar.
const API_BASE_URL = "http://192.168.1.82:1337/api";

interface ApiClientProps {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

/**
 * Un cliente de API genérico para realizar peticiones fetch.
 * @param endpoint - El endpoint al que apuntar (ej: /projects)
 * @param method - El método HTTP (GET, POST, etc.)
 * @param body - El cuerpo de la petición para POST/PUT.
 * @param headers - Encabezados personalizados.
 */
export default async function apiClient<T>({
  endpoint,
  method = "GET",
  body,
  headers = {},
}: ApiClientProps): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  // Configuración por defecto para las peticiones
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Si hay un cuerpo (body), lo convertimos a JSON y lo añadimos a la configuración
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, config);

    // Si la respuesta no es 'ok', lanzamos un error con más detalles.
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Intenta obtener detalles del error
      console.error(`Error en API: ${res.status} ${res.statusText}`, errorData);
      throw new Error(`Fallo en la petición a la API: ${res.statusText}`);
    }

    // Si la respuesta es 204 (No Content), no hay cuerpo que parsear.
    if (res.status === 204) {
      return undefined as T;
    }

    return res.json() as T;
  } catch (error) {
    console.error("Ha ocurrido un error en apiClient:", error);
    throw error;
  }
}
