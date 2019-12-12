# Interpreter module
[ Work in progress ]

Some ideas to consider:

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
```
myVariable > MyFunction > AnotherFunction > (3 > Divide)
```

Chaining functions on arrays
```
myArray
  > (MappingFn > Map)
  > (FilteringFn > FilterIn)
  > (FilteringFn > FilterOut)
  > (Reducer > Reduce)
  > MultiplyByFive
```
