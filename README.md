This tutoring session only tries to give a quick glance into typescript. I would recommend reading the handbook:
https://www.typescriptlang.org/docs/handbook/intro.html

# 1. What is Typescript?
- a superset of Javascript. (all your working javascript is also typescript code)
- a transpiled language (typescript is not executed directly, it is first transpiled/translated into javascript)
- a language that adds static typing to javascript (the types of variables have to be known before executing the code - at compile time - and should not change during the runtime)


# 2. Initialize Project
## initialize npm
```bash
#Run in empty directory referred to as ./
mkdir typescript_intro
cd typescript_intro
npm init -y
```
## add typescript
```bash
#Run in ./typescript_intro
npm install typescript --save-dev
or
npm install typescript -g
```
If you are planning to use typescript on multiple projects, i recommend installing it globally.
Running `npm install typescript --save-dev` aswell is still a good idea because it adds the dependecy to package.json
## initialize typescript
```bash
#Run in ./typescript_intro
tsc --init
```
A new file got created: `tsconfig.json` More about this config file: https://aka.ms/tsconfig.json
### Notable config options:
- **compilerOptions.target**: Which Version of Javascript is created (ES5, ES6, ES2020 etc.)
- **compilerOptions.module**: Specify what kind of module is created (commonjs => require(), module.exports, ES6 => import ... from, export)
- **compilerOptions.outDir**: Directory to which Typescript will output the transpiled .js files, without setting it, the .js file is emitted right next to the .ts file
- **include**: takes an array of files or directories to include when transpiling or watching for code changes

## Some changes to tsconfig
```json
{
    "compilerOptions":{
        //...
        "outDir": "./dist",
        //...
    },
    "include": ["src/**/*"] //We only want to include the src directory
}
```

## Create folder and index.ts
```bash
#Run in ./typescript_intro
mkdir src
touch src/index.ts
```

# 3. Typescript hello world
- Inside the index.ts write some code that outputs hello world to the console.
- transpile it by executing in your terminal
```bash
#Run in ./typescript_intro
tsc
```
- tsc should have created a new directory `./dist` and a `index.js` in it.
- run it using node
```bash
#Run in ./typescript_intro
node ./dist/index.js
```

## Having to call tsc everytime after i make a change is inconvenient!
To the rescue comes:
```bash
#Run in ./typescript_intro
tsc --watch
```
Now everytime you make a change to a file inside src. tsc will run and transpile your code. To also immediately run the transpiled js code use nodemon. Inside a new terminal (tsc --watch will run in the one you just used):
``` bash
#Run in ./typescript_intro
npm i nodemon --save-dev
nodemon ./dist/index.js
```

## Still having to run two commands and having two open terminals sucks...
CTRL+C out of the running nodemon and tsc processes and install ts-node:
``` bash
#Run in ./typescript_intro
# -D === --save-dev
npm i ts-node -D 
nodemon ./src/index.ts
```

ts-node is a wrapper around node that allows you to run .ts file directly. Not suggested for production environments as the transpilation takes some time, but very convenient for development. Nodemon uses ts-node to run .ts files.

# 3. Typescript - The Basics
## Why use Typescript?
The following code is syntactically valid javascript and nothing prevents you from running this code.
```javascript
const message = "Hello World"
console.log(message.toLowercase())
```
However, you will get an error that `TypeError: message.toLowercase is not a function`. We made a typo and our application crashes while running. Imagine that this part of the code is deeply nested in some function and only get's called under very specific circumstances, so you haven't noticed it during development. 
With typescript you get this error right when transpiling:
```
Property 'toLowercase' does not exist on type '"Hello World"'. Did you mean 'toLowerCase'?ts(2551)
```

Another example:
```javascript
const fancyDiv = document.getElementById("fancyDiv")
fancyDiv.style.background = "red"
```
And suddenly while your program is running fine for some users it crashes for others with: `TypeError: Cannot read properties of null (reading 'style')`. Well, it seems you didn't get the memo that Jim made a change that removes this fancyDiv for users that have an Avatar uploaded.

In typescript you get right away, before shipping your code:
```
Object is possibly 'null'.ts(2531)
```
How to fix that?
``` typescript
const fancyDiv = document.getElementById("fancyDiv");
if (fancyDiv) fancyDiv.style.background = "red";
```

While you will write a little bit more code when using typescript, it will be certainly much more bulletproof!

## What are types?
From javascript you already know those types:
```javascript
//Boolean
let bool = true
typeof bool === "boolean"
//Null
let n = null;
typeof n === "object" //yes, null values are objects... don't ask why...
//Undefined
let u = undefined
typeof u === "undefined"
//Number
let number = 5
typeof number === "number"
//BigInt
let bigInt = 5n //Only available from ES2020+ so tsconfig.json target needs to be set to ES2020 or greater
typeof bigInt === "bigint"
//String
let string = "Hi Mom!"
typeof string === "string"
//Symbol
let symbol = Symbol("Unique")
typeof symbol === "symbol"
//Object
let object = {}
typeof object === "object"
```

### How can you specify the type of variables?
```typescript
// let/const variablename: typename = value
// for example
//Boolean
let bool:boolean = true
//Undefined
let u: undefined = undefined
//Number
let number: number = 5
//BigInt
let bigInt: bigint = 5n //Only available from ES2020+ so tsconfig.json target needs to be set to ES2020 or greater
//String
let string: string = "Hi Mom!"
//Symbol
let symbol: symbol = Symbol("Unique")
//Object
let object: object = {}
```
having specified the type of a variable will let typescript produce errors one you try to do something with it that should not be possible:
```typescript
//Number
let number: number = 5
number = "5"
```
will give 
```
Type 'string' is not assignable to type 'number'.ts(2322)
```
or
```typescript
//Number
let number: number = 5
number.toLowerCase()
```
will give
```
Property 'toLowerCase' does not exist on type 'number'.ts(2339)
```

Typescript adds on top of that:
- **any**: a variable of type any can take any assignment (no matter the type) and can be assigned to anything. Any is basically an escape hatch from typescript and should be used with sparingly. Using any often basically makes your typescript app behave error wise like a javascript app (failing at runtime). The code below will throw no typeerrors when running tsc. But it will crash during runtime with `TypeError: string.toLowerCase is not a function`
```typescript
//Any
let any: any = "Hey!"
any = 5 //Can assign a number to a string variable

let string: string = "I am a string!"
string = any //Can assign any which now contains a number to a string

string.toLowerCase(); //Can call this function because the variable string is expected to be a string
```

- **unknown**: a variable of type unknown can take any assignment but can not be assigned to anything, first it needs to get narrowed down
```typescript
//unkown
let unknown: unknown = "Hey!"
unknown = 5 //Can assign a number to a string variable

let string: string = "I am a string!"
string = unknown //Will produce tsc error: Type 'unknown' is not assignable to type 'string'.ts(2322)
```
you will get this tsc error `Type 'unknown' is not assignable to type 'string'.ts(2322)`
to fix it:
```typescript
//unkown
let unknown: unknown = "Hey!"
unknown = 5 //Can assign a number to a string variable

let string: string = "I am a string!"
if(typeof unknown === "string") {
    //Inside the if block tsc knows that unknown has to be a string, so it allows the assignment
    string = unknown 
}
```
- **string literal types**: Only the specified string literal can be assigned to the variable
```typescript
//string literal
let literal: "yes" = "yes"
literal = "no"
```
will give you the error `Type '"no"' is not assignable to type '"yes"'.ts(2322)`
- **string template literal types**: Only the strings matching the template literal are allowed
```typescript
//string template literal
let literal2: `count:${number}` = `count:2` //Works, because 2 is a number
literal2 = "count:x" //Type '"count:x"' is not assignable to type '`count:${number}`'.ts(2322)
```
will give you the error `Type '"count:x"' is not assignable to type '``count:${number}``'.ts(2322)`
- **Object Types**: 
``` typescript
//object types {key: type, optionalKey?:type}
let object: { name: string; password: string; age?: number } = {
  name: "Kevin",
  password: "password",
}; //Can be assigned because age is marked as optional with the questionmark "age?"

object.age = 5

object.location = "Halle";
/** Error:
 Property 'location' does not exist on type '{ name: string; password: string; age?: number | undefined; }'.ts(2339)
 */

object = { username: "Paul", password: "1234" };
/** Error:
 Type '{ username: string; password: string; }' is not assignable to type '{ name: string; password: string; age?: number | undefined; }'.
  Object literal may only specify known properties, and 'username' does not exist in type '{ name: string; password: string; age?: number | undefined; }'.ts(2322)
 */

object = { name: "Paul" };
/** Error:
 Property 'password' is missing in type '{ name: string; }' but required in type '{ name: string; password: string; age?: number | undefined; }'.ts(2741)
 */
```
- **Union Types**: like the name says, a union of different types
```typescript
//union types
let literal: "yes" | "no" = "yes"; //using the pipe character | you can specify more than one type that is allowed to be used on a variable
literal = "no"; //works now because "no" is part of the union "yes" | "no"
literal = "maybe"; //doesn't work
/**
 Type '"maybe"' is not assignable to type '"yes" | "no"'.ts(2322)
 */

let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 5;
diceRoll = 8;
/*
Type '8' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'.ts(2322)
*/

let union: { name: string; password: string } | { name: string; age: number } =
  { name: "Kevin", password: "31" };
union = { name: "Kevin", age: 31 };
union = { name: "Paul", prop: "a" };
/*
Type '{ name: string; prop: string; }' is not assignable to type '{ name: string; password: string; } | { name: string; age: number; }'.
  Object literal may only specify known properties, and 'prop' does not exist in type '{ name: string; password: string; } | { name: string; age: number; }'.ts(2322)
*/
```
- **Arrays**: You can specify arrays with specific types in them
```typescript
//array types
//fixed size with known entries
let fixedArray: [string, number] = ["Hey", 42]
fixedArray[0] = 30
/** Error:
 Type 'number' is not assignable to type 'string'.ts(2322)
 */

//Array with unknown length but known type of elements
let extendableArray: number[] = [1]
extendableArray = [1,3,5,8,9,7,4]
extendableArray.push("5")
/* Error:
Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
*/
extendableArray.forEach((num) => {
    num.toLowerCase() //Even for the higher order functions on the array, typescript knows the type
    /*
    Property 'toLowerCase' does not exist on type 'number'.ts(2339)
    */
})

//Can be combined with union types
let unionArray: (string | number)[] = ["a", 2, 5]
unionArray = ["a", {}]
/* Error:
Type '{}' is not assignable to type 'string | number'.
  Type '{}' is not assignable to type 'number'.ts(2322)
*/
```
- **functions**: In js variables can be functions, so there is also a function type
```typescript
//Function types 
let func: (para: number) => number;

//Types on functions: function (parameter: type, parameter2: type): type {} or (parameter: type, parameter2: type): type => {}
//The : type after the () denotes the return type of the function

function addOne(n: number): number {
    return n+1
}

func = addOne //Works because the type of the function (parameters and return type) are the same

const makeString = (a: number):string => a.toString()

func = makeString
/*Error:
type '(a: number) => string' is not assignable to type '(para: number) => number'.
  Type 'string' is not assignable to type 'number'.ts(2322)
*/

addOne("5")
/*Error:
Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
*/
let number = 2 
number = makeString(5)
/*Error:
Type 'string' is not assignable to type 'number'.ts(2322)
*/
```
- **never**: A type that can not happen. Best explained by example
```typescript
//never type
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 2 as any;

switch (diceRoll) {
  case 1:
    break;
  case 2:
    break;
  case 3:
    break;
  case 4:
    break;
  case 5:
    break;
  case 6:
    break;
  default:
    console.log(diceRoll);
  //At this point tsc infers that diceRoll can never happen (because our switch exhaustively handles all the cases), so it has the type never.
}

//This is also one of the best examples where never is usefull rewriting the default case for the switch like that makes sure that we will never miss any case, even if the type is expanded later on
switch (diceRoll) {
  case 1:
    break;
  case 2:
    break;
  case 3:
    break;
  case 4:
    break;
  default:
    const _never: never = diceRoll;
    /** Error (because we missed a case above):
     Type 'number' is not assignable to type 'never'.
     */
    console.log("Unhandled Case:", _never);
}
```

# 4. Type aliases and Interfaces
Writing those types by hand, especially if you need to reuse them multiple times becomes tedious very fast. So you can define aliases for your types:
```typescript
//Type aliases
type User = {name: string, password: string}
type Dog = {name: string, age: number}

let union: User | Dog = {name: "Kevin", password: "1234"}
union = {name: "jimmy", age: 5}

interface IUser {name: string, password: string}
interface IDog {name: string, age: number}

type HasName = IUser | IDog
let union2: HasName = {name: "jimmy", age: 5}

//Difference between type and interface is mainly that interfaces can be extended and types can not

interface IUser {
    age: number
}

let union3: IUser = {name: "Kevin", password: "1234", age: 5} //works because age was added to IUser
```

# 5. Narrowing and casting
More on this here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
As a very short summary, typescript allows you to narrow down a type by 
# 6. create-react-app with typescript
```bash
#Run in ./
npx create-react-app app --template typescript
cd ./app
```
The main difference is that instead of js and jsx files you now have ts, and tsx. cra takes care of all the configuration stuff for you.
You can even opt out of typescript in single components by just naming them .jsx