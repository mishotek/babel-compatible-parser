import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, Identifier} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export const identifierEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.Identifier;

export const identifierEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <Identifier> node;
    return scopeManager.currentExecutionContext.getVariable(node.name).value;
};