import {AstNode, Identifier, Literal} from "../lib/parser/types/ast-nodes.model";
import {evaluate} from "../lib/evaluate/evaluate";
import {parse} from "../lib/parser/parser";
import {tokenize} from "../lib/tokenizer/tokenizer";
import {ScopeManager} from "../lib/execute/scope-manager/scope-manager";
import {executeRepl} from "../lib/execute/execute";
import {AST} from "../lib/parser/types/ast.model";

test('Should evaluate literal', () => {
    const node = new Literal(0, 1, 1, '1');
    const result = 1;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate basic addition operation', () => {
    const node = parse(tokenize('1 + 2')).body[0];
    const result = 3;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate basic subtraction operation', () => {
    const node = parse(tokenize('2 - 4')).body[0];
    const result = -2;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate basic multiplication operation', () => {
    const node = parse(tokenize('2 * 4')).body[0];
    const result = 8;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate basic division operation', () => {
    const node = parse(tokenize('16 / 4')).body[0];
    const result = 4;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate nested mathematical operations', () => {
    const node = parse(tokenize('1 + 4 * 2 + (2 + 3 - 2) / 12 * 17')).body[0];
    const result = 13.25;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate addition between number and string', () => {
    const node = parse(tokenize('2 + "3"')).body[0];
    const result = NaN;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate multiplication between number and negative number', () => {
    const node = parse(tokenize('2 * -5')).body[0];
    const result = -10;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate division between number and unary operator', () => {
    const node = parse(tokenize('4 / +2')).body[0];
    const result = 2;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate division by zero correctly', () => {
    const node = parse(tokenize('100 / 0')).body[0];
    const result = NaN;

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate string concatenation correctly', () => {
    const node = parse(tokenize('"hello" + " " + "world"')).body[0];
    const result = "hello world";

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should evaluate string and number concatenation correctly', () => {
    const node = parse(tokenize('"string and number: " + " " + 69')).body[0];
    const result = "string and number:  69";

    expect(evaluate(node, new ScopeManager())).toEqual(result);
});

test('Should throw error for unsupported string operator', () => {
    const node = parse(tokenize('"12" - 10')).body[0];

    expect(() => evaluate(node, new ScopeManager())).toThrowError(SyntaxError);
});

test('Default evaluator Should throw error', () => {
    const node = {type: 'unknownRandomType', start: 0, end: 1};

    expect(() => evaluate(<AstNode> node, new ScopeManager())).toThrowError(SyntaxError);
});

test('Should throw undeclared variable error', () => {
    const node = new Identifier(0, 1, 'unknownVariable');

    expect(() => evaluate(<AstNode> node, new ScopeManager())).toThrowError(Error);
});

test('Should return pi from scope', () => {
    const node = parse(tokenize('PI')).body[0];

    expect(evaluate(<AstNode> node, new ScopeManager())).toBe(Math.PI);
});

test('Should reassign value to var', () => {
    const ast: AST = parse(tokenize('var a = 11; a = 12; a;'));
    const scopeManager = new ScopeManager();

    expect(executeRepl(scopeManager)(ast)).toBe(12);
});

test('Should not reassign value to const', () => {
    const node = parse(tokenize('const a = 11; a = 12;')).body[0];
    const scopeManager = new ScopeManager();

    expect(() => evaluate(<AstNode> node, scopeManager)).toThrowError(Error);
});

test('Should not assign value to const', () => {
    const node = parse(tokenize('const a; a = 12;')).body[0];
    const scopeManager = new ScopeManager();

    expect(() => evaluate(<AstNode> node, scopeManager)).toThrowError(Error);
});

test('Should reassign computed value to var', () => {
    const ast: AST = parse(tokenize('var a; a = 12 * 2 + 1; a;'));
    const scopeManager = new ScopeManager();
    expect(executeRepl(scopeManager)(ast)).toBe(25);
});

test('Should not use invalid nodes as identifiers', () => {
    const node = parse(tokenize('12 = 13;')).body[0];
    const scopeManager = new ScopeManager();

    expect(() => evaluate(<AstNode> node, scopeManager)).toThrowError(Error);
});

test('Variables in block statement should not be accessible from outside', () => {
    const ast: AST = parse(tokenize('if (1) { const a = 12 } a + 1;'));
    const scopeManager = new ScopeManager();

    expect(() => executeRepl(scopeManager)(ast)).toThrowError(Error);
});

test('Variables in block statement should be accessible from inside', () => {
    const ast: AST = parse(tokenize('if (1) { const a = 12; a + 1; }'));
    const scopeManager = new ScopeManager();

    expect(executeRepl(scopeManager)(ast)).toBe(13);
});

test('Should get value from if inside of else', () => {
    const ast: AST = parse(tokenize('if (0) { 1 } else if (1) { 2 }'));
    const scopeManager = new ScopeManager();

    expect(executeRepl(scopeManager)(ast)).toBe(2);
});