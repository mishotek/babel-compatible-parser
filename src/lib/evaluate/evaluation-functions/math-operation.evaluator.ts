import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, BinaryExpression} from "../../parser/types/ast-nodes.model";
import {Operators} from "../../helpers/operators";
import {evaluate} from "../evaluate";
import {toNumber} from "../coercion/to-number";

export const mathOperationEvaluatorPredicate: PredicateFn = (node: AstNode) => {
    return node.type === AstNodeType.BinaryExpression && (
        node.operator === Operators.Add ||
        node.operator === Operators.Subtract ||
        node.operator === Operators.Multiply ||
        node.operator === Operators.Divide
    );
};

export const mathOperationEvaluator: EvaluatorFn = (node: AstNode) => {
    node = <BinaryExpression> node;

    const left: number = toNumber(evaluate(node.left));
    const right: number = toNumber(evaluate(node.right));

    if (node.operator === Operators.Add) {
        return left + right;
    } else if (node.operator === Operators.Subtract) {
        return left - right;
    } else if (node.operator === Operators.Multiply) {
        return left * right;
    } else if (node.operator === Operators.Divide) {
        return left / right;
    }
};