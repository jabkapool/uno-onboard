import { Department } from "./inheritance/Department";

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing'); // constructors in derived classes must call super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

export { AccountingDepartment };