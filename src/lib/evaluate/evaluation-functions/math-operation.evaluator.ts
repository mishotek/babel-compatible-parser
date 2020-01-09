import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, BinaryExpression, Literal} from "../../parser/types/ast-nodes.model";
import {Operators} from "../../helpers/operators";
import {evaluate} from "../evaluate";

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

    const left: Literal = <Literal> evaluate(node.left);
    const right: Literal = <Literal> evaluate(node.right);

    let result = NaN;

    if (node.operator === Operators.Add) {
        result = <number> left.value + <number> right.value;
    } else if (node.operator === Operators.Subtract) {
        result = <number> left.value - <number> right.value;
    } else if (node.operator === Operators.Multiply) {
        result = <number> left.value * <number> right.value;
    } else if (node.operator === Operators.Divide) {
        result = <number> left.value / <number> right.value;
    }

    return new Literal(left.start, right.end, result, '' + result);
};