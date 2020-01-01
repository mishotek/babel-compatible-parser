// Should parse hello(1)(2)

import {AST, AstMetaData} from "../types/ast.model";
import {AstNodeType, NumericalLiteral} from "../types/ast-node.model";
import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";

// const ast: AST = [
//     {
//         type: AstNodeType.CallExpression,
//         name: 'hello',
//         args: [
//             {type: AstNodeType.NumericalLiteral, value: 1}
//         ]
//     }
// ];

// export const NumericalLiteralPredicate: PredicateFn = (tokens: Token[]) => {
//     return tokens.length > 0 && tokens[0].type === TokenType.Number
// };
//
// export const NumericalLiteralParser: ParserFn = (tokens: Token[]) => {
//     const [numberToken, ...otherTokens] = tokens;
//     return new AstMetaData(new NumericalLiteral(Number(numberToken.value)), otherTokens);
// };