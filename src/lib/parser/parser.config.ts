import {ParserConfig} from "./types/parser.model";
import {NumericalLiteralParser, NumericalLiteralPredicate} from "./parsing-functions";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: NumericalLiteralPredicate,
        parserFn: NumericalLiteralParser
    }
];
