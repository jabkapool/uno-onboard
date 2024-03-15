/*class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return `Hello, ${this.greeting}`;
    }
}*/

class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
      if (this.greeting) {
        return "Hello, " + this.greeting;
      } else {
        return Greeter.standardGreeting;
      }
    }
  }

export { Greeter };