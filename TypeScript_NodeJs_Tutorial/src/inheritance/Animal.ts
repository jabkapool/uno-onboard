/*class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}*/
/*
class Animal {
    #name: string; //# means private
    constructor(theName: string) {
        this.#name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
*/

class Animal {
    private name: string; 
    constructor(theName: string) {
        this.name = theName;
    }
    public move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

export {Animal};