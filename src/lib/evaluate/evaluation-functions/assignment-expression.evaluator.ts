import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AssignmentExpression, AstNode, AstNodeType, Identifier} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";
import {evaluate} from "../evaluate";

export const assignmentExpressionEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.AssignmentExpression;

export const assignmentExpressionEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <AssignmentExpression> node;

    if (node.left.type !== AstNodeType.Identifier) {
        throw new Error(`${node.left.type} can't be used as identifier at ${node.left.start}-${node.left.end}`);
    }

    const value = evaluate(node.right, scopeManager);
    const name = (<Identifier> node.left).name;

    scopeManager.currentExecutionContext.setVariable(name, value);
};