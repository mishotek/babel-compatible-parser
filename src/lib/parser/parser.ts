import {Token} from "../tokenizer/types/token.model";
import {AST} from "./types/ast.model";
import {ParserConfig, ParserFn} from "./types/parser.model";
import {parserConfig} from "./parser.config";
import {defaultParser} from "./parsing-functions";

export function parse(tokens: Token[]): AST {
    const ast: AST = [];

    while (tokens.length > 0) {
        const parserFn: ParserFn = getParserFn(tokens);
        const { node, remainingTokens } = parserFn(tokens);
        ast.push(node);
        tokens = remainingTokens;
    }

    return ast;
}

const getParserFn: (tokens: Token[]) => ParserFn = (tokens: Token[]) => {
    const parser: ParserConfig | undefined = parserConfig
        .find(config => config.predicateFn(tokens));

    return parser ? parser.parserFn : defaultParser;
};
