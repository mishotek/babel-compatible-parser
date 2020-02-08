import {EvaluatorFn} from "../types/evaluator.model";
import {AstNode} from "../../parser/types/ast-nodes.model";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export const defaultEvaluator: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    throw new SyntaxError(`Can't evaluate ${node.type}, at ${node.start} - ${node.end}`);
};
