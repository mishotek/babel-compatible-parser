import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, ExpressionStatement} from "../../parser/types/ast-nodes.model";
import {evaluate} from "../evaluate";

export const expressionStatementEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.ExpressionStatement;

export const expressionStatementEvaluatorFn: EvaluatorFn = (node: AstNode) => evaluate((<ExpressionStatement> node).expression);