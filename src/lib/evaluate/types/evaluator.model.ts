import {AstNode} from "../../parser/types/ast-nodes.model";
import {Scope} from "../../scope/scope.model";

export type EvaluatorFn = (node: AstNode, scope: Scope) => any;
export type PredicateFn = (node: AstNode) => boolean;

export interface EvaluatorConfig {
    predicateFn: PredicateFn,
    evaluatorFn: EvaluatorFn
}