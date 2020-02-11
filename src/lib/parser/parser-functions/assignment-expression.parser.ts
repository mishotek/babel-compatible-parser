import {ParserFn, ParserFnWithLeftNode, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {Operators} from "../../helpers/operators";
import {AssignmentExpression, AstNode} from "../types/ast-nodes.model";
import {__singleTurnParser} from "../parser";
import {stripStructuralNodes} from "../helpers";
import {AstMetaData} from "../types/ast.model";

export const assignmentExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 1 &&
        tokens[0].type === TokenType.Operator &&
        tokens[0].value === Operators.Assignment;
};

export const assignmentExpressionParser: ParserFnWithLeftNode = (tokens: Token[], leftNode: AstNode) => {
    const [operatorToken, ...other] = tokens;
    const {node, remainingTokens} = __singleTurnParser(other, true);
    const rightNode: AstNode = node;

    const assignmentExpression = new AssignmentExpression(leftNode.start, rightNode.end, stripStructuralNodes(leftNode), Operators.Assignment, stripStructuralNodes(rightNode));

    return new AstMetaData(assignmentExpression, remainingTokens);
};
