import {Expression} from "./ast-expression.model";
import {Token} from "../../tokenizer/types/token.model";

export type AST = Expression[];

export class AstMetaData {

    constructor(public expression: Expression,
                public remainingTokens: Token[]) { }
}