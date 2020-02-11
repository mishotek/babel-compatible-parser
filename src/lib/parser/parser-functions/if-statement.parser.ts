import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {Operators} from "../../helpers/operators";
import {tokensInParenthesis} from "../../helpers/token-operations";
import {AstNode, AstNodeType, EmptyNode, IfStatement} from "../types/ast-nodes.model";
import {__singleTurnParser, parse} from "../parser";
import {stripExpressionStatement} from "../helpers";
import {AstMetaData} from "../types/ast.model";

export const ifStatementPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 3 &&
        tokens[0].type === TokenType.Operator &&
        tokens[0].value === Operators.IF &&
        tokens[1].type === TokenType.Parenthesis &&
        tokens[1].value === '(';
};

export const ifStatementParser: ParserFn = (tokens: Token[]) => {
    const [ifOperator, ...other] = tokens;
    const testTokens = tokensInParenthesis(other);
    const _test: Array<AstNode> = parse(testTokens).body;

    if (_test.length !== 1) {
        throw new SyntaxError(`If statement should contain a single predicate expression at ${testTokens[0].start}-${testTokens[testTokens.length-1].end}`);
    }

    const test = stripExpressionStatement(_test[0]);

    const remaining: Array<Token> = other.splice(testTokens.length + 2);

    const {node, remainingTokens} = __singleTurnParser(remaining);
    const consequent: AstNode = stripExpressionStatement(node);
    const {alternate, rest} = getAlternate(remainingTokens);

    const start: number = ifOperator.start;
    const end: number = alternate.type === AstNodeType.EmptyNode ? consequent.end : alternate.end;

    const ifStatement: IfStatement = new IfStatement(start, end, test, consequent, alternate);

    return new AstMetaData(ifStatement, rest);
};

const getAlternate = (tokens: Token[]) => {
    const hasElseStatement = tokens.length > 1 && tokens[0].type === TokenType.Operator && tokens[0].value === Operators.ELSE;

    if (!hasElseStatement) {
        return {alternate: new EmptyNode(), rest: tokens};
    }

    const [elseOperator, ...other] = tokens;
    const {node, remainingTokens} = __singleTurnParser(other);

    return {alternate: node, rest: remainingTokens};
};
