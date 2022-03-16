import { mask } from "./mask";
import { elements } from "./input";

const dateParts = (locales?: string | string[] | undefined) =>
  new Intl.DateTimeFormat(locales).formatToParts();
const initialDate = "01/01/1970".replace(/\D/g, "");
const getMaskedDate = (value: string, pattern: string) => mask(value, pattern);
const getComputedDate = (value: string) => {
  value = value.replace(/\D/g, "");
  return value + initialDate.slice(value.length);
};

/**
 * Get Date Masked
 */
export const maskDate = (
  element: HTMLInputElement,
  pattern: string,
  locale?: string
): string => {
  const dateObject = date(
    getMaskedDate(getComputedDate(element.value), pattern),
    locale
  );
  return mask(
    isNaN(dateObject.valueOf())
      ? elements.get(element).oldValue
      : element.value,
    pattern
  );
};

/**
 * Get Date Pattern
 */
export const getDatePattern = (locale?: string): string => {
  let pattern = "";
  dateParts(locale).forEach(({ type, value }) => {
    if (type === "month" || type === "day") pattern += "dd";
    else if (type === "year") pattern += "dddd";
    else if (type === "literal") pattern += value;
  });
  return pattern;
};

/**
 * Convert string to locale date
 */
export const date = (value: string, locale?: string): Date => {
  const valueArray = value.split("/");
  const { month, day, year }: any = {
    [dateParts(locale)[0].type]: valueArray[0],
    [dateParts(locale)[2].type]: valueArray[1],
    [dateParts(locale)[4].type]: valueArray[2],
  };
  const dateFormat = `${month}/${day}/${year}`;
  return new Date(dateFormat);
};
