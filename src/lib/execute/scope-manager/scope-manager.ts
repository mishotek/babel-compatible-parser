import {Stack} from "../../helpers/data-structures/stack";
import {ExecutionContext} from "../execution-context/execution-context.model";
import {GlobalExecutionContextFactory} from "../execution-context/global-execution-context";

type ExecutionStack = Stack<ExecutionContext>;

export class ScopeManager {

    private readonly executionStack: ExecutionStack;

    constructor() {
        this.executionStack = new Stack<ExecutionContext>();
        this.createGlobalExecutionContext(this.executionStack);
    }

    public enter() {
        const executionContext: ExecutionContext = new ExecutionContext(this.currentExecutionContext);
        this.executionStack.push(executionContext);
    }

    public leave() {
        if (!this.isInGlobalScope) {
            this.executionStack.pop();
        } else {
            throw new Error(`Trying to pop global execution context!`);
        }
    }

    public get currentExecutionContext(): ExecutionContext {
        return this.executionStack.top();
    }

    public get isInGlobalScope(): boolean {
        return this.executionStack.length === 1;
    }

    private createGlobalExecutionContext(executionStack: ExecutionStack) {
        executionStack.push(GlobalExecutionContextFactory.getGlobalExecutionContext());
    };
}