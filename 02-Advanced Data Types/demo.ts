let passFail: 'pass' | 'fail';
passFail = 'fail'

let grade: 2 | 3 | 4 | 5 | 6;
grade = 5; 

type Person = {
    id: number,
    name: string,
    grade: number
}

type Address = {
    address: string,
    country: string
}


type PersonInfo = Person & Address;

let memoPErson: PersonInfo = {
    id: 23,
    name: 'Memo',
    grade: 5.5,
    address: 'Sofia',
    country: 'Bulgaria'
}  

function printPersonInfo(person: PersonInfo) {
    console.log(`I am ${person.name} from ${person.address} ${person.country}`);
}


printPersonInfo(memoPErson)




interface Animal {
    name: string,
    age: number,
    makeSound(soundName: string): void,
}

class Dog implements Animal {
    name: string;
    age: number;
    makeSound(soundName: string): void {
        console.log(soundName);
        
    }

    constructor (n: string, a: number) {
        this.name = n;
        this.age = a;
    }
}

const Doggy = new Dog ('Sharo', 2)
Doggy.makeSound('bau bau');


interface Person1 {
    id: number,
    name: string,
    grade: number
}

interface Address1 extends Person1 {
    address: string,
    country: string
}