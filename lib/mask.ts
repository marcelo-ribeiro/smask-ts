import { tokens } from "./tokens";
import { unmask } from "./unmask";

export const mask = (value: string, pattern: string): string => {
  if (!value || !pattern) {
    throw ReferenceError("Pattern or value not found.");
  }

  let output = "";

  for (
    let unmaskedValue = unmask(value, pattern),
      unmaskedPattern = unmask(pattern),
      patternLength = pattern.length,
      i = 0,
      ii = 0;
    i < patternLength && unmaskedValue[ii];
    i++
  ) {
    const token = tokens[unmaskedPattern[ii]],
      patternChar = pattern[i],
      inputChar = unmaskedValue[ii];

    if (!token.test(inputChar)) break;
    else if (/\W/.test(patternChar)) output += patternChar;
    else (output += token.transform(inputChar)), ii++;
  }

  return output;
};
