import {Token, TokenType} from "../lib/tokenizer/types/token.model";
import {parse} from "../lib/parser/parser";
import {tokenize} from "../lib/tokenizer/tokenizer";

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
    const tokens: Token[] = tokenize('1 + 2 * 3 + 4;');

    const ast = {
        "type": "Program",
        "start": 0,
        "end": 14,
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "expression": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 13,
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
                        "type": "Literal",
                        "start": 12,
                        "end": 13,
                        "value": 4,
                        "raw": "4"
                    }
                }
            }
        ],
        "sourceType": "module"
    };

    expect(parse(tokens)).toEqual(ast);
});