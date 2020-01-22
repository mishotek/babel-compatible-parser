import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {AstNode, AstNodeType, UnaryExpression} from "../types/ast-nodes.model";
import {Operators, UnaryExpressions} from "../../helpers/operators";
import {AstMetaData} from "../types/ast.model";
import {__singleTurnParser} from "../parser";

export const unaryExpressionPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 2 && tokens[0].type === TokenType.Operator && UnaryExpressions.includes(tokens[0].value);
};

const nodeIsUnaryExpression = (node: AstNode) => node.type === AstNodeType.UnaryExpression;

export const unaryExpressionParser: ParserFn = (tokens: Token[]) => {
    const [operatorToken, ...other] = tokens;

    const operator: Operators = operatorToken.value;
    const {node, remainingTokens} = __singleTurnParser(other, true);

    return new AstMetaData(new UnaryExpression(operatorToken.start, node.end, operator, node), remainingTokens);
};