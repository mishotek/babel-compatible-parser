import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token} from "../../tokenizer/types/token.model";
import {literalPredicate} from "./literal.parser";
import {AstNode, AstNodeType, EmptyNode, ExpressionStatement} from "../types/ast-nodes.model";
import {AstMetaData} from "../types/ast.model";
import {binaryExpressionParser, binaryExpressionPredicate} from "./binary-expression.parser";
import {parenthesisPredicate} from "./parenthesis.parser";
import {afterTheEndOfStatement, tillTheEndOfStatement} from "../../helpers/token-operations";
import {__singleTurnParser} from "../parser";
import {endsWithEndOfStatement} from "../../helpers/ends-with-end-of-statement";
import {stripParenthesis} from "../helpers";
import R = require("ramda");

export const expressionStatementPredicate: PredicateFn = R.anyPass([
    binaryExpressionPredicate,
    literalPredicate,
    parenthesisPredicate
]);

const oneTurnParsing: (tokens: Token[], recentNode: AstNode) => AstMetaData = (tokens: Token[], recentNode: AstNode) => {
    if (binaryExpressionPredicate(tokens) && recentNode.type !== AstNodeType.EmptyNode) {
        return binaryExpressionParser(tokens, recentNode);
    }

    return __singleTurnParser(tokens, true);
};

export const expressionStatementParser: ParserFn = (tokens: Token[]) => {
    const _expressionTokens: Token[] = tillTheEndOfStatement(tokens);
    const _remainingTokens: Token[] = afterTheEndOfStatement(tokens);

    const _endsWithEndOfStatement = endsWithEndOfStatement(tokens, _expressionTokens);

    let expressionTokens: Token[] = _expressionTokens;
    let recentNode: AstNode = new EmptyNode();

    while (expressionTokens.length > 0) {
        const {node, remainingTokens} = oneTurnParsing(expressionTokens, recentNode);

        expressionTokens = remainingTokens;
        recentNode = node;
    }

    return new AstMetaData(wrapInExpressionStatement(recentNode, _endsWithEndOfStatement), _remainingTokens);
};

export const wrapInExpressionStatement: (node: AstNode, endsWithEndOfStatement: boolean) => ExpressionStatement = (node: AstNode, endsWithEndOfStatement: boolean) => {
    if (node.type === AstNodeType.ExpressionStatement) {
        return node;
    }

    const start = node.start;
    const end = endsWithEndOfStatement ? node.end + 1 : node.end;

    return new ExpressionStatement(start, end, stripParenthesis(node));
};
