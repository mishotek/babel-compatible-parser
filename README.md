# Interpreter module
[ Work in progress ]

Some ideas to consider:

### Operators
  * =
  * (
  * )
  * =>
  * ->
  * \>
  * <


### Variable declaration
```javascript
const myVariable = 12
```

### Function declaration
```javascript
const MyFunction = arg => arg * 2
```

### Naming conventions
#### Variable naming
Variables should be named in a camel case and start with lowercase letter

#### Function naming
Functions should be named in a camel case and start with uppercase letter

### Function calls
Combining in line
```javascript
myVariable -> MyFunction -> AnotherFunction -> (3 -> Divide)
```

Chaining functions on arrays
```javascript
myArray
  -> (MappingFn -> Map)
  -> (FilteringFn -> FilterIn)
  -> (FilteringFn -> FilterOut)
  -> (Reducer -> Reduce)
  -> MultiplyByFive
```

Declearing function that uses other function
```javascript
const IsEven = number => number -> IsOdd -> Not
```

Piping and combiling functions
```javascript
const Combined = ToUpperCase < Trim < RemoveSpaces
const Piped = RemoveSpaces > Trim > ToUpperCase
```

So now these are identical:
```javascript
string -> RemoveSpaces -> Trim -> ToUpperCase
string -> (RemoveSpaces > Trim > ToUpperCase)
string -> (ToUpperCase < Trim < RemoveSpaces)
```

Now we can rewrite IsEven
```javascript
const IsEven = number => Not < (number -> IsOdd)

// Or in point free style

const IsEven = Negate < IsOdd
```

### Comparing to more usual syntax
```javascript
const PrintMoney = amount => amount, '$' -> Concat -> Print
const printMoney = amount => print(concat(amount, '$'))

const Either = ...fns => ...args => fns
   -> ((soFar, fn => (...args -> fn), soFar -> Or) -> Reduce)
const either = (...fns) => (...args) => fns
   .reduce((soFar, fn) => soFar || fn(...args))
```

