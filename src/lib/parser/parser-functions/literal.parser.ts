import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstMetaData} from "../types/ast.model";
import {Literal} from "../types/ast-nodes.model";
import R = require("ramda");
import {defaultParser} from "./default.parser";

const numericalLiteralPredicate: PredicateFn = (tokens: Token[]) => {
    const hasTokens = tokens.length > 0;
    const isNumber = hasTokens && tokens[0].type === TokenType.Number;
    const isNaNLiteral = hasTokens && tokens[0].type === TokenType.Name && tokens[0].value === 'NaN';

    return isNumber || isNaNLiteral;
};

const numericalLiteralParser: ParserFn = (tokens: Token[]) => {
    const [numberToken, ...otherTokens] = tokens;
    return new AstMetaData(new Literal(
        numberToken.start,
        numberToken.end,
        Number(numberToken.value),
        numberToken.value), otherTokens);
};

const stringLiteralPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 0 && tokens[0].type === TokenType.String
};

const stringLiteralParser: ParserFn = (tokens: Token[]) => {
    const [stringToken, ...otherTokens] = tokens;
    return new AstMetaData(new Literal(
        stringToken.start,
        stringToken.end,
        stringToken.value,
        "'" + stringToken.value + "'"), otherTokens);
};

export const literalPredicate: PredicateFn = R.either(numericalLiteralPredicate, stringLiteralPredicate);

export const literalParser: ParserFn = (tokens: Token[]) => {
    if (numericalLiteralPredicate(tokens)) {
        return numericalLiteralParser(tokens);
    } else if (stringLiteralPredicate(tokens)) {
        return stringLiteralParser(tokens);
    }

    return defaultParser(tokens);
};
