export enum AstNodeType {
    CallExpression = 'CallExpression',
    NumericalLiteral = 'NumericalLiteral',
    StringLiteral = 'StringLiteral',
    Identifier = 'Identifier',
    VariableDeclaration = 'VariableDeclaration',
}

export interface OfAstNodeType {
    type: AstNodeType
}

export class CallExpression implements OfAstNodeType {

    public readonly type = AstNodeType.CallExpression;

    constructor(public callee: CallExpression | Identifier,
                public args: Array<AstNode>) { }
}

export class NumericalLiteral implements OfAstNodeType {

    public readonly type = AstNodeType.NumericalLiteral;

    constructor(public value: number) { }
}

export class StringLiteral implements OfAstNodeType {

    public readonly type = AstNodeType.StringLiteral;

    constructor(public value: string) { }
}

export class Identifier implements OfAstNodeType {

    public readonly type = AstNodeType.Identifier;

    constructor(public value: string) { }
}

export class VariableDeclaration implements OfAstNodeType {

    public readonly type = AstNodeType.VariableDeclaration;

    constructor(public identifier: Identifier, public value: AstNode, public isConstant: boolean) { }
}

export type AstNode =
    CallExpression |
    NumericalLiteral |
    StringLiteral |
    Identifier |
    VariableDeclaration
