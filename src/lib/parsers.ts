import type { StrapiBase, ProjectType /*, BlogType, etc. */ } from "@data/data";

// --- TIPO AUXILIAR ---
// Define un tipo que es básicamente cualquier objeto que tenga las propiedades de StrapiBase.
type StrapiEntity = Record<string, any> & Partial<StrapiBase>;

/**
 * Función auxiliar interna que parsea las fechas de un solo objeto.
 */
function parseStrapiItem<T extends StrapiEntity>(item: T): T {
  // Copia el objeto para no mutar el original
  const parsedItem = { ...item };

  // Parsea las fechas base que todas las colecciones tienen
  if (item.createdAt) parsedItem.createdAt = new Date(item.createdAt);
  if (item.updatedAt) parsedItem.updatedAt = new Date(item.updatedAt);
  if (item.publishedAt) parsedItem.publishedAt = new Date(item.publishedAt);

  return parsedItem;
}

// Sobrecarga 1: Si pasas un array, te devuelve un array
export function parseStrapiData<T extends StrapiEntity>(data: T[]): T[];
// Sobrecarga 2: Si pasas un solo objeto, te devuelve un solo objeto
export function parseStrapiData<T extends StrapiEntity>(data: T): T;

/**
 * Parsea los campos de fecha de string a Date para cualquier objeto o array
 * de objetos que extiendan la interfaz StrapiBase.
 * @param data El objeto o array de objetos a parsear.
 */
export function parseStrapiData<T extends StrapiEntity>(
  data: T | T[],
): T | T[] {
  // Comprueba si el input es un array y lo procesa
  if (Array.isArray(data)) {
    return data.map(parseStrapiItem);
  }

  // Si no es un array, procesa el objeto individual
  return parseStrapiItem(data);
}
