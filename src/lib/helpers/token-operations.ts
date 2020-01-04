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

export const tokensInParenthesis: (tokens: Token[]) => Token[] = (tokens: Token[]) => {
    if (tokens.length == 0 || tokens[0].value != '(') {
        return [];
    }

    let parenthesisCounter = 1;
    const tokensInside: Token[] = [];

    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type === TokenType.Parenthesis && token.value === '(') {
            parenthesisCounter++;
        } else if (token.type === TokenType.Parenthesis && token.value === ')') {
            parenthesisCounter--;
        }

        if (parenthesisCounter === 0) {
            return tokensInside;
        }

        tokensInside.push(token);
    }

    throw new Error('Not enough closing parenthesis!');
};
