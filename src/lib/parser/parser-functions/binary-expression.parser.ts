import {ParserFnWithLeftNode, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstNode, BinaryExpression} from "../types/ast-expression.model";
import {BinaryExpressions, Operators} from "../../helpers/operators";
import {AstMetaData} from "../types/ast.model";
import {stripExpressionStatement} from "./expression-statment.parser";
import {__parse, __singleTurnParser} from "../parser";

export const binaryExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 2 && tokens[0].type === TokenType.Operator && BinaryExpressions.includes(tokens[0].value);
};

export const binaryExpressionParser: ParserFnWithLeftNode = (tokens: Token[], leftNode: AstNode) => {
    const [operatorToken, ...other] = tokens;

    const operator: Operators = operatorToken.value;
    const {node, remainingTokens} = __singleTurnParser(other, true);
    const rightNode: AstNode = node;

    const lastWasParenthesis = other.length > 0 && other[other.length - remainingTokens.length - 1].value === ')';
    const left = leftNode.start;
    const right = lastWasParenthesis ? rightNode.end + 1 : rightNode.end;

    const binaryExpression: BinaryExpression = new BinaryExpression(left, right, leftNode, operator, rightNode);

    return new AstMetaData(binaryExpression, remainingTokens);
};