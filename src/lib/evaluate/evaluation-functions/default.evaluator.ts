import {EvaluatorFn} from "../types/evaluator.model";
import {AstNode} from "../../parser/types/ast-nodes.model";
import {Scope} from "../../scope/scope.model";

export const defaultEvaluator: EvaluatorFn = (node: AstNode, scope: Scope) => {
    throw new SyntaxError(`Can't evaluate ${node.type}, at ${node.start} - ${node.end}`);
};
