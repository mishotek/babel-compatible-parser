import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, UnaryExpression} from "../../parser/types/ast-nodes.model";
import {Operators} from "../../helpers/operators";
import {toNumber} from "../coercion/to-number";
import {evaluate} from "../evaluate";

export const unaryExpressionEvaluatorPredicate: PredicateFn = (node: AstNode) => {
    return node.type === AstNodeType.UnaryExpression;
};

export const unaryExpressionEvaluator: EvaluatorFn = (node: AstNode) => {
    node = <UnaryExpression> node;

    if (node.operator === Operators.Subtract) {
        return toNumber(evaluate(node.argument)) * -1;
    } else if (node.operator === Operators.Add) {
        return toNumber(evaluate(node.argument));
    }
};