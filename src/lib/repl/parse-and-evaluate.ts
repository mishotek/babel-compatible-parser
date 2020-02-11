import {tokenize} from "../tokenizer/tokenizer";
import {parse} from "../parser/parser";
import R = require("ramda");
import {ScopeManager} from "../execute/scope-manager/scope-manager";
import {executeRepl} from "../execute/execute";

export const parseAndEvaluate = (scopeManager: ScopeManager) => R.pipe(
    tokenize,
    parse,
    executeRepl(scopeManager)
);