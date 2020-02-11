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
import {
    variableDeclarationEvaluator,
    variableDeclarationEvaluatorPredicate
} from "./evaluation-functions/variable-declaration.evaluator";
import {
    emptyNodeEvaluatorFn,
    emptyNodeEvaluatorPredicate,
} from "./evaluation-functions/empty-node.evaluator";
import {identifierEvaluatorFn, identifierEvaluatorPredicate} from "./evaluation-functions/identifier.evaluator";
import {
    assignmentExpressionEvaluatorFn,
    assignmentExpressionEvaluatorPredicate
} from "./evaluation-functions/assignment-expression.evaluator";

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
    },
    {
        predicateFn: variableDeclarationEvaluatorPredicate,
        evaluatorFn: variableDeclarationEvaluator
    },
    {
        predicateFn: assignmentExpressionEvaluatorPredicate,
        evaluatorFn: assignmentExpressionEvaluatorFn
    },
    {
        predicateFn: identifierEvaluatorPredicate,
        evaluatorFn: identifierEvaluatorFn
    },
    {
        predicateFn: emptyNodeEvaluatorPredicate,
        evaluatorFn: emptyNodeEvaluatorFn
    },
];