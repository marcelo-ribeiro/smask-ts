import { tokens } from "./tokens";
import { unmask } from "./unmask";

/**
 * Mask
 */
export const mask = (value: string, pattern: string): string => {
  if (!value || !pattern) return value;

  let output = "";

  for (
    let input = unmask(value, pattern),
      unmasked = unmask(pattern),
      i = 0,
      ii = 0,
      pl = pattern.length;
    i < pl && input[ii];
    i++
  ) {
    const token = tokens[unmasked[ii]],
      patternChar = pattern[i],
      inputChar = input[ii];

    if (!token.test(inputChar)) break;
    else if (/\W/.test(patternChar)) output += patternChar;
    else (output += token.transform(inputChar)), ii++;
  }

  return output;
};
