import {Token, TokenType} from "../lib/tokenizer/types/token.model";
import {AST} from "../lib/parser/types/ast.model";
import {NumericalLiteral, StringLiteral} from "../lib/parser/types/ast-node.model";
import {parse} from "../lib/parser/parser";

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