export enum TokenType {
    Parenthesis = 'Parenthesis',
    SquareBrackets = 'SquareBrackets',
    Number = 'Number',
    Name = 'Name',
    String = 'String'
}

export interface Token {
    type: TokenType,
    value: string
}