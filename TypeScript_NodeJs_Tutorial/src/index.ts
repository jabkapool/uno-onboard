// This is the entry point of the application. It starts the server and listens on the port 3000.
/*
import app from './App'

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port}`)
})
*/

import {Dog} from './inheritance/Dog'
import { Snake } from './inheritance/Snake';
import { Animal } from './inheritance/Animal';
import { Horse } from './inheritance/Horse';
import { Rhino } from './inheritance/Rhino';
import { Employee } from './inheritance/Employee';
import { Person } from './inheritance/Person';
import {Octopus} from './inheritance/Octopus';
import { EmployeeGS } from './gettersSetters/EmployeeGS';
import { Department } from './inheritance/Department';
import { AccountingDepartment } from './AccountingDepartment';
import { Greeter } from './Greeter';
import { Point, Point3d } from './Point';

//const dog = new Dog();
const dog = new Dog("Boby");
dog.bark();
dog.move(10);
dog.bark();

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//let cat = new Animal("Cat").name; //Only if name is public in Animal class
//console.log(cat);

let animal = new Animal("Goat");
let rhino = new Rhino();
//let employee = new Employee("Bob");
 
animal = rhino;
//animal = employee;

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
//console.log(howard.name); // error

let dad = new Octopus("Man with 8 strong legs");
//dad.name = "Man with 3-piece suit"; //Cannot assign to 'name' because it is a read-only property.ts(2540)
console.log(dad.name);

let employeeGS = new EmployeeGS();
employeeGS.fullName = "Bob Smith";
if (employeeGS.fullName) {
    console.log(employeeGS.fullName);
}

let emp = new EmployeeGS();
//emp.fullName = "This name is too long and there for should throw an error.";
emp.fullName = "This name is too long and there for it should be renamed to my name";
if (emp.fullName) {
    console.log(emp.fullName);
}

let department: Department; // ok to create a reference to an abstract type
//department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
//department.generateReports(); //error: Property 'generateReports' does not exist on type 'Department'.ts(2339)

//let greeter: Greeter;
//greeter = new Greeter("world !!!");
//console.log(greeter.greet());

/*
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }

    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };

    return Greeter;
})();

let greeter
greeter = new Greeter("world");
console.log(greeter.greet());
*/

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"
 
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";
 
let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"
 
let greeter3: Greeter;
greeter3 = new Greeter();
console.log(greeter3.greet()); // "Hey there!"

let point3d: Point3d = { x: 1, y: 2, z: 3 };
console.log(point3d);

/*******************************************************************************************************************************************/
/************* https://www.typescriptlang.org/docs/handbook/classes.html ******************************************************************/
/************* https://www.typescriptlang.org/docs/handbook/modules/reference.html *******************************************************/
/************* https://www.educba.com/typescript-promise/ *******************************************************************************/
/************* https://stackoverflow.com/questions/39032333/get-a-value-from-a-promise-typescript **************************************/
/************* https://stackoverflow.com/questions/39032333/get-a-value-from-a-promise-typescript *************************************/
/************* https://basarat.gitbook.io/typescript/future-javascript/async-await#async-await-support-in-typescript *****************/
/************************************************************************************************************************************/

const myPromiseDemo = new Promise((resolve, reject) => {
        // Asynchronous code here
});

myPromiseDemo
.then((value) => {
    // Code to be executed if the Promise is resolved
    console.log('Promise resolved with value: ', value);
})
.catch((error) => {
    // Code to be executed if the Promise is rejected
    console.error('Promise rejected with error: ', error);
});

async function myAsyncFunction() {
    try {
        const value = await myPromiseDemo;
        console.log('Promise resolved with value: ', value);
    } catch (error) {
        console.error('Promise rejected with error: ', error);
    }
}

var myPromiseA = new Promise<number>((resolve, reject) => {
    let result:number = 100;
    resolve(result);
}).then(result => { // first then
                  console.log("Result: " + (typeof result)); 
                  console.log("Result of PromiseA before finishing then: " + result);
                  result = result * 2;
                  console.log("Result of PromiseA : " + result);
                  return result;
});

var promiseB = myPromiseA.then(result => { return result + 1; });

promiseB.then(result => { console.log("Result of PromiseB: " + result); });

let myPromiseStr = new Promise<string>((resolve, reject) => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      let success = Math.random() > 0.5;  // Randomly decide whether the operation was successful
      if (success) {
        resolve("Operation was successful!");  // Resolve the promise with a value
      } else {
        reject(new Error("Operation failed!"));  // Reject the promise with an error
      }
    }, 1000); //wait 1 second
});        

myPromiseStr.then((message) => {
    console.log(message);  // Will print "Operation was successful!" if the promise is resolved
  }).catch((error) => {
    console.error(error);  // Will print "Error: Operation failed!" if the promise is rejected
  });    
  


/*
A Promise in TypeScript (and JavaScript) is an object that represents an operation that hasn't completed yet but is expected in the 
future. A Promise can be in one of three states: Pending: The Promise's outcome hasn't yet been determined because the asynchronous
operation is still in progress.

To create a new promise, use the new keyword followed by Promise. The Promise constructor accepts a function which should take two parameters:
- A function to resolve the promise.
- A function to reject the promise.

Handling Promises
Once a promise is declared, use the .then() and .catch() methods to handle the success or failure of the asynchronous operation. 
The .then() method is called when the Promise is resolved, while the .catch() method is called when it is rejected.

async/await
TypeScript also supports the async/await syntax, which is a more readable and an alternative way to handle promises.

*/