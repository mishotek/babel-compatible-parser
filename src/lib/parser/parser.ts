import {Token} from "../tokenizer/types/token.model";
import {AST, AstMetaData} from "./types/ast.model";
import {ParserConfig, ParserFn} from "./types/parser.model";
import {parserConfig} from "./parser.config";
import {defaultParser} from "./parser-functions/default.parser";
import {AstNode} from "./types/ast-expression.model";
import {expressionStatementParser} from "./parser-functions/expression-statment.parser";
import R = require("ramda");

export function parse(tokens: Token[]): AST {
    const type = 'Program';
    const start = 0;
    const end = tokens.length > 0 ? tokens[tokens.length - 1].end : 0;
    const body: AstNode[] = __parse(tokens);
    const sourceType = 'module';

    return new AST(type, start, end, body, sourceType);
}

export function __parse(tokens: Token[]): AstNode[] {
    const nodes: AstNode[] = [];

    while (tokens.length > 0) {
        const { node, remainingTokens } = __singleTurnParser(tokens);
        nodes.push(node);
        tokens = remainingTokens;
    }

    return nodes;
}

export function __singleTurnParser(tokens: Token[], skipExpressionStatement = false): AstMetaData {
    const parserFn: ParserFn = getParserFn(tokens, skipExpressionStatement);
    return parserFn(tokens);
}

const getParserFn: (tokens: Token[], skipExpressionStatement: boolean) => ParserFn = (tokens: Token[], skipExpressionStatement: boolean) => {
    const matchesRestrictions = (config: ParserConfig) => !skipExpressionStatement || config.parserFn !== expressionStatementParser;
    const matchesPredicate = (config: ParserConfig) => config.predicateFn(tokens);

    const parser: ParserConfig | undefined = parserConfig
        .find(R.allPass([matchesRestrictions, matchesPredicate]));

    return parser ? parser.parserFn : defaultParser;
};
