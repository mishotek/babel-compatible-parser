import {AstNode} from "../../parser/types/ast-nodes.model";

export type EvaluatorFn = (node: AstNode) => AstNode;
export type PredicateFn = (node: AstNode) => boolean;

export interface EvaluatorConfig {
    predicateFn: PredicateFn,
    evaluatorFn: EvaluatorFn
}