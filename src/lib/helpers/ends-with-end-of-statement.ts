import {Token} from "../tokenizer/types/token.model";
import {Operators} from "./operators";

export const endsWithEndOfStatement = (tokens: Token[], expressionTokens: Token[]) => {
    return tokens.length > expressionTokens.length && tokens[expressionTokens.length].value === Operators.EndOfStatement;
};
