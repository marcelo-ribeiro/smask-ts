import { mask } from "./mask";
import { unmaskNumber } from "./unmaskNumber";
import { currency } from "./currency";
import { getDatePattern, maskDate } from "./date";

export const elements = new Map();

const setElements = (element: HTMLInputElement, options = {}) =>
  elements.set(element, {
    ...elements.get(element),
    ...options,
  });

/**
 * maskInput
 */
export const input = (
  element: string | HTMLInputElement,
  patterns: string | string[]
): void => {
  if (!Array.isArray(patterns)) throw ReferenceError("Pattern is not an array");
  if (!patterns) throw ReferenceError("Missing second parameter pattern.");

  const el: HTMLInputElement | null =
    typeof element === "object" ? element : document.querySelector(element);

  if (!el) throw Error("Element not found.");

  elements.set(el, {});

  if (patterns.length > 1) patterns.sort((a, b) => a.length - b.length);

  const [pattern, dynamicPattern] = patterns;

  let listener: () => void;

  // Initialize input listener by mask
  switch (pattern) {
    case "currency": {
      el.placeholder = currency(0);
      listener = () => {
        const unmaskedNumber = unmaskNumber(el.value, pattern);
        el.value = currency(unmaskedNumber, pattern);
      };
      break;
    }
    case "date": {
      const pattern = getDatePattern();
      el.minLength = el.maxLength =
        // el.minlength =
        // el.maxlength =
        pattern.length;
      el.pattern = `.{${pattern.length},${pattern.length}}`;
      listener = () => {
        el.value = maskDate(el, pattern);
        setElements(el, { oldValue: el.value });
      };
      break;
    }
    default: {
      el.minLength =
        // el.minlength =
        pattern.length;
      el.maxLength =
        // el.maxlength =
        dynamicPattern?.length || pattern.length;
      el.pattern = `.{${pattern.length},${
        dynamicPattern?.length || pattern.length
      }}`;
      listener = dynamicPattern
        ? () => {
            const computedPattern =
              el.value.length <= pattern.length ? pattern : dynamicPattern;
            el.value = mask(el.value, computedPattern);
          }
        : () => (el.value = mask(el.value, pattern));
    }
  }
  el.value && listener();
  el.addEventListener("input", listener);
};
