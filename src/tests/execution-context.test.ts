import {ExecutionContext, Variable} from "../lib/execute/execution-context/execution-context.model";
import {VariableDeclarationTypes} from "../lib/parser/types/variable-declaration";
import {ScopeManager} from "../lib/execute/scope-manager/scope-manager";

test('New variable should have value of undefined', () => {
    const variable = new Variable('myVar', VariableDeclarationTypes.Var);

    expect(variable.value).toBe(undefined);
});

test('Should be able to assign value to const for the first time', () => {
    const variable = new Variable('myVar', VariableDeclarationTypes.Const);
    variable.value = 12;
    expect(variable.value).toBe(12);
});

test('Should not be able to reassign value to const', () => {
    const variable = new Variable('myVar', VariableDeclarationTypes.Const);
    variable.value = 12;
    expect(() => variable.value = 13).toThrowError(Error);
});

test('Should be able to reassign value to var', () => {
    const variable = new Variable('myVar', VariableDeclarationTypes.Var);
    variable.value = 12;
    variable.value = "my string";
    expect(variable.value).toEqual("my string");
});

test('Declared variable should have value of undefined in execution context', () => {
    const ec = new ExecutionContext(null);
    ec.declareVariable('myVar', VariableDeclarationTypes.Var);

    expect(ec.getVariable('myVar').value).toBe(undefined);
});

test('Should be able to assign and get value', () => {
    const ec = new ExecutionContext(null);
    ec.declareVariable('myVar', VariableDeclarationTypes.Var);
    ec.setVariable('myVar', 'str');
    expect(ec.getVariable('myVar').value).toEqual('str');
});

test('Should throw error when trying to access undeclared variable', () => {
    const ec = new ExecutionContext(null);
    expect(() => ec.getVariable('myVar')).toThrowError(Error);
});

test('Should throw error when trying to set value to undeclared variable', () => {
    const ec = new ExecutionContext(null);
    expect(() => ec.setVariable('myVar', 17)).toThrowError(Error);
});

test('Should throw error when trying redeclare variable', () => {
    const ec = new ExecutionContext(null);
    ec.declareVariable('myVar', VariableDeclarationTypes.Var);
    expect(() => ec.declareVariable('myVar', VariableDeclarationTypes.Const)).toThrowError(Error);
});

test('Should get value from parent execution context', () => {
    const ec = new ExecutionContext(null);
    const ec2 = new ExecutionContext(ec);

    ec.declareVariable('myVar', VariableDeclarationTypes.Var);
    ec.setVariable('myVar', 'str');

    expect(ec2.getVariable('myVar').value).toEqual('str');
});

test('Should get value from current execution context instead of parent', () => {
    const ec = new ExecutionContext(null);
    const ec2 = new ExecutionContext(ec);

    ec.declareVariable('myVar', VariableDeclarationTypes.Var);
    ec.setVariable('myVar', 'str');

    ec2.declareVariable('myVar', VariableDeclarationTypes.Var);
    ec2.setVariable('myVar', 21);

    expect(ec2.getVariable('myVar').value).toEqual(21);
});

test('Should not be able to leave the global scope', () => {
   expect(() => new ScopeManager().leave()).toThrowError(Error);
});

test('Should be in global scope after entering and leaving scope', () => {
    const scopeManager = new ScopeManager();
    scopeManager.enter();
    scopeManager.leave();

    expect(scopeManager.isInGlobalScope).toBe(true);
});

test('Should be able to get variables from current scope', () => {
    const scopeManager = new ScopeManager();
    scopeManager.enter();

    expect(scopeManager.currentExecutionContext.getVariable('PI').value).toEqual(Math.PI);
});
