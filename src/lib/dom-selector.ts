/**
 * Get element from dom by selector string
 * @example
 * 	const elementClass = getElement('.my-class')
 * 	const elementId = getElement('#my-id')
 * @param selector
 * @param context
 * @returns  HTMLElement
 */
export const getElement = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document,
) => context.querySelector<T>(selector);

/**
 * Get elements from dom by selector string
 * @example
 * 	const elements = getElement('.my-class')
 * @param selector
 * @param context
 * @returns  NodeList
 */
export const getElements = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document,
) => context.querySelectorAll<T>(selector);
