import {TokenizerConfig} from "../types/token.model";
import {isLetter, isNumber, isParenthesis, isQuote, isSquareBracket, isWhitespace} from "../helpers/identify";
import {
  letterTokenizer,
  numberTokenizer,
  parenthesisTokenizer,
  squareBracketsTokenizer,
  stringTokenizer, whitespaceTokenizer
} from "./tokenizer-functions";

export const tokenizerConfig: TokenizerConfig[] = [
  {
    predicateFn: isQuote,
    tokenizerFn: stringTokenizer
  },
  {
    predicateFn: isParenthesis,
    tokenizerFn: parenthesisTokenizer
  },
  {
    predicateFn: isSquareBracket,
    tokenizerFn: squareBracketsTokenizer
  },
  {
    predicateFn: isNumber,
    tokenizerFn: numberTokenizer
  },
  {
    predicateFn: isLetter,
    tokenizerFn: letterTokenizer
  },
  {
    predicateFn: isWhitespace,
    tokenizerFn: whitespaceTokenizer
  }
];
