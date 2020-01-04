import {Token, TokenType} from "../lib/tokenizer/types/token.model";
import {parse} from "../lib/parser/parser";

test('Should parse numerical literal', () => {
    const tokens: Token[] = [ new Token(TokenType.Number, '2', 0, 1) ];
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 1,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 1,
                "expression": {
                    "type": "Literal",
                    "start": 0,
                    "end": 1,
                    "value": 2,
                    "raw": "2"
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse string literal', () => {
    const tokens: Token[] = [ new Token(TokenType.String, 'string with space', 0, 19) ];
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 19,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                    "type": "Literal",
                    "start": 0,
                    "end": 19,
                    "value": "string with space",
                    "raw": "'string with space'"
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse simple binary expression', () => {
    const tokens: Token[] = [
        new Token(TokenType.Number, '1', 0, 1),
        new Token(TokenType.Operator, '+', 2, 3),
        new Token(TokenType.Number, '2', 4, 5),
    ];
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 5,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 5,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 5,
                    "left": {
                        "type": "Literal",
                        "start": 0,
                        "end": 1,
                        "value": 1,
                        "raw": "1"
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "start": 4,
                        "end": 5,
                        "value": 2,
                        "raw": "2"
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse simple binary expression with parenthesis around', () => {
    const tokens: Token[] = [
        new Token(TokenType.Parenthesis, '(', 0, 1),
        new Token(TokenType.Number, '1', 1, 2),
        new Token(TokenType.Operator, '+', 3, 4),
        new Token(TokenType.Number, '2', 5, 6),
        new Token(TokenType.Parenthesis, ')', 6, 7),
    ];

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 7,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 1,
                    "end": 6,
                    "left": {
                        "type": "Literal",
                        "start": 1,
                        "end": 2,
                        "value": 1,
                        "raw": "1"
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
                        "value": 2,
                        "raw": "2"
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

// test('Should parse stacked binary expression', () => {
//     const tokens: Token[] = [
//         new Token(TokenType.Parenthesis, '(', 0, 1),
//         new Token(TokenType.Number, '1', 1, 2),
//         new Token(TokenType.Operator, '+', 3, 4),
//         new Token(TokenType.Number, '2', 5, 6),
//         new Token(TokenType.Parenthesis, ')', 6, 7),
//
//         new Token(TokenType.Operator, '+', 8, 9),
//
//         new Token(TokenType.Parenthesis, '(', 10, 11),
//         new Token(TokenType.Number, '2', 11, 12),
//         new Token(TokenType.Operator, '+', 13, 14),
//         new Token(TokenType.Number, '3', 15, 16),
//         new Token(TokenType.Parenthesis, ')', 16, 17),
//     ];
//
//     const ast = {
//         "type": "Program",
//         "start": 0,
//         "end": 17,
//         "body": [
//             {
//                 "type": "ExpressionStatement",
//                 "start": 0,
//                 "end": 17,
//                 "expression": {
//                     "type": "BinaryExpression",
//                     "start": 0,
//                     "end": 17,
//                     "left": {
//                         "type": "BinaryExpression",
//                         "start": 1,
//                         "end": 6,
//                         "left": {
//                             "type": "Literal",
//                             "start": 1,
//                             "end": 2,
//                             "value": 1,
//                             "raw": "1"
//                         },
//                         "operator": "+",
//                         "right": {
//                             "type": "Literal",
//                             "start": 5,
//                             "end": 6,
//                             "value": 2,
//                             "raw": "2"
//                         }
//                     },
//                     "operator": "+",
//                     "right": {
//                         "type": "BinaryExpression",
//                         "start": 11,
//                         "end": 16,
//                         "left": {
//                             "type": "Literal",
//                             "start": 11,
//                             "end": 12,
//                             "value": 2,
//                             "raw": "2"
//                         },
//                         "operator": "+",
//                         "right": {
//                             "type": "Literal",
//                             "start": 15,
//                             "end": 16,
//                             "value": 3,
//                             "raw": "3"
//                         }
//                     }
//                 }
//             }
//         ],
//         "sourceType": "module"
//     };
//
//     expect(parse(tokens)).toEqual(ast);
// });