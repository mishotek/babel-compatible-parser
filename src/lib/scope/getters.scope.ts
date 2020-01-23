import {Scope} from "./scope.model";

export const getFromScope = (scope: Scope | undefined) => (key: string): any => {
    if (!scope) {
        return undefined;
    }

    return scope.variables[key] ? scope.variables[key] : getFromScope(scope.parentScope)(key);
};

export const isInScope = (scope: Scope | undefined) => (key: string): boolean => {
    if (!scope) {
        return false;
    }

    return Object.keys(scope.variables).includes(key) ? true : isInScope(scope.parentScope)(key);
};
