import {Token} from "../../tokenizer/types/token.model";
import {AstMetaData} from "./ast.model";
import {AstNode} from "./ast-expression.model";

export type ParserFn = (tokens: Token[]) => AstMetaData;
export type ParserFnWithLeftNode = (tokens: Token[], leftNode: AstNode) => AstMetaData;
export type PredicateFn = (tokens: Token[]) => boolean;

export interface ParserConfig {
    predicateFn: PredicateFn,
    parserFn: ParserFn
}