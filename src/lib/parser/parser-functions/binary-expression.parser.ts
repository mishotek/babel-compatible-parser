import {ParserFnWithLeftNode, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstNode, BinaryExpression} from "../types/ast-nodes.model";
import {BinaryExpressions, Operators} from "../../helpers/operators";
import {AstMetaData} from "../types/ast.model";
import {stripExpressionStatement} from "./expression-statment.parser";
import {__parse, __singleTurnParser} from "../parser";
import {stripParenthesis} from "./parenthesis.parser";

export const binaryExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 2 && tokens[0].type === TokenType.Operator && BinaryExpressions.includes(tokens[0].value);
};

export const binaryExpressionParser: ParserFnWithLeftNode = (tokens: Token[], leftNode: AstNode) => {
    const [operatorToken, ...other] = tokens;

    const operator: Operators = operatorToken.value;
    const {node, remainingTokens} = __singleTurnParser(other, true);
    const rightNode: AstNode = node;
    const binaryExpression: BinaryExpression = new BinaryExpression(leftNode.start, rightNode.end, stripParenthesis(leftNode), operator, stripParenthesis(rightNode));

    return new AstMetaData(binaryExpression, remainingTokens);
};