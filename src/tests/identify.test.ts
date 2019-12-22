import {
  isClosingParenthesis, isClosingSquareBracket,
  isLetter,
  isNumber,
  isOpeningParenthesis, isOpeningSquareBracket,
  isOperator, isParenthesis, isQuote, isSquareBracket,
  isWhitespace
} from "../lib/helpers/identify";


test('Should identify a whitespace character', () => {
  expect(isWhitespace(' ')).toBe(true);
});

test('Should not identify a whitespace character', () => {
  expect(isWhitespace('a')).toBe(false);
});

test('Should identify a letter character', () => {
  expect(isLetter('a')).toBe(true);
});

test('Should not identify a letter character', () => {
  expect(isLetter('6')).toBe(false);
});

test('Should identify a number character', () => {
  expect(isNumber('5')).toBe(true);
});

test('Should not identify a number character', () => {
  expect(isNumber('_')).toBe(false);
});

test('Should identify a pipe operator', () => {
  expect(isOperator('>')).toBe(true);
});

test('Should not identify a plus operator', () => {
  expect(isOperator('a')).toBe(false);
});

test('Should identify opening parentheses', () => {
  expect(isOpeningParenthesis('(')).toBe(true);
});

test('Should identify closing parentheses', () => {
  expect(isClosingParenthesis(')')).toBe(true);
});

test('Should identify parentheses', () => {
  expect(isParenthesis('(')).toBe(true);
});

test('Should identify opening square brackets', () => {
  expect(isOpeningSquareBracket('[')).toBe(true);
});

test('Should identify closing square brackets', () => {
  expect(isClosingSquareBracket(']')).toBe(true);
});

test('Should identify square brackets', () => {
  expect(isSquareBracket('[')).toBe(true);
});

test('Should quote square brackets', () => {
  expect(isQuote('"')).toBe(true);
});
