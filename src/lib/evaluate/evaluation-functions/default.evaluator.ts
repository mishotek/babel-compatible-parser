import {EvaluatorFn} from "../types/evaluator.model";
import {AstNode} from "../../parser/types/ast-nodes.model";

export const defaultEvaluator: EvaluatorFn = (node: AstNode) => {
    throw new SyntaxError(`Can't evaluate ${node.type}, at ${node.start} - ${node.end}`);
};
