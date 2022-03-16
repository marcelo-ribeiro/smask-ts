/**
 * Number
 */
export const number = (
  value: number,
  style = "decimal",
  options?: Intl.NumberFormatOptions,
  locale = "pt-BR"
): string => {
  const defaultOptions = getOptions(locale)[style];
  options = { ...defaultOptions, ...options };
  return new Intl.NumberFormat(locale, options).format(value);
};

/* To be updated based on need - French - Canada and US locale handled  */
const currencyToLocale = new Map([
  ["en-US", "USD"],
  ["pt-BR", "BRL"],
  ["fr-CA", "CAD"],
]);

const getOptions = (locale: string): any => ({
  currency: {
    style: "currency",
    currency: currencyToLocale.get(locale),
  },
  decimal: {},
  percent: {},
});
