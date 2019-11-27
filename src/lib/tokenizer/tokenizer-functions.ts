import {Token, TokenizerFn, TokenMetaData, TokenType} from "../types/token.model";
import {isLetter, isNumber, isQuote} from "../helpers/identify";
import * as R from "ramda";

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

export const numberTokenizer: TokenizerFn = (input, cursor) => {
  let number = input[cursor];

  while (isNumber(input[++cursor])) {
    number += input[cursor];
  }

  return new TokenMetaData(new Token(TokenType.Number, number), cursor);
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

export const defaultTokenizer: TokenizerFn = (input, cursor) => {
  throw new TypeError(`Unsupported character: ${input[cursor]}`);
};
