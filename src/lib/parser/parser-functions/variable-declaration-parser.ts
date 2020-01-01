import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {Operators} from "../../helpers/operators";
import R = require("ramda");
import {AstNode, Identifier, VariableDeclaration} from "../types/ast-node.model";
import {parse} from "../parser";
import {tillTheEndOfStatement} from "../../helpers/token-operations";
import {AstMetaData} from "../types/ast.model";

const _constantVariableDeclarationPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length > 0 &&
           tokens[0].type === TokenType.Operator &&
           tokens[0].value === Operators.ConstantDeclaration;
};

export const _variableDeclarationPredicate: PredicateFn = (tokens: Token[]) => {
    console.log(tokens, tokens.length > 0 &&
        tokens[0].type === TokenType.Operator &&
        tokens[0].value === Operators.VariableDeclaration);
    return tokens.length > 0 &&
        tokens[0].type === TokenType.Operator &&
        tokens[0].value === Operators.VariableDeclaration;
};

export const VariableDeclarationPredicate: PredicateFn = R.either(_constantVariableDeclarationPredicate, _variableDeclarationPredicate);

export const VariableDeclarationParser: ParserFn = (tokens: Token[]) => {
    // TODO do error handling here and check for correct syntax
    const identifier: Identifier = new Identifier(tokens[1].value);

    const tokensInStatement: Token[] = tillTheEndOfStatement(tokens.splice(3));
    const value: AstNode = parse(tokensInStatement)[0];
    const isConstant: boolean = _constantVariableDeclarationPredicate(tokens);

    const node = new VariableDeclaration(identifier, value, isConstant);
    const remainingTokens = [...tokens].slice(3 + tokensInStatement.length);

    return new AstMetaData(node, remainingTokens);
};