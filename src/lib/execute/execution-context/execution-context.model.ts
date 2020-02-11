import {VariableDeclarationTypes} from "../../parser/types/variable-declaration";

export class Variable {

    private dirty = false;
    public _value = undefined;

    constructor(public name: string, public kind: VariableDeclarationTypes) { }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        const tryingToResetConst = this.dirty && this.kind === VariableDeclarationTypes.Const;

        if (tryingToResetConst) {
            throw new Error(`Can't change constant value of ${this.name}`)
        }

        this.dirty = true;
        this._value = value;
    }
}

export class ExecutionContext {

    private variables: {[key: string]: Variable} = {};
    private readonly parentExecutionContext: ExecutionContext | null = null;

    constructor(parentExecutionContext: ExecutionContext | null) {
        this.parentExecutionContext = parentExecutionContext;
    }

    public getVariable(key: string): Variable {
        if (this.notDeclared(key)) {
            throw new Error(`${key} is not declared`);
        }
        
        if (this.isInCurrentScope(key)) {
            return this.variables[key];
        }

        return (<ExecutionContext> this.parentExecutionContext).getVariable(key);
    }

    public declareVariable(key: string, kind: VariableDeclarationTypes): void {
        if (this.isInCurrentScope(key)) {
            throw new Error(`${key} is already declared`);
        }

        this.variables[key] = new Variable(key, kind);
    }

    public setVariable(key: string, value: any): void {
        if (this.notDeclared(key)) {
            throw new Error(`${key} is not declared`);
        }

        if (this.isInCurrentScope(key)) {
            this.variables[key].value = value;
        }

        this.parentExecutionContext?.setVariable(key, value);
    }

    private notDeclared(key: string): boolean {
        const inScope = Object.keys(this.variables).includes(key);
        const noExecutionContext = !this.parentExecutionContext;

        return !inScope && noExecutionContext;
    }

    private isInCurrentScope(key: string): boolean {
        return Object.keys(this.variables).includes(key);
    }
}