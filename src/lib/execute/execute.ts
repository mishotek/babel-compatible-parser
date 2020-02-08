import {AST} from "../parser/types/ast.model";
import {ScopeManager} from "./scope-manager/scope-manager";
import {AstNode, AstNodeType, VariableDeclaration} from "../parser/types/ast-nodes.model";
import {ExecutionContext} from "./execution-context/execution-context.model";
import {evaluate} from "../evaluate/evaluate";

const creation = (nodes: Array<AstNode>, executionContext: ExecutionContext) => {
    const declareInCurrentScope = declare(executionContext);

    nodes
        .filter(isDeclaration)
        .forEach(<(variableDeclaration: AstNode) => void> declareInCurrentScope);
};

const execution = (nodes: Array<AstNode>, scopeManager: ScopeManager) => {
    nodes.forEach(node => evaluate(node, scopeManager));
};

const isDeclaration = (node: AstNode) => node.type === AstNodeType.VariableDeclaration;

const declare = (executionContext: ExecutionContext) => (variableDeclaration: VariableDeclaration) => {
    variableDeclaration.declarations
        .forEach(declaration => executionContext.declareVariable(declaration.id.name, variableDeclaration.kind));
};

const _execute = (nodes: Array<AstNode>, scopeManager: ScopeManager) => {
    creation(nodes, scopeManager.currentExecutionContext);
    execution(nodes, scopeManager);
};

export const execute = (ast: AST) => {
    const scopeManager: ScopeManager = new ScopeManager();

    _execute(ast.body, scopeManager);
};

