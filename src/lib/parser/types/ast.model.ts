import {AstNode} from "./ast-expression.model";
import {Token} from "../../tokenizer/types/token.model";

export class AST {

    constructor(public type: string, public start: number, public end: number, public body: AstNode[], public sourceType: string) { }

}

export class AstMetaData {

    constructor(public node: AstNode,
                public remainingTokens: Token[]) { }
}