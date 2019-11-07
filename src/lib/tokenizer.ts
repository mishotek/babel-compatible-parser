import {Token, TokenType} from "./types/token.model";
import {isLetter, isNumber, isParenthesis, isQuote, isSquareBracket, isWhitespace} from "./helpers/identify";
import * as R from "ramda";

export const tokenize: (input: string) => Token[] = input => {
    const tokens: Token[] = [];
    let cursor = 0;

    while (cursor < input.length) {
        const char = input[cursor];

        if (isQuote(char)) {
            let str = '';

            while (!isQuote(input[++cursor])) {
                str += input[cursor];
            }

            tokens.push({
                type: TokenType.String,
                value: str
            });
            cursor++;
            continue;
        }

        if (isParenthesis(char)) {
            tokens.push({
                type: TokenType.Parenthesis,
                value: char
            });
            cursor++;
            continue;
        }

        if (isSquareBracket(char)) {
            tokens.push({
                type: TokenType.SquareBrackets,
                value: char
            });
            cursor++;
            continue;
        }

        if (isNumber(char)) {
            let number = char;

            while (isNumber(input[++cursor])) {
                number += input[cursor];
            }

            tokens.push({
                type: TokenType.Number,
                value: number
            });
            continue;
        }

        if (isLetter(char)) {
            let str = char;
            while (R.either(isLetter, isNumber)(input[++cursor])) {
                str += input[cursor];
            }

            tokens.push({
                type: TokenType.Name,
                value: str
            });
            continue;
        }

        if (isWhitespace(char)) {
            cursor++;
            continue;
        }

        cursor++;
    }

    return tokens;
};
