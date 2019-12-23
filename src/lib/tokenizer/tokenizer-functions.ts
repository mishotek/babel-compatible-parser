import {Token, TokenizerFn, TokenMetaData, TokenType} from "./types/token.model";
import {isLetter, isNumber, isOperator, isQuote, isWhitespace} from "../helpers/identify";
import * as R from "ramda";
import {cutTillWhiteSpace} from "../helpers/split-string";

export const whitespaceTokenizer: TokenizerFn = (input, cursor) => {
  return new TokenMetaData(Token.NullToken, cursor + 1);
};

export const parenthesisTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.Parenthesis, char), cursor + 1);
};

export const squareBracketsTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.SquareBrackets, char), cursor + 1);
};

export const curlyBracketsTokenizer: TokenizerFn = (input, cursor) => {
  const char = input[cursor];
  return new TokenMetaData(new Token(TokenType.CurlyBrackets, char), cursor + 1);
};

export const numberTokenizer: TokenizerFn = (input, cursor) => {
  let number = input[cursor];

  while (isNumber(input[++cursor])) {
    number += input[cursor];
  }

  if (input.length !== cursor && isLetter(input[cursor])) {
    const invalidToken = number + cutTillWhiteSpace(input, cursor);
    throw new SyntaxError(`Could't parse a number ${invalidToken}`);
  }

  return new TokenMetaData(new Token(TokenType.Number, Number(number)), cursor);
};

export const letterTokenizer: TokenizerFn = (input, cursor) => {
  let str = input[cursor];

  while (R.either(isLetter, isNumber)(input[++cursor])) {
    str += input[cursor];
  }

  return new TokenMetaData(new Token(TokenType.Name, str), cursor);
};

export const stringTokenizer: TokenizerFn = (input, cursor) => {
  let str = '';

  while (!isQuote(input[++cursor])) {
    str += input[cursor];
  }

  return new TokenMetaData(new Token(TokenType.String, str), cursor + 1);
};

export const operatorTokenizer: TokenizerFn = (input, cursor) => {
  let operator = '';

  while (cursor < input.length && !isWhitespace(input[cursor])) {
    operator += input[cursor++];
  }

  if (!isOperator(operator)) {
    throw new SyntaxError(`Unsupported operator: ${operator}`);
  }

  return new TokenMetaData(new Token(TokenType.Operator, operator), cursor);
};

export const defaultTokenizer: TokenizerFn = (input, cursor) => {
  throw new TypeError(`Unsupported character: ${input[cursor]}`);
};
