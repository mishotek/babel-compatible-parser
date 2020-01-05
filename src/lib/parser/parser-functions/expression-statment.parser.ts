import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token} from "../../tokenizer/types/token.model";
import {literalPredicate} from "./literal.parser";
import {AstNode, AstNodeType, EmptyNode, ExpressionStatement} from "../types/ast-expression.model";
import {AstMetaData} from "../types/ast.model";
import {binaryExpressionParser, binaryExpressionPredicate} from "./binary-expression.parser";
import R = require("ramda");
import {parenthesisPredicate, stripParenthesis} from "./parenthesis.parser";
import {afterTheEndOfStatement, tillTheEndOfStatement} from "../../helpers/token-operations";
import {__singleTurnParser} from "../parser";
import {Operators} from "../../helpers/operators";

export const expressionStatementPredicate: PredicateFn = R.anyPass([
    binaryExpressionPredicate,
    literalPredicate,
    parenthesisPredicate
]);

const oneTurnParsing: (tokens: Token[], recentNode: AstNode) => AstMetaData = (tokens: Token[], recentNode: AstNode) => {
    if (binaryExpressionPredicate(tokens)) {
        return binaryExpressionParser(tokens, recentNode);
    }

    return __singleTurnParser(tokens, true);
};

export const expressionStatementParser: ParserFn = (tokens: Token[]) => {
    const _expressionTokens: Token[] = tillTheEndOfStatement(tokens);
    const _remainingTokens: Token[] = afterTheEndOfStatement(tokens);

    const endsWithEndOfStatement = tokens.length > _expressionTokens.length && tokens[_expressionTokens.length].value === Operators.EndOfStatement;

    let expressionTokens: Token[] = _expressionTokens;
    let recentNode: AstNode = new EmptyNode();

    while (expressionTokens.length > 0) {
        const {node, remainingTokens} = oneTurnParsing(expressionTokens, recentNode);

        expressionTokens = remainingTokens;
        recentNode = node;
    }

    return new AstMetaData(wrapInExpressionStatement(recentNode, endsWithEndOfStatement), _remainingTokens);
};

export const wrapInExpressionStatement: (node: AstNode, endsWithEndOfStatement: boolean) => ExpressionStatement = (node: AstNode, endsWithEndOfStatement: boolean) => {
    if (node.type === AstNodeType.ExpressionStatement) {
        return node;
    }

    const start = node.start;
    const end = endsWithEndOfStatement ? node.end + 1 : node.end;

    return new ExpressionStatement(start, end, stripParenthesis(node));
};

export const stripExpressionStatement: (astNode: AstNode) => AstNode = (astNode: AstNode) => {
    if (astNode.type === AstNodeType.ExpressionStatement) {
        return astNode.expression;
    }

    return astNode;
};
