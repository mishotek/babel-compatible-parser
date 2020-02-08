import {EvaluatorFn, PredicateFn} from "../../types/evaluator.model";
import {AstNode, AstNodeType, BinaryExpression} from "../../../parser/types/ast-nodes.model";
import {evaluate} from "../../evaluate";
import {stringOperationEvaluator} from "./string-operaion.evaluator";
import {mathOperationEvaluator} from "./math-operation.evaluator";
import {ScopeManager} from "../../../execute/scope-manager/scope-manager";

export const binaryExpressionEvaluatorPredicate: PredicateFn = (node: AstNode) => {
    return node.type === AstNodeType.BinaryExpression;
};

export const binaryExpressionEvaluator: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <BinaryExpression> node;

    const left = evaluate(node.left, scopeManager);
    const right = evaluate(node.right, scopeManager);

    const isStringOperation = typeof left === "string";

    if (isStringOperation) {
        return stringOperationEvaluator(node.operator, left, right);
    } else {
        return mathOperationEvaluator(node.operator, left, right);
    }
};