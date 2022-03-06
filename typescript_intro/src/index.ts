console.log("Hello World");
console.log("Second Line");
console.log("Third Line");
console.log("Fourth Line");

// let/const variablename: typename = value
// for example
//Boolean
let bool: boolean = true;
//Undefined
let u: undefined = undefined;
//Number
let number: number = 5;
//BigInt
let bigInt: bigint = 5n; //Only available from ES2020+ so tsconfig.json target needs to be set to ES2020 or greater
//String
let string: string = "Hi Mom!";
//Symbol
let symbol: symbol = Symbol("Unique");
//Object
let object2: object = {};

//Any
let any: any = "Hey!";
any = 5;

let string2 = "I am a string!";
string2 = any; //Can assign any which now contains a number to a string

//will crash:
//string2.toLocaleLowerCase()

//unkown
let unknown: unknown = "Hey!";
unknown = 5; //Can assign a number to a string variable

let string3: string = "I am a string!";
if (typeof unknown === "string") {
  //Inside the if block tsc knows that unknown has to be a string, so it allows the assignment
  string3 = unknown;
}

//string literal
let literal: "yes" = "yes";
//will throw an error
//literal = "no"

//string template literal
let literal2: `count:${number}` = `count:2`; //Works, because 2 is a number
//will throw an error
//literal2 = "count:x"

let id: string = "1dwad6wa51d6wa51d65wa";
let userId: `user:${string}`;
let boardId: `board:${string}`;
let listId: `list:${string}`;

//object types {key: type, optionalKey?:type}
let object: { name: string; password: string; age?: number } = {
  name: "Kevin",
  password: "password",
}; //Can be assigned because age is marked as optional with the questionmark "age?"

object.age = 5;

// object.location = "Halle";
/** Error:
   Property 'location' does not exist on type '{ name: string; password: string; age?: number | undefined; }'.ts(2339)
   */

//object = { username: "Paul", password: "1234", name: "Kevin" };
/** Error:
   Type '{ username: string; password: string; }' is not assignable to type '{ name: string; password: string; age?: number | undefined; }'.
    Object literal may only specify known properties, and 'username' does not exist in type '{ name: string; password: string; age?: number | undefined; }'.ts(2322)
   */

//object = { name: "Paul" };
/** Error:
   Property 'password' is missing in type '{ name: string; }' but required in type '{ name: string; password: string; age?: number | undefined; }'.ts(2741)
   */

//union types
let union1: "yes" | "no" = "yes"; //using the pipe character | you can specify more than one type that is allowed to be used on a variable
union1 = "no"; //works now because "no" is part of the union "yes" | "no"
//union1 = "maybe"; //doesn't work
/**
 Type '"maybe"' is not assignable to type '"yes" | "no"'.ts(2322)
 */

let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
//diceRoll = 8;
/*
Type '8' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6'.ts(2322)
*/

let union: { name: string; password: string } | { name: number; age: number } =
  Math.random() < 0.5
    ? { name: "Kevin", password: "1234" }
    : { name: 1234, age: 21 };

//Using "age" in union i can narrow down the type
if ("age" in union) union.name;

union = { name: 1235, age: 31 };

//union = { name: "Paul", prop: "a" };
/*
Type '{ name: string; prop: string; }' is not assignable to type '{ name: string; password: string; } | { name: string; age: number; }'.
  Object literal may only specify known properties, and 'prop' does not exist in type '{ name: string; password: string; } | { name: string; age: number; }'.ts(2322)
*/

//Combined Types
let combined: object & { age: number } = { age: 1234 };

//array types
//fixed size with known entries
const fixedArray: [string, number] = ["2", 42];
fixedArray.push(65);
fixedArray.unshift(5); //Can be done, not checked by ts.
//[5, "2", 42]
//fixedArray[0] = 30
/** Error:
 Type 'number' is not assignable to type 'string'.ts(2322)
 */

//Array with unknown length but known type of elements
let extendableArray: number[] = [1];
extendableArray = [1, 3, 5, 8, 9, 7, 4];
extendableArray.push(2);

let unionArray2: (
  | { name: string; password: string }
  | { username: string; password: string }
)[] = [
  { name: "kevin", password: "1234" },
  { username: "esra", password: "1234" },
  { name: "", password: "1234" },
];

//extendableArray.push("5")
/* Error:
Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
*/
extendableArray.forEach((num) => {
  //num.toLowerCase() //Even for the higher order functions on the array, typescript knows the type
  /*
    Property 'toLowerCase' does not exist on type 'number'.ts(2339)
    */
});

//Can be combined with union types
let unionArray: (string | number)[] = ["a", 5];
//unionArray = ["a", {}]
unionArray.forEach((a) => {}); //a is string | number
/* Error:
Type '{}' is not assignable to type 'string | number'.
  Type '{}' is not assignable to type 'number'.ts(2322)
*/

//Function types
let func: (para: number) => number = (a) => a + 42;

//Types on functions: function (parameter: type, parameter2: type): type {} or (parameter: type, parameter2: type): type => {}
//The : type after the () denotes the return type of the function

function addOne(n: number) {
  return n + 1;
}

func = addOne; //Works because the type of the function (parameters and return type) are the same

const makeString = (a: number): string => a.toString();

//func = makeString
/*Error:
type '(a: number) => string' is not assignable to type '(para: number) => number'.
  Type 'string' is not assignable to type 'number'.ts(2322)
*/

//addOne("5")
//addOne(null)
/*Error:
Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
*/
let number3: number = 2;
//number3 = makeString(5)
/*Error:
Type 'string' is not assignable to type 'number'.ts(2322)
*/

//never type
let diceRoll2: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 2 as any;

switch (diceRoll2) {
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
    console.log(diceRoll2);
  //At this point tsc infers that diceRoll can never happen (because our switch exhaustively handles all the cases), so it has the type never.
}

//This is also one of the best examples where never is usefull rewriting the default case for the switch like that makes sure that we will never miss any case, even if the type is expanded later on
switch (diceRoll2) {
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
  case 7:
    break;
  default:
    const _never: never = diceRoll2;
    /** Error (because we missed a case above):
     Type 'number' is not assignable to type 'never'.
     */
    console.log("Unhandled Case:", _never);
}

type Roles = "root" | "admin" | "customer";
interface IUser {
  name: string;
  password: string | number;
  role: Roles;
}
type UserArray = IUser[];

declare function stringify (para: number): string //declaring stringify without implemting it. For example if it come from Node, the Browser etc.


const user4: IUser = { password: "1234", name: "Tanya", role: "root" };
const user5: IUser = { name: "Tanya", password: "1234", role: "admin" };
const user6: IUser = { name: "Tanya", password: "1234", role: "customer" };
const user7: IUser = { name: "Tanya", password: "1234", role: "customer" };

const userArray: IUser[] = [];
userArray.push(user4, user5, user6);

interface Admin extends IUser {
  permissions: "destroy";
}

interface Products {
  id: string;
  price: number;
  description: string;
}

type UserProducts = Products & IUser;

/* const something: UserProducts = {} */

interface SpecialRequest extends Request {
  head: string;
}

//const something: User = {} //{} is missing name, password, role
//If you still want to do it you can cast it:
const something: IUser = { password: "adwa", role: "admin" } as IUser; //casting: expression as type

interface bird {
  name: "bird";
  fly: () => void;
}
interface fish {
  name: "fish";
  swim: () => void;
}

interface cat {
  name: "cat";
  sleep: () => void;
}

const animal: bird | fish | cat | number = (
  Math.random() < 0.5
    ? { name: "cat", sleep: () => {} }
    : Math.random() < 0.5
    ? { name: "fish", swim: () => {} }
    : {
        name: "bird",
        fly: () => {},
      }
) as any;

if (typeof animal !== "number") {
  if ("fly" in animal) animal.name;
  if ("sleep" in animal) animal.name;
  if ("swim" in animal) animal.name;

  if (animal.name === "cat") animal.sleep();
}

if(typeof animal === "number") animal.toFixed()

class Customer implements IUser{
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password
    this.role = "customer"
    this.cart = []
  }
  name: string;
  password: string | number;
  role: Roles;
  cart: string[]
}

let anotherVar: Customer | cat | "Client" = new Customer("Kevin", "1234") as any

if(anotherVar === "Client") throw new Error("")

const test = anotherVar

if(typeof anotherVar !== "string"){
  if("sleep" in anotherVar)anotherVar.sleep()
  if(anotherVar instanceof Customer) anotherVar.name;
}else {
  console.log(anotherVar);
}


function isUser(variable: unknown): variable is IUser {
  if(!variable) return false;
  if(typeof variable !== "object") return false;
  if(!("name" in variable)) return false;
  if(!("role" in variable)) return false;
  if(!("password" in variable)) return false;

  const c1 = variable as {name: unknown, role: unknown, password: unknown}
  if(typeof c1.name !== "string" ) return false;
  if(c1.role !== "root" && c1.role !== "admin"  && c1.role !== "customer" ) return false;
  if(typeof c1.password !== "string" && typeof c1.password !== "number") return false;

  return true
}

const anyVar: unknown = {name: "Kevin", password: "1234", role: "root"}

if(isUser(anyVar)){
  anyVar.name;
}

