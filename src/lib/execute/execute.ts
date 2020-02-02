import {AST} from "../parser/types/ast.model";
import {Stack} from "../helpers/monads/stack";
import {ExecutionContext} from "./execution-context/execution-context.model";
import {GlobalExecutionContextFactory} from "./execution-context/global-execution-context";

type ExecutionStack = Stack<ExecutionContext>;

export const execute = (ast: AST) => {
    const executionStack: ExecutionStack = new Stack<ExecutionContext>();
    createGlobalExecutionContext(executionStack);

    while (!executionStack.isEmpty) {
        const executionContext: ExecutionContext = executionStack.pop();

        // creation(executionContext)
    }
};

const createGlobalExecutionContext = (executionStack: ExecutionStack) => {
    executionStack.push(GlobalExecutionContextFactory.getGlobalExecutionContext());
};