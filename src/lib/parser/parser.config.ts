import {ParserConfig} from "./types/parser.model";
import {literalParser, literalPredicate} from "./parser-functions/literal.parser";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: literalPredicate,
        parserFn: literalParser
    },
];
