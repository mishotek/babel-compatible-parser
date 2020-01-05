import {Operators} from "../../helpers/operators";

export enum AstNodeType {
    ExpressionStatement = 'ExpressionStatement',
    Literal = 'Literal',
    Identifier = 'Identifier',
    BinaryExpression = 'BinaryExpression',
    EmptyNode = 'EmptyNode',
    Parenthesis = 'Parenthesis',
}

export interface OfAstNodeType {
    type: AstNodeType,
    start: number,
    end: number
}

export class EmptyNode implements OfAstNodeType {

    public readonly type = AstNodeType.EmptyNode;
    public start = NaN;
    public end = NaN;

}

export class ExpressionStatement implements OfAstNodeType {

    public readonly type = AstNodeType.ExpressionStatement;

    constructor(public start: number, public end: number, public expression: AstNode) { }

}

export class Parenthesis implements OfAstNodeType {

    public readonly type = AstNodeType.Parenthesis;

    constructor(public start: number, public end: number, public expression: AstNode) { }

}

export class BinaryExpression implements OfAstNodeType {

    public readonly type = AstNodeType.BinaryExpression;

    constructor(public start: number, public end: number, public left: AstNode, public operator: Operators, public right: AstNode) { }

}

export class Literal implements OfAstNodeType {

    public readonly type = AstNodeType.Literal;

    constructor(public start: number, public end: number, public value: number | string, public raw: string) { }

}

export class Identifier implements OfAstNodeType {

    public readonly type = AstNodeType.Identifier;

    constructor(public start: number, public end: number, name: number) { }

}

export type AstNode = EmptyNode |
    ExpressionStatement |
    Parenthesis |
    BinaryExpression |
    Literal |
    Identifier;