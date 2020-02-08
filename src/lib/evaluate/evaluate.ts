import {AstNode} from "../parser/types/ast-nodes.model";
import {EvaluatorConfig, EvaluatorFn} from "./types/evaluator.model";
import {evaluatorConfig} from "./evaluator.config";
import {defaultEvaluator} from "./evaluation-functions/default.evaluator";
import {ScopeManager} from "../execute/scope-manager/scope-manager";

export const evaluate = (node: AstNode, scopeManager: ScopeManager) => {
    return getEvaluatorFn(node)(node, scopeManager);
};

const getEvaluatorFn: (tokens: AstNode) => EvaluatorFn = (node: AstNode) => {
    const evaluator: EvaluatorConfig | undefined = evaluatorConfig
        .find(config => config.predicateFn(node));

    return evaluator ? evaluator.evaluatorFn : defaultEvaluator;
};