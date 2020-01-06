import {TokenizerConfig} from "./types/token.model";
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
  curlyBracketsTokenizer, isOperatorString,
  letterTokenizer,
  numberTokenizer, operatorTokenizer,
  parenthesisTokenizer,
  squareBracketsTokenizer,
  stringTokenizer, whitespaceTokenizer, WithSingleChar
} from "./tokenizer-functions";

export const tokenizerConfig: TokenizerConfig[] = [
  {
    predicateFn: WithSingleChar(isQuote),
    tokenizerFn: stringTokenizer
  },
  {
    predicateFn: WithSingleChar(isParenthesis),
    tokenizerFn: parenthesisTokenizer
  },
  {
    predicateFn: WithSingleChar(isSquareBracket),
    tokenizerFn: squareBracketsTokenizer
  },
  {
    predicateFn: WithSingleChar(isCurlyBrackets),
    tokenizerFn: curlyBracketsTokenizer
  },
  {
    predicateFn: isOperatorString,
    tokenizerFn: operatorTokenizer
  },
  {
    predicateFn: WithSingleChar(isNumber),
    tokenizerFn: numberTokenizer
  },
  {
    predicateFn: WithSingleChar(isLetter),
    tokenizerFn: letterTokenizer
  },
  {
    predicateFn: WithSingleChar(isWhitespace),
    tokenizerFn: whitespaceTokenizer
  }
];
