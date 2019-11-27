import {cutTillWhiteSpace} from "../lib/helpers/split-string";

test('Should return empty string when input is empty', () => {
  expect(cutTillWhiteSpace('', 0)).toEqual('');
});

test('Should return empty string when starting index is greater than input length', () => {
  expect(cutTillWhiteSpace('hello', 20)).toEqual('');
});

test('Should return empty string when first char is whitespace', () => {
  expect(cutTillWhiteSpace('hello there', 5)).toEqual('');
});

test('Should cut the word to the whitespace', () => {
  expect(cutTillWhiteSpace('hello there', 0)).toEqual('hello');
});

test('Should cut the word to the end of the input', () => {
  expect(cutTillWhiteSpace('hello there', 7)).toEqual('here');
});
