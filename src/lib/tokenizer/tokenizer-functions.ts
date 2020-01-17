import {Token, TokenizerFn, TokenMetaData, TokenType} from "./types/token.model";
import {isLetter, isNumber, isOperator, isQuote, isWhitespace} from "../helpers/identify";
import * as R from "ramda";
import {cutTillWhiteSpace} from "../helpers/split-string";
import {Operators, OPERATORS, SYMBOL_OPERATORS} from "../helpers/operators";

export const whitespaceTokenizer: TokenizerFn = (input, cursor) => {
  return new TokenMetaData(Token.NullToken, cursor + 1);
};

export const parenthesisTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.Parenthesis, char, cursor, cursor + 1), cursor + 1);
};

export const squareBracketsTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.SquareBrackets, char, cursor, cursor + 1), cursor + 1);
};

export const curlyBracketsTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.CurlyBrackets, char, cursor, cursor + 1), cursor + 1);
};

export const numberTokenizer: TokenizerFn = (input, cursor) => {
  const start = cursor;
  let number = input[cursor];

  while (isNumber(input[++cursor])) {
    number += input[cursor];
  }

  if (input.length !== cursor && isLetter(input[cursor])) {
    const invalidToken = number + cutTillWhiteSpace(input, cursor);
    throw new SyntaxError(`Could't parse a number ${invalidToken}`);
  }

  return new TokenMetaData(new Token(TokenType.Number, number, start, cursor), cursor);
};

export const letterTokenizer: TokenizerFn = (input, cursor) => {
  const start = cursor;

  let str = input[cursor];

  while (R.either(isLetter, isNumber)(input[++cursor])) {
    str += input[cursor];
  }

  return new TokenMetaData(new Token(TokenType.Name, str, start, cursor), cursor);
};

export const stringTokenizer: TokenizerFn = (input, cursor) => {
  const start = cursor;

  let str = '';

  while (!isQuote(input[++cursor])) {
    str += input[cursor];
  }

  return new TokenMetaData(new Token(TokenType.String, str, start, cursor + 1), cursor + 1);
};

export const operatorTokenizer: TokenizerFn = (input, cursor) => {
  const start = cursor;
  const fromStart = input.slice(cursor);

  console.log(fromStart);
  const operator = OPERATORS.find(matchesOperator(fromStart));

  if (!operator) {
    throw new SyntaxError(`Unsupported operator starting at: ${cursor} (${fromStart.slice(0, 6)}...)`);
  }

  cursor += operator.length;

  return new TokenMetaData(new Token(TokenType.Operator, operator, start, cursor), cursor);
};

export const defaultTokenizer: TokenizerFn = (input, cursor) => {
  throw new TypeError(`Unsupported character: ${input[cursor]}`);
};

export const isOperatorString = (str: string) => {
  return OPERATORS.some(matchesOperator(str));
};

export const matchesOperator = (strToMatch: string) => (operator: string) => {
  const startsWithOperator = strToMatch.indexOf(operator) === 0;
  const isNotFollowedByLetter = !isLetter(strToMatch[operator.length]);
  const isSymbolOperator = SYMBOL_OPERATORS.includes(operator);

  console.log(strToMatch, operator);

  return startsWithOperator && (isNotFollowedByLetter || isSymbolOperator);
};

export const WithSingleChar = (fn: (char: string) => boolean) => (str: string) => fn(str[0]);
