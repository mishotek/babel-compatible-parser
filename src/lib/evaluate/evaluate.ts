import {AstNode} from "../parser/types/ast-nodes.model";
import {EvaluatorConfig, EvaluatorFn} from "./types/evaluator.model";
import {evaluatorConfig} from "./evaluator.config";
import {defaultEvaluator} from "./evaluation-functions/default.evaluator";

export const evaluate = (node: AstNode) => {
    return getEvaluatorFn(node)(node);
};

const getEvaluatorFn: (tokens: AstNode) => EvaluatorFn = (node: AstNode) => {
    const evaluator: EvaluatorConfig | undefined = evaluatorConfig
        .find(config => config.predicateFn(node));

    return evaluator ? evaluator.evaluatorFn : defaultEvaluator;
};