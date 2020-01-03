import {tokenize} from "../lib/tokenizer/tokenizer";
import {Token, TokenType} from "../lib/tokenizer/types/token.model";

test('Should return an array', () => {
   expect(Array.isArray(tokenize(''))).toBe(true);
});

test('Should handle parenthesis', () => {
    const input = '()';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 1,
            end: 2,
        },
    ];

   expect(tokenize(input)).toEqual(result);
});

test('Should handle square brackets', () => {
    const input = '[]';
    const result: Token[] = [
        {
            type: TokenType.SquareBrackets,
            value: '[',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.SquareBrackets,
            value: ']',
            start: 1,
            end: 2,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should handle curly brackets', () => {
    const input = '{}';
    const result: Token[] = [
        {
            type: TokenType.CurlyBrackets,
            value: '{',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.CurlyBrackets,
            value: '}',
            start: 1,
            end: 2,
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
            value: '1',
            start: 0,
            end: 1,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple single digits', () => {
    const input = '(2 6)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.Number,
            value: '2',
            start: 1,
            end: 2,
        },
        {
            type: TokenType.Number,
            value: '6',
            start: 3,
            end: 4,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 4,
            end: 5,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize single letter', () => {
    const input = 'a';
    const result: Token[] = [
        {
            type: TokenType.Name,
            value: 'a',
            start: 0,
            end: 1,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple letters', () => {
    const input = '(a b)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.Name,
            value: 'a',
            start: 1,
            end: 2,
        },
        {
            type: TokenType.Name,
            value: 'b',
            start: 3,
            end: 4,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 4,
            end: 5,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize number', () => {
    const input = '69';
    const result: Token[] = [
        {
            type: TokenType.Number,
            value: '69',
            start: 0,
            end: 2,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple numbers', () => {
    const input = '(69 96)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.Number,
            value: '69',
            start: 1,
            end: 3,
        },
        {
            type: TokenType.Number,
            value: '96',
            start: 4,
            end: 6,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 6,
            end: 7,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize names', () => {
    const input = 'abc';
    const result: Token[] = [
        {
            type: TokenType.Name,
            value: 'abc',
            start: 0,
            end: 3,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple names', () => {
    const input = '(hell0 from the other side)';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.Name,
            value: 'hell0',
            start: 1,
            end: 6,
        },
        {
            type: TokenType.Name,
            value: 'from',
            start: 7,
            end: 11,
        },
        {
            type: TokenType.Name,
            value: 'the',
            start: 12,
            end: 15,
        },
        {
            type: TokenType.Name,
            value: 'other',
            start: 16,
            end: 21,
        },
        {
            type: TokenType.Name,
            value: 'side',
            start: 22,
            end: 26,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 26,
            end: 27,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize string', () => {
    const input = '"abc"';
    const result: Token[] = [
        {
            type: TokenType.String,
            value: 'abc',
            start: 0,
            end: 5,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize multiple strings', () => {
    const input = '("123" "string with space" 123 YeY "co0l" "")';
    const result: Token[] = [
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 0,
            end: 1,
        },
        {
            type: TokenType.String,
            value: '123',
            start: 1,
            end: 6,
        },
        {
            type: TokenType.String,
            value: 'string with space',
            start: 7,
            end: 26,
        },
        {
            type: TokenType.Number,
            value: '123',
            start: 27,
            end: 30,
        },
        {
            type: TokenType.Name,
            value: 'YeY',
            start: 31,
            end: 34,
        },
        {
            type: TokenType.String,
            value: 'co0l',
            start: 35,
            end: 41,
        },
        {
            type: TokenType.String,
            value: '',
            start: 42,
            end: 44,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 44,
            end: 45,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should correctly tokenize lambda function operator', () => {
    const input = `string => {
                      print(string)
                   }`;
    const result: Token[] = [
        {
            type: TokenType.Name,
            value: 'string',
            start: 0,
            end: 6,
        },
        {
            type: TokenType.Operator,
            value: '=>',
            start: 7,
            end: 9,
        },
        {
            type: TokenType.CurlyBrackets,
            value: '{',
            start: 10,
            end: 11,
        },
        {
            type: TokenType.Name,
            value: 'print',
            start: 34,
            end: 39,
        },
        {
            type: TokenType.Parenthesis,
            value: '(',
            start: 39,
            end: 40,
        },
        {
            type: TokenType.Name,
            value: 'string',
            start: 40,
            end: 46,
        },
        {
            type: TokenType.Parenthesis,
            value: ')',
            start: 46,
            end: 47,
        },
        {
            type: TokenType.CurlyBrackets,
            value: '}',
            start: 67,
            end: 68,
        },
    ];

    expect(tokenize(input)).toEqual(result);
});

test('Should not parse invalid number', () => {
    const input = '(fn 12abc 12 "YEY")';
    expect(() => tokenize(input)).toThrowError(SyntaxError);
});

test('Should not parse invalid operator', () => {
    const input = 'arg =?> myFn(arg)';
    expect(() => tokenize(input)).toThrowError(SyntaxError);
});

test('Should not recognize non ASCII character at the beginning', () => {
    const input = 'აბა თუ გაპარსავ?';
    expect(() => tokenize(input)).toThrowError(TypeError);
});