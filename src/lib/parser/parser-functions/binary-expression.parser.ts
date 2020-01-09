import {ParserFnWithLeftNode, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstNode, AstNodeType, BinaryExpression} from "../types/ast-nodes.model";
import {BinaryExpressions, Operators} from "../../helpers/operators";
import {AstMetaData} from "../types/ast.model";
import {__singleTurnParser} from "../parser";
import {stripStructuralNodes} from "../helpers";

export const binaryExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 2 && tokens[0].type === TokenType.Operator && BinaryExpressions.includes(tokens[0].value);
};

const nodeIsBinaryExpression = (node: AstNode) => node.type === AstNodeType.BinaryExpression;

const newOperatorHasHigherPriority = (operator1: Operators, operator2: Operators) => {
    const leftOperatorIsWeak = operator1 === Operators.Add || operator1 === Operators.Subtract;
    const rightOperatorIsStrong = operator2 === Operators.Multiply || operator2 === Operators.Divide;

    return leftOperatorIsWeak && rightOperatorIsStrong;
};

const withSwappedLeaves = (leftNode: BinaryExpression, operator: Operators, rightNode: AstNode) => {
    const rightNodeStart = rightNode.start;
    const rightNodeEnd = rightNode.end;

    rightNode = stripStructuralNodes(rightNode);

    const newLeft: AstNode = leftNode.left;
    const newRight: BinaryExpression = new BinaryExpression(leftNode.right.start, rightNodeEnd, leftNode.right, operator, rightNode);

    return new BinaryExpression(newLeft.start, newRight.end, newLeft, leftNode.operator, newRight);
};

const buildBinaryExpressionParser = (leftNode: AstNode, operator: Operators, rightNode: AstNode) => {
    const shouldSwapNodeLeaves = nodeIsBinaryExpression(leftNode) && newOperatorHasHigherPriority((<BinaryExpression> leftNode).operator, operator)

    if (shouldSwapNodeLeaves) {
        return withSwappedLeaves(<BinaryExpression> leftNode, operator, rightNode);
    }

    return new BinaryExpression(leftNode.start, rightNode.end, stripStructuralNodes(leftNode), operator, stripStructuralNodes(rightNode));
};

export const binaryExpressionParser: ParserFnWithLeftNode = (tokens: Token[], leftNode: AstNode) => {
    const [operatorToken, ...other] = tokens;

    const operator: Operators = operatorToken.value;
    const {node, remainingTokens} = __singleTurnParser(other, true);
    const rightNode: AstNode = node;
    const binaryExpression: BinaryExpression = buildBinaryExpressionParser(leftNode, operator, rightNode);

    return new AstMetaData(binaryExpression, remainingTokens);
};