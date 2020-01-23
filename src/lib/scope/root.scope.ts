import {Scope, Variable} from "./scope.model";
import {VariableDeclarationTypes} from "../parser/types/variable-declaration";

export const RootScope: Scope = {
  parentScope: undefined,
  variables: {
      PI: new Variable(Math.PI, VariableDeclarationTypes.Const)
  }
};
