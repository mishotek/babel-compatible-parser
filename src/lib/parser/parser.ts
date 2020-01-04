import {Token} from "../tokenizer/types/token.model";
import {AST} from "./types/ast.model";
import {ParserConfig, ParserFn} from "./types/parser.model";
import {parserConfig} from "./parser.config";
import {defaultParser} from "./parser-functions/default.parser";
import {AstNode} from "./types/ast-expression.model";

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
        const parserFn: ParserFn = getParserFn(tokens);
        const { node, remainingTokens } = parserFn(tokens);
        nodes.push(node);
        tokens = remainingTokens;
    }

    return nodes;
}

const getParserFn: (tokens: Token[]) => ParserFn = (tokens: Token[]) => {
    const parser: ParserConfig | undefined = parserConfig
        .find(config => config.predicateFn(tokens));

    return parser ? parser.parserFn : defaultParser;
};
