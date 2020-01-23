import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType} from "../../parser/types/ast-nodes.model";
import {Scope} from "../../scope/scope.model";

export const emptyNodeEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.EmptyNode;

export const emptyNodeEvaluatorFn: EvaluatorFn = (node: AstNode, scope: Scope) => undefined;