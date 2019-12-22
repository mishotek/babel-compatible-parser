import {TokenizerConfig} from "../types/token.model";
import {
  isCurlyBrackets,
  isLetter,
  isNumber, isOperator,
  isParenthesis,
  isQuote,
  isSquareBracket,
  isWhitespace
} from "../helpers/identify";
import {
  curlyBracketsTokenizer,
  letterTokenizer,
  numberTokenizer, operatorTokenizer,
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
    predicateFn: isCurlyBrackets,
    tokenizerFn: curlyBracketsTokenizer
  },
  {
    predicateFn: isOperator,
    tokenizerFn: operatorTokenizer
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
