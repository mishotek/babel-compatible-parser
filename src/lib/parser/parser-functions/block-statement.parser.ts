import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {tokensInCurlyBraces} from "../../helpers/token-operations";
import {AstNode, BlockStatement} from "../types/ast-nodes.model";
import {parse} from "../parser";
import {AstMetaData} from "../types/ast.model";

export const blockStatementPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 1 && tokens[0].type === TokenType.CurlyBrackets && tokens[0].value === '{';
};

export const blockStatementParser: ParserFn = (tokens: Token[]) => {
    const innerTokens: Token[] = tokensInCurlyBraces(tokens);
    const remainingTokens: Token[] = tokens.slice(innerTokens.length + 2);

    const start: number = tokens[0].start;
    const end: number = tokens[innerTokens.length + 1].end;

    const body: Array<AstNode> = parse(innerTokens).body;
    const blockStatement: BlockStatement = new BlockStatement(start, end, body);

    return new AstMetaData(blockStatement, remainingTokens);
};
