import * as R from "ramda";
import {OPERATORS} from "./operators";

const WHITESPACE = /\s+/;
const LETTER = /[a-zA-Z]/;
const NUMBER = /^[0-9]+$/;

export const isMatchingString: ((stringToMatch: string) => (arg: any) => boolean) = (stringToMatch: string) => (arg: any) => arg === stringToMatch;

export const isWhitespace: (char: string) => boolean = char => !!char && WHITESPACE.test(char);

export const isLetter: (char: string) => boolean = char => !!char && LETTER.test(char);

export const isNumber: (char: string) => boolean = char => !!char && NUMBER.test(char);

export const isOperator: (str: string) => boolean = str => !!str && OPERATORS.includes(str);

export const isOpeningParenthesis: (char: string) => boolean = isMatchingString('(');
export const isClosingParenthesis: (char: string) => boolean = isMatchingString(')');
export const isParenthesis: (char: string) => boolean = R.either(isOpeningParenthesis, isClosingParenthesis);

export const isOpeningSquareBracket: (char: string) => boolean = isMatchingString('[');
export const isClosingSquareBracket: (char: string) => boolean = isMatchingString(']');
export const isSquareBracket: (char: string) => boolean = R.either(isOpeningSquareBracket, isClosingSquareBracket);

export const isOpeningCurlyBrackets: (char: string) => boolean = isMatchingString('{');
export const isClosingCurlyBrackets: (char: string) => boolean = isMatchingString('}');
export const isCurlyBrackets: (char: string) => boolean = R.either(isOpeningCurlyBrackets, isClosingCurlyBrackets);

export const isQuote: (char: string) => boolean = char => char == '"';
