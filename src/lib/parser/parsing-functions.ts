import {ParserFn, PredicateFn} from "./types/parser.model";
import {Token, TokenType} from "../tokenizer/types/token.model";
import {AstMetaData} from "./types/ast.model";
import {NumericalLiteral} from "./types/ast-node.model";

export const defaultParser: ParserFn = (tokens: Token[]) => {
    throw new TypeError(`Unsupported token: ${tokens[0]}`);
};

export const NumericalLiteralPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 0 && tokens[0].type === TokenType.Number
};

export const NumericalLiteralParser: ParserFn = (tokens: Token[]) => {
    const [numberToken, ...otherTokens] = tokens;
    return new AstMetaData(new NumericalLiteral(Number(numberToken.value)), otherTokens);
};