import {AstNode} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export type EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => any;
export type PredicateFn = (node: AstNode) => boolean;

export interface EvaluatorConfig {
    predicateFn: PredicateFn,
    evaluatorFn: EvaluatorFn
}