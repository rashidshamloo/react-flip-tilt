// react
import { RefObject } from 'react';

// gets HTMLElement from the union
export const getHTMLElement = (
  el: HTMLElement | RefObject<unknown> | Document
): HTMLElement | undefined => {
  // if it's an HTMLElement, return it
  if (el instanceof HTMLElement) return el;

  // if it's the document, case it to HTMLElement and return it
  if (el instanceof Document) return document as unknown as HTMLElement;

  // if it's a "RefObject" and "ref.current.element" is an HTMLElement, return it
  // (for TiltRef, FlipTiltRef, and ParallaxRef)
  if (
    el.current &&
    el.current instanceof Object &&
    'element' in el.current &&
    el.current.element instanceof HTMLElement
  )
    return el.current.element;

  // if it's a "RefObject" and "ref.current" is an HTMLElement, return it
  if (el.current && el.current instanceof HTMLElement) return el.current;

  // otherwise, return undefined
  return undefined;
};
