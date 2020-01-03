// import {ParserFn, PredicateFn} from "../types/parser.model";
// import {Token, TokenType} from "../../tokenizer/types/token.model";
// import {fromToken, tillTheEndOfStatement, tokensTill} from "../../helpers/token-operations";
// import {Operators} from "../../helpers/operators";
// import {Box} from "../../helpers/box";
//
// const isFunctionDeclarationOperation = (token: Token) => token.type === TokenType.Operator && token.value === Operators.ArrowFunction;
//
// export const functionDeclarationPredicate: PredicateFn = (tokens: Token[]) => {
//     return tokens.length > 0 && tillTheEndOfStatement(tokens).some(isFunctionDeclarationOperation);
// };
//
// export const functionDeclarationParser: ParserFn = (tokens: Token[]) => {
//     const params = new Box(tokens)
//         .map(tokensTill(Operators.ArrowFunction))
//         .fold(tokensToParams);
//
//     const body = fromToken(Operators.ArrowFunction)(tokens);
// };