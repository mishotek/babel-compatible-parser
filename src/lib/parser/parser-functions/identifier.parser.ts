import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {Identifier} from "../types/ast-nodes.model";
import {AstMetaData} from "../types/ast.model";

export const identifierPredicate: PredicateFn = (tokens: Token[]) => tokens.length > 0 && tokens[0].type === TokenType.Name;

export const identifierParser: ParserFn = (tokens: Token[]) => {
    const [identifierToken, ...remainingTokens] = tokens;

    const identifier: Identifier = new Identifier(identifierToken.start, identifierToken.end, identifierToken.value);

    return new AstMetaData(identifier, remainingTokens);
};