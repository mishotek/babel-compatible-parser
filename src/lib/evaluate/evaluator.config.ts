import {EvaluatorConfig} from "./types/evaluator.model";
import {literalEvaluatorFn, literalEvaluatorPredicate} from "./evaluation-functions/literal.evaluator";
import {mathOperationEvaluator, mathOperationEvaluatorPredicate} from "./evaluation-functions/math-operation.evaluator";
import {expressionStatementPredicate} from "../parser/parser-functions/expression-statment.parser";
import {
    expressionStatementEvaluatorFn,
    expressionStatementEvaluatorPredicate
} from "./evaluation-functions/expression-statement.evaluator";

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
        predicateFn: mathOperationEvaluatorPredicate,
        evaluatorFn: mathOperationEvaluator
    }
];