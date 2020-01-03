export enum ExpressionType {
    ExpressionStatement = 'ExpressionStatement',
    Literal = 'Literal',
    Identifier = 'Identifier',
}

export interface Expression {
    type: ExpressionType,
    start: number,
    end: number
}

export class ExpressionStatement implements Expression {

    public readonly type = ExpressionType.ExpressionStatement;

    constructor(public start: number, public end: number, expression: Expression) { }

}

export class Literal implements Expression {

    public readonly type = ExpressionType.Literal;

    constructor(public start: number, public end: number, value: number | string, raw: string) { }

}

export class Identifier implements Expression {

    public readonly type = ExpressionType.Identifier;

    constructor(public start: number, public end: number, name: number) { }

}