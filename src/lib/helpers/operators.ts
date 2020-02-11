export class Operators {
    public static readonly ConstantDeclaration = 'const';
    public static readonly VariableDeclaration = 'var';
    public static readonly EndOfStatement = ';';
    public static readonly Assignment = '=';
    public static readonly Pipe = '>';
    public static readonly Compose = '<';
    public static readonly ArrowFunction = '=>';
    public static readonly Add = '+';
    public static readonly Subtract = '-';
    public static readonly Multiply = '*';
    public static readonly Divide = '/';
    public static readonly IF = 'if';
    public static readonly ELSE = 'else';
}

// Operators should be ordered by their length (longest first)
export const SYMBOL_OPERATORS = ['=>', '=', '>', '<', '+', '-', '*', '/'];
export const OPERATORS = [
    'const',
    'else',
    'var',
    'if',
    '=>',
    '=',
    '>',
    '<',
    '+',
    '-',
    '*',
    '/',
    ';'
];

export const BinaryExpressions: Operators[] = [
    Operators.Add,
    Operators.Subtract,
    Operators.Multiply,
    Operators.Divide,
];

export const UnaryExpressions: Operators[] = [
    Operators.Add,
    Operators.Subtract,
];
