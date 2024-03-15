/*class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;

    constructor(theName: string) {
        this.name = theName;
    }
}*/

class Octopus {   
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
}

export { Octopus };