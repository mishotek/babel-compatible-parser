import {Operators} from "../../helpers/operators";
import {VariableDeclarationTypes} from "./variable-declaration";

export enum AstNodeType {
    ExpressionStatement = 'ExpressionStatement',
    Literal = 'Literal',
    Identifier = 'Identifier',
    UnaryExpression = 'UnaryExpression',
    BinaryExpression = 'BinaryExpression',
    EmptyNode = 'EmptyNode',
    Parenthesis = 'Parenthesis',
    VariableDeclaration = 'VariableDeclaration',
    VariableDeclarator = 'VariableDeclarator',
    AssignmentExpression = 'AssignmentExpression',
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

export class VariableDeclarator implements OfAstNodeType {

    public readonly type = AstNodeType.VariableDeclarator;

    constructor(public start: number, public end: number, public id: Identifier, public init: AstNode) { }

}

export class VariableDeclaration implements OfAstNodeType {

    public readonly type = AstNodeType.VariableDeclaration;

    constructor(public start: number, public end: number, public declarations: VariableDeclarator[], public kind: VariableDeclarationTypes) { }

}

export class ExpressionStatement implements OfAstNodeType {

    public readonly type = AstNodeType.ExpressionStatement;

    constructor(public start: number, public end: number, public expression: AstNode) { }

}

export class Parenthesis implements OfAstNodeType {

    public readonly type = AstNodeType.Parenthesis;

    constructor(public start: number, public end: number, public expression: AstNode) { }

}

export class UnaryExpression implements OfAstNodeType {

    public readonly type = AstNodeType.UnaryExpression;

    constructor(public start: number, public end: number, public operator: Operators, public argument: AstNode) { }

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

    constructor(public start: number, public end: number, public name: string) { }

}

export class AssignmentExpression implements OfAstNodeType {

    public readonly type = AstNodeType.AssignmentExpression;

    constructor(public start: number, public end: number, public left: AstNode, public operator: Operators, public right: AstNode) { }
}

export type AstNode = EmptyNode |
    VariableDeclaration |
    VariableDeclarator |
    ExpressionStatement |
    Parenthesis |
    BinaryExpression |
    Literal |
    Identifier |
    UnaryExpression |
    AssignmentExpression;