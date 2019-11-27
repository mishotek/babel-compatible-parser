import { Token, TokenizerConfig, TokenizerFn } from "../types/token.model";
import {tokenizerConfig} from "./tokenizer.config";
import {defaultTokenizer} from "./tokenizer-functions";

export function tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let _cursor = 0;

    while (_cursor < input.length) {
        const char = input[_cursor];
        const tokenizerFn: TokenizerFn = getTokenizerFn(char);
        const {token, cursor} = tokenizerFn(input, _cursor);
        _cursor = cursor;
        tokens.push(token);
    }

    return tokens
      .filter(token => token !== Token.NullToken);
}

const getTokenizerFn: (char: string) => TokenizerFn = char => {
    const tokenizer: TokenizerConfig | undefined = tokenizerConfig
        .find(config => config.predicateFn(char));

    return tokenizer ? tokenizer.tokenizerFn : defaultTokenizer;
};
