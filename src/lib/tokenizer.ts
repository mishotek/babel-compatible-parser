import {Token, TokenizerConfig, TokenizerFn, TokenMetaData, TokenType} from "./types/token.model";
import {isLetter, isNumber, isParenthesis, isQuote, isSquareBracket, isWhitespace} from "./helpers/identify";
import * as R from "ramda";

export function tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let _cursor = 0;

    while (_cursor < input.length) {
        const char = input[_cursor];
        const tokenizerFn: TokenizerFn = getTokenizerFn(char);
        const {token, cursor} = tokenizerFn(input, _cursor);
        _cursor = cursor;
        tokens.push(token);
    }

    return tokens
        .filter(token => token !== Token.NullToken);
}

const getTokenizerFn: (char: string) => TokenizerFn = char => {
    const tokenizer: TokenizerConfig | undefined = tokenizerConfig
        .find(config => config.predicateFn(char));

    return tokenizer ? tokenizer.tokenizerFn : defaultTokenizer;
};

const whitespaceTokenizer: TokenizerFn = (input, cursor) => {
    return new TokenMetaData(Token.NullToken, cursor + 1);
};

const parenthesisTokenizer: TokenizerFn = (input, cursor) => {
    const char = input[cursor];
    return new TokenMetaData(new Token(TokenType.Parenthesis, char), cursor + 1);
};

const squareBracketsTokenizer: TokenizerFn = (input, cursor) => {
    const char = input[cursor];
    return new TokenMetaData(new Token(TokenType.SquareBrackets, char), cursor + 1);
};

const numberTokenizer: TokenizerFn = (input, cursor) => {
    let number = input[cursor];

    while (isNumber(input[++cursor])) {
        number += input[cursor];
    }

    return new TokenMetaData(new Token(TokenType.Number, number), cursor);
};

const letterTokenizer: TokenizerFn = (input, cursor) => {
    let str = input[cursor];

    while (R.either(isLetter, isNumber)(input[++cursor])) {
        str += input[cursor];
    }

    return new TokenMetaData(new Token(TokenType.Name, str), cursor);
};

const stringTokenizer: TokenizerFn = (input, cursor) => {
    let str = '';

    while (!isQuote(input[++cursor])) {
        str += input[cursor];
    }

    return new TokenMetaData(new Token(TokenType.String, str), cursor + 1);
};

const defaultTokenizer: TokenizerFn = (input, cursor) => {
    throw new TypeError(`Unsupported character: ${input[cursor]}`);
};

const tokenizerConfig: TokenizerConfig[] = [
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