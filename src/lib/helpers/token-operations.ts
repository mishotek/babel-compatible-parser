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
