export enum TokenType {
    Null = 'Null',
    Parenthesis = 'Parenthesis',
    SquareBrackets = 'SquareBrackets',
    CurlyBrackets = 'CurlyBrackets',
    Operator = 'Operator',
    Number = 'Number',
    Name = 'Name',
    String = 'String'
}

export class Token {

    public static NullToken = new Token(TokenType.Null, '', NaN, NaN);

    constructor(public type: TokenType, public value: string, public start: number, public end: number) {}

}

export class TokenMetaData {
    constructor(public token: Token, public cursor: number) {}
}

export type TokenizerFn = (input: string, cursor: number) => TokenMetaData;
export type PredicateFn = (char: string) => boolean;

export interface TokenizerConfig {
    predicateFn: PredicateFn,
    tokenizerFn: TokenizerFn
}
