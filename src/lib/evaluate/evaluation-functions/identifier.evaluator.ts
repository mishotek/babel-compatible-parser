import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, Identifier} from "../../parser/types/ast-nodes.model";
import {Scope} from "../../scope/scope.model";
import {getFromScope, isInScope} from "../../scope/getters.scope";

export const identifierEvaluatorPredicate: PredicateFn = (node: AstNode) => node.type === AstNodeType.Identifier;

export const identifierEvaluatorFn: EvaluatorFn = (node: AstNode, scope: Scope) => {
    node = <Identifier> node;

    const inScope: boolean = isInScope(scope)(node.name);

    if (!inScope) {
        throw new Error(`Variable ${node.name} at [${node.start}:${node.end}] is not declared`);
    }

    return getFromScope(scope)(node.name).value;
};