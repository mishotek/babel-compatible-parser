import {Token, TokenType} from "../tokenizer/types/token.model";
import {Operators} from "./operators";

const isEndOfStatementToken = (token: Token) => {
    return token && token.type === TokenType.Operator && token.value === Operators.EndOfStatement;
};

export const tillTheEndOfStatement = (tokens: Token[]) => {
    const lastIndex = tokens.findIndex(isEndOfStatementToken);

    if (lastIndex === -1) {
        return [];
    }

    return [...tokens].slice(0, lastIndex);
};

const tokenValueMatches = (value: string) => (token: Token) => token.value === value;

export const tokensTill = (lastValue: string) => (tokens: Token[]): Token[] => {
    const matchingTokenIndex = tokens.findIndex(tokenValueMatches(lastValue));

    if (matchingTokenIndex === -1) {
        return [];
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