import {Operators} from "../../../helpers/operators";
import {toString} from "../../coercion/to-string";

export const stringOperationEvaluator = (operator: Operators, left: string, right: any) => {
    if (operator === Operators.Add) {
        return left + toString(right);
    }

    throw new SyntaxError(`Operation ${operator} is not defined for ${left} and ${right}`);
};
