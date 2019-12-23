export enum AstNodeType {
    CallExpression = 'CallExpression',
    NumericalLiteral = 'NumericalLiteral',
}

export interface OfAstNodeType {
    type: AstNodeType
}

export class CallExpression implements OfAstNodeType {

    public readonly type = AstNodeType.CallExpression;

    constructor(public name: string,
                public args: Array<AstNode>) { }
}

export class NumericalLiteral implements OfAstNodeType {

    public readonly type = AstNodeType.NumericalLiteral;

    constructor(public value: number) { }
}

export type AstNode = CallExpression | NumericalLiteral