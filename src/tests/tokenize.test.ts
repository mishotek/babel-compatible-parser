import {tokenize} from "../lib/tokenizer/tokenizer";
import {Token, TokenType} from "../lib/types/token.model";

test('Should return an array', () => {
   expect(Array.isArray(tokenize(''))).toBe(true);
});

test('Should handle parenthesis', () => {
    const input = '()';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

   expect(tokenize(input)).toEqual(result);
});

test('Should handle square brackets', () => {
    const input = '[]';
    const result: Token[] = [
        {
            type: TokenType.SquareBrackets,
            value: '['
        },
        {
            type: TokenType.SquareBrackets,
            value: ']'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should ignore whitespaces completely', () => {
   expect(tokenize('          ')).toEqual([]);
});

test('Should correctly tokenize single digit', () => {
    const input = '1';
    const result: Token[] = [
        {
            type: TokenType.Number,
            value: '1'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple single digits', () => {
    const input = '(2 6)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.Number,
            value: '2'
        },
        {
            type: TokenType.Number,
            value: '6'
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize single letter', () => {
    const input = 'a';
    const result: Token[] = [
        {
            type: TokenType.Name,
            value: 'a'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple letters', () => {
    const input = '(a b)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.Name,
            value: 'a'
        },
        {
            type: TokenType.Name,
            value: 'b'
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize number', () => {
    const input = '69';
    const result: Token[] = [
        {
            type: TokenType.Number,
            value: '69'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple numbers', () => {
    const input = '(69 96)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.Number,
            value: '69'
        },
        {
            type: TokenType.Number,
            value: '96'
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize names', () => {
    const input = 'abc';
    const result: Token[] = [
        {
            type: TokenType.Name,
            value: 'abc'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple names', () => {
    const input = '(hell0 from the other side)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.Name,
            value: 'hell0'
        },
        {
            type: TokenType.Name,
            value: 'from'
        },
        {
            type: TokenType.Name,
            value: 'the'
        },
        {
            type: TokenType.Name,
            value: 'other'
        },
        {
            type: TokenType.Name,
            value: 'side'
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize string', () => {
    const input = '"abc"';
    const result: Token[] = [
        {
            type: TokenType.String,
            value: 'abc'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple strings', () => {
    const input = '("123" "string" 123 YeY "co0l" "")';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '('
        },
        {
            type: TokenType.String,
            value: '123'
        },
        {
            type: TokenType.String,
            value: 'string'
        },
        {
            type: TokenType.Number,
            value: '123'
        },
        {
            type: TokenType.Name,
            value: 'YeY'
        },
        {
            type: TokenType.String,
            value: 'co0l'
        },
        {
            type: TokenType.String,
            value: ''
        },
        {
            type: TokenType.Parenthesis,
            value: ')'
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should not parse with invalid input', () => {
    const input = '12abc';
    expect(() => tokenize(input)).toThrowError(SyntaxError);
});
