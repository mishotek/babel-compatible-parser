import {Token, TokenType} from "../tokenizer/types/token.model";
import {Operators} from "./operators";

const tokenValueMatches = (value: string) => (token: Token) => token.value === value;

export const tokensTill = (lastValue: string) => (tokens: Token[]): Token[] => {
    const matchingTokenIndex = tokens.findIndex(tokenValueMatches(lastValue));

    if (matchingTokenIndex === -1) {
        return tokens;
    }

    return [...tokens].slice(0, matchingTokenIndex);
};

export const fromToken = (firstValue: string) => (tokens: Token[]): Token[] => {
    const matchingTokenIndex = tokens.findIndex(tokenValueMatches(firstValue));

    if (matchingTokenIndex === -1) {
        return [];
    }

    return [...tokens].slice(matchingTokenIndex + 1);
};

export const tillTheEndOfStatement = tokensTill(';');

export const afterTheEndOfStatement  = fromToken(';');

export const insideOf = (opening: string, closing: string) => (tokens: Token[]) => {
    if (tokens.length == 0 || tokens[0].value != opening) {
        return [];
    }

    let parenthesisCounter = 1;
    const tokensInside: Token[] = [];

    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.value === opening) {
            parenthesisCounter++;
        } else if (token.value === closing) {
            parenthesisCounter--;
        }

        if (parenthesisCounter === 0) {
            return tokensInside;
        }

        tokensInside.push(token);
    }

    throw new SyntaxError(`Not enough closing parenthesis starting at ${tokens[0].start}`);
};

export const tokensInParenthesis: (tokens: Token[]) => Token[] = insideOf('(', ')');

export const tokensInCurlyBraces: (tokens: Token[]) => Token[] = insideOf('{', '}');

