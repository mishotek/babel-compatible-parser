import * as R from "ramda";

const WHITESPACE = /\s+/;
const LETTER = /[a-zA-Z]/;
const NUMBER = /^[0-9]+$/;
const OPERATORS = ['+', '-', '*', '/', '%'];

export const isWhitespace: (char: string) => boolean = char => !!char && WHITESPACE.test(char);

export const isLetter: (char: string) => boolean = char => !!char && LETTER.test(char);

export const isNumber: (char: string) => boolean = char => !!char && NUMBER.test(char);

export const isOperator: (char: string) => boolean = char => !!char && OPERATORS.includes(char);

export const isOpeningParenthesis: (char: string) => boolean = char => char === '(';
export const isClosingParenthesis: (char: string) => boolean = char => char === ')';
export const isParenthesis: (char: string) => boolean = R.either(isOpeningParenthesis, isClosingParenthesis);

export const isOpeningSquareBracket: (char: string) => boolean = char => char === '[';
export const isClosingSquareBracket: (char: string) => boolean = char => char === ']';
export const isSquareBracket: (char: string) => boolean = R.either(isOpeningSquareBracket, isClosingSquareBracket);

export const isQuote: (char: string) => boolean = char => char == '"';
