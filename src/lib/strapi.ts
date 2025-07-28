import qs from "qs";
import type { ParsedQs } from "qs";
import apiClient from "./apiClient";
import type { StrapiBase } from "@data/data";
import { parseStrapiData } from "./parsers";

interface Props {
  endpoint: string;
  query?: ParsedQs;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  lang?: string;
}

type StrapiEntity = Record<string, any> & Partial<StrapiBase>;

/**
 * Fetches data from the Strapi API using 'qs' for complex queries.
 * @param endpoint - The endpoint to fetch from
 * @param query - The query object for Strapi (filters, populate, etc.)
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T extends StrapiEntity>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  lang = "es",
}: Props): Promise<T> {
  const fullQuery = {
    ...query,
    locale: lang,
  };

  const queryString = qs.stringify(fullQuery, { encodeValuesOnly: true });

  // Construimos el endpoint con la query string
  const fullEndpoint = `${endpoint}?${queryString}`;

  // Delegamos la llamada de red a nuestro cliente genérico
  let data = await apiClient<any>({
    endpoint: fullEndpoint,
    method: "GET", // Siempre será GET para esta función
  });

  // La lógica para desenvolver la respuesta de Strapi se mantiene
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return parseStrapiData(data) as T;
}
