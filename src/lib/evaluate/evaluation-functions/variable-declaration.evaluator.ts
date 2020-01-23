import {EvaluatorFn, PredicateFn} from "../types/evaluator.model";
import {AstNode, AstNodeType, VariableDeclaration} from "../../parser/types/ast-nodes.model";
import {Scope, Variable} from "../../scope/scope.model";
import {isInScope} from "../../scope/getters.scope";
import {evaluate} from "../evaluate";
import {putInScope} from "../../scope/setters.scope";

export const variableDeclarationEvaluatorPredicate: PredicateFn = (node: AstNode) => {
    return node.type === AstNodeType.VariableDeclaration;
};

export const variableDeclarationEvaluator: EvaluatorFn = (node: AstNode, scope: Scope) => {
    node = <VariableDeclaration> node;

    node.declarations.forEach(declaration => {
        const alreadyDeclared = isInScope(scope)(declaration.id.name);

        if (alreadyDeclared) {
            throw new SyntaxError(`Variable ${declaration.id.name} is already declared`);
        }

        const variable = new Variable(evaluate(declaration.init, scope), (<VariableDeclaration> node).kind);
        putInScope(scope)(declaration.id.name, variable);
    });
};
