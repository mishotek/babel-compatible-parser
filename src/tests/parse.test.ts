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

test('Should parse string simple binary expression', () => {
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
    console.log(parse(tokens));
    expect(parse(tokens)).toEqual(ast);
});