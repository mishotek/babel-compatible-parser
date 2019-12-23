import {ParserConfig} from "./types/parser.model";
import {
    NumericalLiteralParser,
    NumericalLiteralPredicate,
    StringLiteralParser,
    StringLiteralPredicate
} from "./parsing-functions";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: NumericalLiteralPredicate,
        parserFn: NumericalLiteralParser
    },
    {
        predicateFn: StringLiteralPredicate,
        parserFn: StringLiteralParser
    },
];
