import {ParserConfig} from "./types/parser.model";
import {NumericalLiteralParser, NumericalLiteralPredicate} from "./parser-functions/numerical-literal-parser";
import {StringLiteralParser, StringLiteralPredicate} from "./parser-functions/string-literal-parser";
import {VariableDeclarationParser, VariableDeclarationPredicate} from "./parser-functions/variable-declaration-parser";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: NumericalLiteralPredicate,
        parserFn: NumericalLiteralParser
    },
    {
        predicateFn: StringLiteralPredicate,
        parserFn: StringLiteralParser
    },
    {
        predicateFn: VariableDeclarationPredicate,
        parserFn: VariableDeclarationParser
    }
];
