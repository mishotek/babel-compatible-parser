import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export const emptyNodeEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.EmptyNode;

export const emptyNodeEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => undefined;