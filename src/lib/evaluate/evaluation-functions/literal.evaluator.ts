import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType} from "../../parser/types/ast-nodes.model";

export const literalEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.Literal;

export const literalEvaluatorFn: EvaluatorFn = (node: AstNode) => node;