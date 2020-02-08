import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, ExpressionStatement} from "../../parser/types/ast-nodes.model";
import {evaluate} from "../evaluate";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export const expressionStatementEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.ExpressionStatement;

export const expressionStatementEvaluatorFn: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => evaluate((<ExpressionStatement> node).expression, scopeManager);