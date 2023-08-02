// react
import { RefObject } from 'react';

// gets HTMLElement from the union
export const getHTMLElement = (
  el: HTMLElement | RefObject<HTMLElement> | Document
): HTMLElement | undefined => {
  // if it's an HTMLElement, return it
  if (el instanceof HTMLElement) return el;

  // if it's the document, case it to HTMLElement and return it
  if (el instanceof Document) return document as unknown as HTMLElement;

  // if it's a "RefObject" and "ref.current" is not null, return it
  if (el.current) return el.current;

  // otherwise, return undefined
  return undefined;
};
