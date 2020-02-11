import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, IfStatement} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";
import {isTruthy} from "../coercion/is-truthy";
import {evaluate} from "../evaluate";
import {executeInNewScope} from "../../execute/execute";

export const ifStatementPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.IfStatement;

export const ifStatementEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <IfStatement> node;

    const passesTest: boolean = isTruthy(evaluate(node.test, scopeManager));
    return executeInNewScope(scopeManager, [passesTest ? node.consequent : node.alternate]);
};