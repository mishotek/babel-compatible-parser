import * as chalk from "chalk";
import inquirer = require("inquirer");
import {parseAndEvaluate} from "./parse-and-evaluate";
import {ScopeManager} from "../execute/scope-manager/scope-manager";

const readInput = () => {
    const questions = [{name: 'command', type: 'input', message: chalk.blue('>> ')}];
    return inquirer.prompt(questions);
};

export const repl = () => {
    const scopeManager: ScopeManager = new ScopeManager();

    _repl(scopeManager);
};

const _repl = async (scopeManager:  ScopeManager) => {
    try {
        const { command } = await readInput();

        if (typeof command === 'string' && command.trim()) {
            console.log(parseAndEvaluate(scopeManager)(command));
        }
    } catch (e) {
        console.error(e);
    }

    _repl(scopeManager);
};
