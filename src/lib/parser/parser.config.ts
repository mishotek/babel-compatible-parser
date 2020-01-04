import {ParserConfig} from "./types/parser.model";
import {literalParser, literalPredicate} from "./parser-functions/literal.parser";
import {expressionStatementParser, expressionStatementPredicate} from "./parser-functions/expression-statment.parser";
import {binaryExpressionParser, binaryExpressionPredicate} from "./parser-functions/binary-expression.parser";

export const parserConfig: ParserConfig[] = [
    {
        predicateFn: expressionStatementPredicate,
        parserFn: expressionStatementParser
    },
    {
        predicateFn: binaryExpressionPredicate,
        parserFn: binaryExpressionParser
    },
    {
        predicateFn: literalPredicate,
        parserFn: literalParser
    },
];
