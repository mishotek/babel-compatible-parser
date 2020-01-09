import {Literal} from "../../parser/types/ast-nodes.model";

export const coerceLiteral = (coercionFn: (value: any) => any) => (literal: Literal) => new Literal(literal.start, literal.end, coercionFn(literal.value), literal.raw);