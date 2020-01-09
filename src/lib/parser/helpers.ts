import R = require("ramda");
import {AstNode, AstNodeType, EmptyNode} from "./types/ast-nodes.model";

export const stripParenthesis = (astNode: AstNode) => {
    while (astNode && astNode.type === AstNodeType.Parenthesis) {
        astNode = astNode.expression;
    }

    return astNode ? astNode : new EmptyNode();
};

export const stripExpressionStatement: (astNode: AstNode) => AstNode = (astNode: AstNode) => {
    if (astNode.type === AstNodeType.ExpressionStatement) {
        return astNode.expression;
    }

    return astNode;
};

export const stripStructuralNodes = R.pipe(stripParenthesis, stripExpressionStatement);