import {Stack} from "../lib/helpers/data-structures/stack";

test('Should not pop empty stack', () => {
    expect(() => new Stack().pop()).toThrowError(Error);
});
