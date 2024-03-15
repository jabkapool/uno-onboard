/*
class EmployeeGS {
    fullName: string;
}
*/

const fullNameLength = 10;

class EmployeeGS {
    private _fullName: string = "";

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameLength) {
            //throw new Error("fullName has a max length of " + fullNameLength);
            newName = "Joao Oliveira";
        }
        this._fullName = newName;
    }
}

export { EmployeeGS };