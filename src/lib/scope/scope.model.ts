import {VariableDeclarationTypes} from "../parser/types/variable-declaration";

export class Variable {

    constructor(
        public value: any,
        public kind: VariableDeclarationTypes,
    ) { }

}

export interface Scope {
    variables: {[key: string]: Variable}
    parentScope: Scope | undefined
}
