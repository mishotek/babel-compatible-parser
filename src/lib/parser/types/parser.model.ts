import {Token} from "../../tokenizer/types/token.model";
import {AstMetaData} from "./ast.model";

export type ParserFn = (tokens: Token[]) => AstMetaData;
export type PredicateFn = (tokens: Token[]) => boolean;

export interface ParserConfig {
    predicateFn: PredicateFn,
    parserFn: ParserFn
}