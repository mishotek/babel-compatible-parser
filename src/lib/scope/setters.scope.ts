import {Scope, Variable} from "./scope.model";

export const putInScope = (scope: Scope) => (id: string, variable: Variable): void => {
    scope.variables[id] = variable;
};
