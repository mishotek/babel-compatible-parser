import {Operators} from "../../../helpers/operators";
import {toNumber} from "../../coercion/to-number";

export const mathOperationEvaluator = (operator: Operators, left: number, right: any) => {
    left = toNumber(left);
    right = toNumber(right);

    if (operator === Operators.Add) {
        return left + right;
    } else if (operator === Operators.Subtract) {
        return left - right;
    } else if (operator === Operators.Multiply) {
        return left * right;
    } else if (operator === Operators.Divide) {
        return right === 0 ? NaN : left / right;
    }
};