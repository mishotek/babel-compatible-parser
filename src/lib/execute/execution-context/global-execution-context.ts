import {ExecutionContext} from "./execution-context.model";
import {MATH_GLOBAL_VARIABLES} from "../global-variables/math.global-variables";
import {VariableDeclarationTypes} from "../../parser/types/variable-declaration";
import {GlobalVariable} from "../global-variables/global-variable.model";

export class GlobalExecutionContextFactory {

    constructor() { }

    public static getGlobalExecutionContext(): ExecutionContext {
        const globalExecutionContext: ExecutionContext = new ExecutionContext(null);
        this.setGlobalVariables(globalExecutionContext);

        return globalExecutionContext;
    }

    private static setGlobalVariables(executionContext: ExecutionContext): void {
        const setGlobalVariable = this.setGlobalVariable(executionContext);

        setGlobalVariable(MATH_GLOBAL_VARIABLES);
    }

    private static setGlobalVariable(executionContext: ExecutionContext) {
        return (variableCollection: Array<GlobalVariable>) => {
            variableCollection.forEach(({name, value}) => {
                executionContext.declareVariable(name, VariableDeclarationTypes.Const);
                executionContext.setVariable(name, value);
            })
        };
    }
}