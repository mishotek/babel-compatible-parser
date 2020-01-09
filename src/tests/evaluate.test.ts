import {Literal} from "../lib/parser/types/ast-nodes.model";
import {evaluate} from "../lib/evaluate/evaluate";
import {parse} from "../lib/parser/parser";
import {tokenize} from "../lib/tokenizer/tokenizer";

test('Should evaluate literal', () => {
    const node = new Literal(0, 1, 1, '1');
    const result = new Literal(0, 1, 1, '1');

    expect(evaluate(node)).toEqual(result);
});

test('Should evaluate basic addition operation', () => {
    const node = parse(tokenize('1 + 2')).body[0];
    const result = new Literal(0, 5, 3, '3');

    expect(evaluate(node)).toEqual(result);
});

test('Should evaluate basic subtraction operation', () => {
    const node = parse(tokenize('2 - 4')).body[0];
    const result = new Literal(0, 5, -2, '-2');

    expect(evaluate(node)).toEqual(result);
});

test('Should evaluate basic multiplication operation', () => {
    const node = parse(tokenize('2 * 4')).body[0];
    const result = new Literal(0, 5, 8, '8');

    expect(evaluate(node)).toEqual(result);
});

test('Should evaluate basic division operation', () => {
    const node = parse(tokenize('16 / 4')).body[0];
    const result = new Literal(0, 6, 4, '4');

    expect(evaluate(node)).toEqual(result);
});

test('Should evaluate nested mathematical operations', () => {
    const node = parse(tokenize('1 + 4 * 2 + (2 + 3 - 2) / 12 * 17')).body[0];
    const result = new Literal(0, 33, 13.25, '13.25');

    expect(evaluate(node)).toEqual(result);
});