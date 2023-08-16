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

// source: https://github.com/epoberezkin/fast-deep-equal/blob/master/src/index.jst
export const isDeepEqual = (a: any, b: any) => {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    let length, i;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!isDeepEqual(a[i], b[i])) return false;
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      for (i of a.entries()) if (!isDeepEqual(i[1], b.get(i[0]))) return false;
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = (a as any).length;
      if (length != (a as any).length) return false;
      for (i = length; i-- !== 0; )
        if ((a as any)[i] !== (a as any)[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        continue;
      }

      if (!isDeepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
};
