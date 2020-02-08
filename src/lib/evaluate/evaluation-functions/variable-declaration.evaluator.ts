import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, VariableDeclaration} from "../../parser/types/ast-nodes.model";
import {evaluate} from "../evaluate";
import {ScopeManager} from "../../execute/scope-manager/scope-manager";

export const variableDeclarationEvaluatorPredicate: PredicateFn = (node: AstNode) => {
    return node.type === AstNodeType.VariableDeclaration;
};

export const variableDeclarationEvaluator: EvaluatorFn = (node: AstNode, scopeManager: ScopeManager) => {
    node = <VariableDeclaration> node;

    node.declarations.forEach(declaration => {
        const value = evaluate(declaration.init, scopeManager);
        scopeManager.currentExecutionContext.setVariable(declaration.id.name, value);
    });
};
