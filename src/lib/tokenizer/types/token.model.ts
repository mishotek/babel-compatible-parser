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

    public static NullToken = new Token(TokenType.Null, '');

    constructor(public type: TokenType, public value: string | number) {}

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
