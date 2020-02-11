import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, BlockStatement} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";
import {executeInNewScope} from "../../execute/execute";

export const blockStatementPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.BlockStatement;

export const blockStatementEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <BlockStatement> node;
    return executeInNewScope(scopeManager, node.body);
};
