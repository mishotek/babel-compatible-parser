# Interpreter module
[ Work in progress ]


### Goals
* Build interpreter module that can be easily used in other projects.
* Parsed AST should be compatible with babel (so it could be compiled to js)
* Fix some wierdness that js has
* Add new syntatic sugar for functional programming


### Variable declaration
```javascript
const myVariable = 12;
var myVariable = 12;
```

### Function declaration
```javascript
const myFunction = arg => arg * 2;

const myFunction = (arg1, arg2) => {
   return arg1 + arg2;
}
```

### Naming conventions
#### Variable naming
Variables and functions should be named in a camel case and start with lowercase letter

### Function calls
```javascript
myFunction(arg1, arg2);
```

Piping and combiling functions
```javascript
const Combined = ToUpperCase < Trim < RemoveSpaces;
const Piped = RemoveSpaces > Trim > ToUpperCase;
```

Some usage of pipe and combine operators 
```javascript
const IsEven = Negate < IsOdd;
const sayHello = trim > toUpperCase > console.log;
```

# AST
```typescript
export type AST = AstNode[];

export type AstNode = CallExpression | NumericalLiteral
```

