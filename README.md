# Interpreter module
[ Work in progress ]


### Variable declaration
```javascript
const myVariable = 12
let myVariable = 12
```

### Function declaration
```javascript
const myFunction = arg => arg * 2

const myFunction = (arg1, arg2) => {
   return arg1 + arg2;
}
```

### Naming conventions
#### Variable naming
Variables and functions should be named in a camel case and start with lowercase letter

### Function calls
```javascript
myFunction(arg1, arg2)
```

Piping and combiling functions
```javascript
const Combined = ToUpperCase < Trim < RemoveSpaces
const Piped = RemoveSpaces > Trim > ToUpperCase
```

Now we can rewrite IsEven
```javascript
const IsEven = Negate < IsOdd
```

# AST
```typescript
export type AST = AstNode[];

export type AstNode = CallExpression | NumericalLiteral
```

