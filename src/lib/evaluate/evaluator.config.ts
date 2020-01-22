import {EvaluatorConfig} from "./types/evaluator.model";
import {literalEvaluatorFn, literalEvaluatorPredicate} from "./evaluation-functions/literal.evaluator";
import {
    expressionStatementEvaluatorFn,
    expressionStatementEvaluatorPredicate
} from "./evaluation-functions/expression-statement.evaluator";
import {
    unaryExpressionEvaluator,
    unaryExpressionEvaluatorPredicate
} from "./evaluation-functions/unary-expression.evaluator";
import {
    binaryExpressionEvaluator,
    binaryExpressionEvaluatorPredicate
} from "./evaluation-functions/binary-expression/binary-expression.evaluator";

export const evaluatorConfig : EvaluatorConfig[] = [
    {
        predicateFn: literalEvaluatorPredicate,
        evaluatorFn: literalEvaluatorFn
    },
    {
        predicateFn: expressionStatementEvaluatorPredicate,
        evaluatorFn: expressionStatementEvaluatorFn
    },
    {
        predicateFn: binaryExpressionEvaluatorPredicate,
        evaluatorFn: binaryExpressionEvaluator
    },
    {
        predicateFn: unaryExpressionEvaluatorPredicate,
        evaluatorFn: unaryExpressionEvaluator
    }
];