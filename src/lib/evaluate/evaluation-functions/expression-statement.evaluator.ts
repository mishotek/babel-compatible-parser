import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, ExpressionStatement} from "../../parser/types/ast-nodes.model";
import {evaluate} from "../evaluate";
import {Scope} from "../../scope/scope.model";

export const expressionStatementEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.ExpressionStatement;

export const expressionStatementEvaluatorFn: EvaluatorFn = (node: AstNode, scope: Scope) => evaluate((<ExpressionStatement> node).expression, scope);