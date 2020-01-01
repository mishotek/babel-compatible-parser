import {Token, TokenType} from "../lib/tokenizer/types/token.model";
import {AST} from "../lib/parser/types/ast.model";
import {Identifier, NumericalLiteral, StringLiteral, VariableDeclaration} from "../lib/parser/types/ast-node.model";
import {parse} from "../lib/parser/parser";
import {Operators} from "../lib/helpers/operators";

test('Should parse numerical literal', () => {
    const tokens: Token[] = [ new Token(TokenType.Number, '12') ];
    const ast: AST = [ new NumericalLiteral(12) ];

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse string literal', () => {
    const tokens: Token[] = [ new Token(TokenType.String, 'string with space') ];
    const ast: AST = [ new StringLiteral('string with space') ];

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse variable declaration', () => {
    const tokens: Token[] = [
        new Token(TokenType.Operator, Operators.VariableDeclaration),
        new Token(TokenType.Name, 'myVar'),
        new Token(TokenType.Operator, Operators.Assignment),
        new Token(TokenType.String, 'my var value'),
        new Token(TokenType.Operator, Operators.EndOfStatement)
    ];
    const ast: AST = [
        new VariableDeclaration(new Identifier('myVar'), new StringLiteral('my var value'), false)
    ];

    expect(parse(tokens)).toEqual(ast);
});

test('Should parse constant variable declaration', () => {
    const tokens: Token[] = [
        new Token(TokenType.Operator, Operators.ConstantDeclaration),
        new Token(TokenType.Name, 'myConst'),
        new Token(TokenType.Operator, Operators.Assignment),
        new Token(TokenType.Number, '12'),
        new Token(TokenType.Operator, Operators.EndOfStatement)
    ];
    const ast: AST = [
        new VariableDeclaration(new Identifier('myConst'), new NumericalLiteral(12), true)
    ];

    expect(parse(tokens)).toEqual(ast);
});