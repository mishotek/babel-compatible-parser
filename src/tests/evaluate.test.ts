import {AstNode, Literal} from "../lib/parser/types/ast-nodes.model";
import {evaluate} from "../lib/evaluate/evaluate";
import {parse} from "../lib/parser/parser";
import {tokenize} from "../lib/tokenizer/tokenizer";
import {RootScope} from "../lib/scope/root.scope";

test('Should evaluate literal', () => {
    const node = new Literal(0, 1, 1, '1');
    const result = 1;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate basic addition operation', () => {
    const node = parse(tokenize('1 + 2')).body[0];
    const result = 3;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate basic subtraction operation', () => {
    const node = parse(tokenize('2 - 4')).body[0];
    const result = -2;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate basic multiplication operation', () => {
    const node = parse(tokenize('2 * 4')).body[0];
    const result = 8;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate basic division operation', () => {
    const node = parse(tokenize('16 / 4')).body[0];
    const result = 4;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate nested mathematical operations', () => {
    const node = parse(tokenize('1 + 4 * 2 + (2 + 3 - 2) / 12 * 17')).body[0];
    const result = 13.25;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate addition between number and string', () => {
    const node = parse(tokenize('2 + "3"')).body[0];
    const result = NaN;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate multiplication between number and negative number', () => {
    const node = parse(tokenize('2 * -5')).body[0];
    const result = -10;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate division between number and unary operator', () => {
    const node = parse(tokenize('4 / +2')).body[0];
    const result = 2;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate division by zero correctly', () => {
    const node = parse(tokenize('100 / 0')).body[0];
    const result = NaN;

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate string concatenation correctly', () => {
    const node = parse(tokenize('"hello" + " " + "world"')).body[0];
    const result = "hello world";

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should evaluate string and number concatenation correctly', () => {
    const node = parse(tokenize('"string and number: " + " " + 69')).body[0];
    const result = "string and number:  69";

    expect(evaluate(node, RootScope)).toEqual(result);
});

test('Should throw error for unsupported string operator', () => {
    const node = parse(tokenize('"12" - 10')).body[0];

    expect(() => evaluate(node, RootScope)).toThrowError(SyntaxError);
});

test('Default evaluator Should throw error', () => {
    const node = {type: 'unknownRandomType', start: 0, end: 1};

    expect(() => evaluate(<AstNode> node, RootScope)).toThrowError(SyntaxError);
});
