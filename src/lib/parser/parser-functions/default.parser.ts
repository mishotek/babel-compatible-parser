import {ParserFn} from "../types/parser.model";
import {Token} from "../../tokenizer/types/token.model";

export const defaultParser: ParserFn = (tokens: Token[]) => {
    throw new TypeError(`Unsupported token: ${tokens[0].value}`);
};
