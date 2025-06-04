function getFitrstEl<T>(arr: T[]): T {
    return arr[0];
}

const firstEl = getFitrstEl(['abv', 'cde']);
const firstEl1 = getFitrstEl([1433, 222]);
console.log(firstEl.length);
console.log(firstEl1.toFixed(2));

console.log('---------');


function getTwoElements<T, U>(el1: T, el2: U): [T, U] {
    return [el1, el2]
}

console.log(getTwoElements<number, number>(2, 2).reduce((n, acc) => acc + n, 20));


console.log('---------');


interface Message<T> {
    sender: string,
    recipient: string,
    data: T
}

const message1: Message<{ message: string, date: Date }> = {
    sender: 'Pesho',
    recipient: 'Ivan',
    data: {
        message: 'Hello there',
        date: new Date(),
    }
}

console.log(message1.data);


console.log('-----------');


function logItemId<T extends { id: number }>(item: T): void {
    console.log(item.id);
}

// logItemId(2);w
// logItemId('min4o');
logItemId({ id: 2, name: 'Memo' });


console.log('-----------');

type User = {
    id: number,
    username: string,
    email: string
}

type Point = {
    x: number,
    y: number,
}

type MakeOptionalProperties<T> = {
    [K in keyof T]?: T[K] 
}

type OptionalUser = MakeOptionalProperties<User> 
type OptionalPoint = MakeOptionalProperties<Point>


//! Advanced Mapped Types

type Employe = {
    name: string,
    age: number,
    salary: number,
}

type getNumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type EmployeNumericKeys = getNumericKeys<Employe>;
type UserNumericKeys = getNumericKeys<User>;
