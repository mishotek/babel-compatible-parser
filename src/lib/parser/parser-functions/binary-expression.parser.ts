import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstNode, BinaryExpression, ExpressionStatement} from "../types/ast-expression.model";
import {BinaryExpressions, Operators} from "../../helpers/operators";
import {AstMetaData} from "../types/ast.model";
import {stripExpressionStatement} from "./expression-statment.parser";
import {__parse} from "../parser";

export const binaryExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 3 && tokens[1].type === TokenType.Operator && BinaryExpressions.includes(tokens[1].value);
};

export const binaryExpressionParser: ParserFn = (tokens: Token[]) => {
    const [leftTokens, operatorToken, rightTokens, ...remainingTokens] = tokens;
    const left: AstNode = stripExpressionStatement(__parse([leftTokens])[0]);
    const operator: Operators = operatorToken.value;
    const right: AstNode = stripExpressionStatement(__parse([rightTokens])[0]);

    const binaryExpression: BinaryExpression = new BinaryExpression(left.start, right.end, left, operator, right);

    return new AstMetaData(binaryExpression, remainingTokens);
};