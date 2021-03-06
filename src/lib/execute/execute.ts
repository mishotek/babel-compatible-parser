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
    return nodes.map(node => evaluate(node, scopeManager));
};

const isDeclaration = (node: AstNode) => node.type === AstNodeType.VariableDeclaration;

const declare = (executionContext: ExecutionContext) => (variableDeclaration: VariableDeclaration) => {
    variableDeclaration.declarations
        .forEach(declaration => executionContext.declareVariable(declaration.id.name, variableDeclaration.kind));
};

const _execute = (nodes: Array<AstNode>, scopeManager: ScopeManager) => {
    creation(nodes, scopeManager.currentExecutionContext);
    return execution(nodes, scopeManager);
};

export const execute = (ast: AST) => {
    const scopeManager: ScopeManager = new ScopeManager();

    _execute(ast.body, scopeManager);
};

export const executeRepl = (scopeManager: ScopeManager) => (ast: AST) => {
    const logs = _execute(ast.body, scopeManager);
    return logs[logs.length - 1];
};

export const executeInNewScope = (scopeManager: ScopeManager, nodes: Array<AstNode>) => {
    scopeManager.enter();
    const logs = _execute(nodes, scopeManager);
    scopeManager.leave();
    return logs[logs.length - 1];
};