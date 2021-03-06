import {Token, TokenType} from "../lib/tokenizer/types/token.model";
import {parse} from "../lib/parser/parser";
import {tokenize} from "../lib/tokenizer/tokenizer";
import {EmptyNode, ExpressionStatement} from "../lib/parser/types/ast-nodes.model";
import {wrapInExpressionStatement} from "../lib/parser/parser-functions/expression-statment.parser";
import {literalParser} from "../lib/parser/parser-functions/literal.parser";
import {tokensInParenthesis} from "../lib/helpers/token-operations";

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

test('Should parse NaN as literal', () => {
    const tokens: Token[] = tokenize('NaN');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 3,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 3,
                "expression": {
                    "type": "Literal",
                    "start": 0,
                    "end": 3,
                    "value": NaN,
                    "raw": "NaN"
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

test('Should parse stacked binary expression', () => {
    const tokens: Token[] = tokenize('1 + 2 + 3;');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 10,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 9,
                    "left": {
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
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "start": 8,
                        "end": 9,
                        "value": 3,
                        "raw": "3"
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse stacked binary expression with parenthesis', () => {
    const tokens: Token[] = tokenize('1 + (2 + 3);');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 12,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 11,
                    "left": {
                        "type": "Literal",
                        "start": 0,
                        "end": 1,
                        "value": 1,
                        "raw": "1"
                    },
                    "operator": "+",
                    "right": {
                        "type": "BinaryExpression",
                        "start": 5,
                        "end": 10,
                        "left": {
                            "type": "Literal",
                            "start": 5,
                            "end": 6,
                            "value": 2,
                            "raw": "2"
                        },
                        "operator": "+",
                        "right": {
                            "type": "Literal",
                            "start": 9,
                            "end": 10,
                            "value": 3,
                            "raw": "3"
                        }
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse stacked binary expression with parenthesis', () => {
    const tokens: Token[] = tokenize('(1 + 2) + (3 + 4);');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 18,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 17,
                    "left": {
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
                    },
                    "operator": "+",
                    "right": {
                        "type": "BinaryExpression",
                        "start": 11,
                        "end": 16,
                        "left": {
                            "type": "Literal",
                            "start": 11,
                            "end": 12,
                            "value": 3,
                            "raw": "3"
                        },
                        "operator": "+",
                        "right": {
                            "type": "Literal",
                            "start": 15,
                            "end": 16,
                            "value": 4,
                            "raw": "4"
                        }
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse stacked binary expression with multiple parenthesis', () => {
    const tokens: Token[] = tokenize('(1 + 2) + (3 + 4) + ((5 * 6) / (7 - 8));');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 40,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 40,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 39,
                    "left": {
                        "type": "BinaryExpression",
                        "start": 0,
                        "end": 17,
                        "left": {
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
                        },
                        "operator": "+",
                        "right": {
                            "type": "BinaryExpression",
                            "start": 11,
                            "end": 16,
                            "left": {
                                "type": "Literal",
                                "start": 11,
                                "end": 12,
                                "value": 3,
                                "raw": "3"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 15,
                                "end": 16,
                                "value": 4,
                                "raw": "4"
                            }
                        }
                    },
                    "operator": "+",
                    "right": {
                        "type": "BinaryExpression",
                        "start": 21,
                        "end": 38,
                        "left": {
                            "type": "BinaryExpression",
                            "start": 22,
                            "end": 27,
                            "left": {
                                "type": "Literal",
                                "start": 22,
                                "end": 23,
                                "value": 5,
                                "raw": "5"
                            },
                            "operator": "*",
                            "right": {
                                "type": "Literal",
                                "start": 26,
                                "end": 27,
                                "value": 6,
                                "raw": "6"
                            }
                        },
                        "operator": "/",
                        "right": {
                            "type": "BinaryExpression",
                            "start": 32,
                            "end": 37,
                            "left": {
                                "type": "Literal",
                                "start": 32,
                                "end": 33,
                                "value": 7,
                                "raw": "7"
                            },
                            "operator": "-",
                            "right": {
                                "type": "Literal",
                                "start": 36,
                                "end": 37,
                                "value": 8,
                                "raw": "8"
                            }
                        }
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse stacked binary expression with multiple parenthesis inside of each other', () => {
    const tokens: Token[] = tokenize('(((((1 / 2)))));');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 16,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 5,
                    "end": 10,
                    "left": {
                        "type": "Literal",
                        "start": 5,
                        "end": 6,
                        "value": 1,
                        "raw": "1"
                    },
                    "operator": "/",
                    "right": {
                        "type": "Literal",
                        "start": 9,
                        "end": 10,
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

test('Should parse multi line expression', () => {
    const tokens: Token[] = tokenize(`1 + 2; (2) + 5 + 12 - (1 + (2 + 5));`);

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 36,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 6,
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
            },
            {
                "type": "ExpressionStatement",
                "start": 7,
                "end": 36,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 7,
                    "end": 35,
                    "left": {
                        "type": "BinaryExpression",
                        "start": 7,
                        "end": 19,
                        "left": {
                            "type": "BinaryExpression",
                            "start": 7,
                            "end": 14,
                            "left": {
                                "type": "Literal",
                                "start": 8,
                                "end": 9,
                                "value": 2,
                                "raw": "2"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 13,
                                "end": 14,
                                "value": 5,
                                "raw": "5"
                            }
                        },
                        "operator": "+",
                        "right": {
                            "type": "Literal",
                            "start": 17,
                            "end": 19,
                            "value": 12,
                            "raw": "12"
                        }
                    },
                    "operator": "-",
                    "right": {
                        "type": "BinaryExpression",
                        "start": 23,
                        "end": 34,
                        "left": {
                            "type": "Literal",
                            "start": 23,
                            "end": 24,
                            "value": 1,
                            "raw": "1"
                        },
                        "operator": "+",
                        "right": {
                            "type": "BinaryExpression",
                            "start": 28,
                            "end": 33,
                            "left": {
                                "type": "Literal",
                                "start": 28,
                                "end": 29,
                                "value": 2,
                                "raw": "2"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 32,
                                "end": 33,
                                "value": 5,
                                "raw": "5"
                            }
                        }
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse simple variable declaration', () => {
    const tokens: Token[] = tokenize('var a = 2;');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 10,
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 10,
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 9,
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 5,
                            "name": "a"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 8,
                            "end": 9,
                            "value": 2,
                            "raw": "2"
                        }
                    }
                ],
                "kind": "var"
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse simple constant variable declaration with binary operation', () => {
    const tokens: Token[] = tokenize('const myVar = 10 + 2;');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 21,
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 21,
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 6,
                        "end": 20,
                        "id": {
                            "type": "Identifier",
                            "start": 6,
                            "end": 11,
                            "name": "myVar"
                        },
                        "init": {
                            "type": "BinaryExpression",
                            "start": 14,
                            "end": 20,
                            "left": {
                                "type": "Literal",
                                "start": 14,
                                "end": 16,
                                "value": 10,
                                "raw": "10"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 19,
                                "end": 20,
                                "value": 2,
                                "raw": "2"
                            }
                        }
                    }
                ],
                "kind": "const"
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should prioritize * and / operators', () => {
    const tokens: Token[] = tokenize('1 + 2 * 3 + 4 / (1 / 2 - 1 / 2 * (12 - 8)) / 2 + 2 * 6;');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 55,
        "sourceType": "module",
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 55,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 54,
                    "left": {
                        "type": "BinaryExpression",
                        "start": 0,
                        "end": 46,
                        "left": {
                            "type": "BinaryExpression",
                            "start": 0,
                            "end": 9,
                            "left": {
                                "type": "Literal",
                                "start": 0,
                                "end": 1,
                                "value": 1,
                                "raw": "1"
                            },
                            "operator": "+",
                            "right": {
                                "type": "BinaryExpression",
                                "start": 4,
                                "end": 9,
                                "left": {
                                    "type": "Literal",
                                    "start": 4,
                                    "end": 5,
                                    "value": 2,
                                    "raw": "2"
                                },
                                "operator": "*",
                                "right": {
                                    "type": "Literal",
                                    "start": 8,
                                    "end": 9,
                                    "value": 3,
                                    "raw": "3"
                                }
                            }
                        },
                        "operator": "+",
                        "right": {
                            "type": "BinaryExpression",
                            "start": 12,
                            "end": 46,
                            "left": {
                                "type": "BinaryExpression",
                                "start": 12,
                                "end": 42,
                                "left": {
                                    "type": "Literal",
                                    "start": 12,
                                    "end": 13,
                                    "value": 4,
                                    "raw": "4"
                                },
                                "operator": "/",
                                "right": {
                                    "type": "BinaryExpression",
                                    "start": 17,
                                    "end": 41,
                                    "left": {
                                        "type": "BinaryExpression",
                                        "start": 17,
                                        "end": 22,
                                        "left": {
                                            "type": "Literal",
                                            "start": 17,
                                            "end": 18,
                                            "value": 1,
                                            "raw": "1",
                                        },
                                        "operator": "/",
                                        "right": {
                                            "type": "Literal",
                                            "start": 21,
                                            "end": 22,
                                            "value": 2,
                                            "raw": "2"
                                        }
                                    },
                                    "operator": "-",
                                    "right": {
                                        "type": "BinaryExpression",
                                        "start": 25,
                                        "end": 41,
                                        "left": {
                                            "type": "BinaryExpression",
                                            "start": 25,
                                            "end": 30,
                                            "left": {
                                                "type": "Literal",
                                                "start": 25,
                                                "end": 26,
                                                "value": 1,
                                                "raw": "1"
                                            },
                                            "operator": "/",
                                            "right": {
                                                "type": "Literal",
                                                "start": 29,
                                                "end": 30,
                                                "value": 2,
                                                "raw": "2"
                                            }
                                        },
                                        "operator": "*",
                                        "right": {
                                            "type": "BinaryExpression",
                                            "start": 34,
                                            "end": 40,
                                            "left": {
                                                "type": "Literal",
                                                "start": 34,
                                                "end": 36,
                                                "value": 12,
                                                "raw": "12",
                                            },
                                            "operator": "-",
                                            "right": {
                                                "type": "Literal",
                                                "start": 39,
                                                "end": 40,
                                                "value": 8,
                                                "raw": "8"
                                            },
                                        }
                                    }
                                }
                            },
                            "operator": "/",
                            "right": {
                                "type": "Literal",
                                "start": 45,
                                "end": 46,
                                "value": 2,
                                "raw": "2"
                            }
                        }
                    },
                    "operator": "+",
                    "right": {
                        "type": "BinaryExpression",
                        "start": 49,
                        "end": 54,
                        "left": {
                            "type": "Literal",
                            "start": 49,
                            "end": 50,
                            "value": 2,
                            "raw": "2"
                        },
                        "operator": "*",
                        "right": {
                            "type": "Literal",
                            "start": 53,
                            "end": 54,
                            "value": 6,
                            "raw": "6"
                        }
                    }
                }
            }
        ]
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse -1 as unary expresion', () => {
    const tokens: Token[] = tokenize('-1');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 2,
        "sourceType": "module",
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 2,
                "expression": {
                    "type": "UnaryExpression",
                    "start": 0,
                    "end": 2,
                    "operator": "-",
                    "argument": {
                        "type": "Literal",
                        "start": 1,
                        "end": 2,
                        "value": 1,
                        "raw": "1"
                    },
                }
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse unary expresion in binary expression', () => {
    const tokens: Token[] = tokenize('1 + -10');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 7,
        "sourceType": "module",
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 7,
                    "left": {
                        "type": "Literal",
                        "start": 0,
                        "end": 1,
                        "value": 1,
                        "raw": "1"
                    },
                    "operator": "+",
                    "right": {
                        "type": "UnaryExpression",
                        "start": 4,
                        "end": 7,
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "start": 5,
                            "end": 7,
                            "value": 10,
                            "raw": "10"
                        },
                    }
                }
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should call default parser for incorrect token', () => {
    const input = [{type: 'incorrectType', start: 0, end: 9, value: 'Incorrect'}];

    expect(() => parse(<Token[]> input)).toThrowError(TypeError);
});

test('Expression statement wrapper test', () => {
    const expressionStatement: ExpressionStatement = new ExpressionStatement(0, 1, new EmptyNode());

    expect(wrapInExpressionStatement(expressionStatement, false)).toBe(expressionStatement);
});

test('Literal parser with incorrect token should throw error', () => {
    const tokens = [{type: 'incorrectType', start: 0, end: 9, value: 'Incorrect'}];

    expect(() => literalParser(<Token[]> tokens)).toThrowError(TypeError);
});

test('Variable declaration with no assignment', () => {
    const tokens: Token[] = tokenize('var myVar;');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 10,
        "sourceType": "module",
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 10,
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 9,
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 9,
                            "name": "myVar"
                        },
                        "init": {
                            "end": NaN,
                            "start": NaN,
                            "type": "EmptyNode"
                        },
                    }
                ],
                "kind": "var"
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Parse tokens without enough parenthesis', () => {
    const tokens: Token[] = tokenize('(1 + 2;');

    expect(() => parse(tokens)).toThrowError(SyntaxError);
});

test('Get tokens inside of parenthesis that don\'t have parenthesis', () => {
   const tokens: Token[] = tokenize('1');

    expect(tokensInParenthesis(tokens).length).toBe(0);
});

test('', () => {
    const tokens: Token[] = tokenize('myVar + 2;');
    const ast = {
            "type": "Program",
            "start": 0,
            "end": 10,
            "sourceType": "module",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 10,
                    "expression": {
                        "type": "BinaryExpression",
                        "start": 0,
                        "end": 9,
                        "left": {
                            "type": "Identifier",
                            "start": 0,
                            "end": 5,
                            "name": "myVar"
                        },
                        "operator": "+",
                        "right": {
                            "type": "Literal",
                            "start": 8,
                            "end": 9,
                            "value": 2,
                            "raw": "2"
                        }
                    }
                }
            ]
        };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse value assignment', () => {
    const tokens: Token[] = tokenize('a = 12;');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 7,
        "sourceType": "module",
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 7,
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 6,
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "a"
                    },
                    "right": {
                        "type": "Literal",
                        "start": 4,
                        "end": 6,
                        "value": 12,
                        "raw": "12"
                    }
                }
            }
        ]
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse block statement', () => {
    const tokens: Token[] = tokenize('{ 2 + 2 }');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 9,
        "sourceType": "module",
        "body": [
            {
                "type": "BlockStatement",
                "start": 0,
                "end": 9,
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "start": 2,
                        "end": 7,
                        "expression": {
                            "type": "BinaryExpression",
                            "start": 2,
                            "end": 7,
                            "left": {
                                "type": "Literal",
                                "start": 2,
                                "end": 3,
                                "value": 2,
                                "raw": "2"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 6,
                                "end": 7,
                                "value": 2,
                                "raw": "2"
                            }
                        }
                    }
                ]
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse simple if', () => {
    const tokens: Token[] = tokenize('if (myVar) { 1 + 2; }');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 21,
        "sourceType": "module",
        "body": [
            {
                "type": "IfStatement",
                "start": 0,
                "end": 21,
                "test": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 9,
                    "name": "myVar"
                },
                "consequent": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 21,
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 19,
                            "expression": {
                                "type": "BinaryExpression",
                                "start": 13,
                                "end": 18,
                                "left": {
                                    "type": "Literal",
                                    "start": 13,
                                    "end": 14,
                                    "value": 1,
                                    "raw": "1"
                                },
                                "operator": "+",
                                "right": {
                                    "type": "Literal",
                                    "start": 17,
                                    "end": 18,
                                    "value": 2,
                                    "raw": "2"
                                }
                            }
                        }
                    ],
                },
                "alternate": {
                    "end": NaN,
                    "start": NaN,
                    "type": "EmptyNode"
                }
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse if else', () => {
    const tokens: Token[] = tokenize('if (myVar) { "hi" } else { 2 }');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 30,
        "sourceType": "module",
        "body": [
            {
                "type": "IfStatement",
                "start": 0,
                "end": 30,
                "test": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 9,
                    "name": "myVar"
                },
                "consequent": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 19,
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 17,
                            "expression": {
                                "type": "Literal",
                                "start": 13,
                                "end": 17,
                                "value": "hi",
                                "raw": "'hi'"
                            }
                        }
                    ],
                },
                "alternate": {
                    "type": "BlockStatement",
                    "start": 25,
                    "end": 30,
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "start": 27,
                            "end": 28,
                            "expression": {
                                "type": "Literal",
                                "start": 27,
                                "end": 28,
                                "value": 2,
                                "raw": "2"
                            }
                        }
                    ],
                }
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse if else if', () => {
    const tokens: Token[] = tokenize('if (myVar) { "hi" } else if (1) { 2 }');
    const ast = {
        "type": "Program",
        "start": 0,
        "end": 37,
        "sourceType": "module",
        "body": [
            {
                "type": "IfStatement",
                "start": 0,
                "end": 37,
                "test": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 9,
                    "name": "myVar"
                },
                "consequent": {
                    "type": "BlockStatement",
                    "start": 11,
                    "end": 19,
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "start": 13,
                            "end": 17,
                            "expression": {
                                "type": "Literal",
                                "start": 13,
                                "end": 17,
                                "value": "hi",
                                "raw": "'hi'"
                            }
                        }
                    ],
                },
                "alternate": {
                    "type": "IfStatement",
                    "start": 25,
                    "end": 37,
                    "test": {
                        "type": "Literal",
                        "start": 29,
                        "end": 30,
                        "value": 1,
                        "raw": "1"
                    },
                    "consequent": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 37,
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "start": 34,
                                "end": 35,
                                "expression": {
                                    "type": "Literal",
                                    "start": 34,
                                    "end": 35,
                                    "value": 2,
                                    "raw": "2"
                                }
                            }
                        ],
                    },
                    "alternate": {
                        "end": NaN,
                        "start": NaN,
                        "type": "EmptyNode"
                    }
                }
            }
        ],
    };

    expect(parse(tokens)).toEqual(ast);
});