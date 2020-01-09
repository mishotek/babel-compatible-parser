import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, Literal} from "../../parser/types/ast-nodes.model";

export const literalEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.Literal;

export const literalEvaluatorFn: EvaluatorFn = (node: AstNode) => (<Literal> node).value;