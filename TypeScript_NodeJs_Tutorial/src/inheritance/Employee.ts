import {Person} from './Person';
/*
class Employee {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    public move(distanceInMeters: number = 0) {
        console.log(`Employee moved ${distanceInMeters}m.`);
    }
  }
*/

  

  class Employee extends Person {
    private department: string;
  
    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }
  
    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }
  export {Employee};