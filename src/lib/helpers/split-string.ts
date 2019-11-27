import {isWhitespace} from "./identify";

export const cutTillWhiteSpace = (str: string, startingIndex: number): string => {
  let index = startingIndex;
  let result = '';

  while (index < str.length && !isWhitespace(str[index])) {
    result += str[index++];
  }

  return result;
};
