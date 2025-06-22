import qs from "qs";
import type { ParsedQs } from "qs";

interface Props {
  endpoint: string;
  query?: ParsedQs;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  lang?: string;
}

/**
 * Fetches data from the Strapi API using 'qs' for complex queries.
 * @param endpoint - The endpoint to fetch from
 * @param query - The query object for Strapi (filters, populate, etc.)
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  lang = "es",
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const fullQuery = {
    ...query,
    locale: lang,
  };

  const queryString = qs.stringify(fullQuery, { encodeValuesOnly: true });

  const url = `http://192.168.1.82:1337/api/${endpoint}?${queryString}`;

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    let data = await res.json();

    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data as T;
  } catch (error) {
    console.error("An error occurred in fetchApi:", error);
    throw error;
  }
}
