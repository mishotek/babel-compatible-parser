import {AstNode} from "./ast-node.model";
import {Token} from "../../tokenizer/types/token.model";

export type AST = AstNode[];

export class AstMetaData {

    constructor(public node: AstNode,
                public remainingTokens: Token[]) { }
}