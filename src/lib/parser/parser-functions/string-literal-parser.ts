import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstMetaData} from "../types/ast.model";
import {StringLiteral} from "../types/ast-node.model";

export const StringLiteralPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 0 && tokens[0].type === TokenType.String
};

export const StringLiteralParser: ParserFn = (tokens: Token[]) => {
    const [stringToken, ...otherTokens] = tokens;
    return new AstMetaData(new StringLiteral(stringToken.value), otherTokens);
};