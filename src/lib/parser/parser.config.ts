import {ParserConfig} from "./types/parser.model";
import {literalParser, literalPredicate} from "./parser-functions/literal.parser";
import {expressionStatementParser, expressionStatementPredicate} from "./parser-functions/expression-statment.parser";
import {parenthesisParser, parenthesisPredicate} from "./parser-functions/parenthesis.parser";
import {variableDeclarationParser, variableDeclarationPredicate} from "./parser-functions/variable-declaration.parser";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: variableDeclarationPredicate,
        parserFn: variableDeclarationParser
    },
    {
        predicateFn: expressionStatementPredicate,
        parserFn: expressionStatementParser
    },
    {
        predicateFn: parenthesisPredicate,
        parserFn: parenthesisParser
    },
    {
        predicateFn: literalPredicate,
        parserFn: literalParser
    },
];
