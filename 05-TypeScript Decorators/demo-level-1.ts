// function LogClass(constructor: Function) {
//     console.log(`Class <${constructor.name}> created!`);
//     console.log('----------');

// }

// function logAccessor(target: any, propertyName: string, descriptor: PropertyDescriptor) {
//     console.log(`Accessor for property name <${propertyName}> created!`);
//     console.log('----------');
// }

// function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
//     console.log(`Accessor for method name <${methodName}> created!`);
//     console.log('----------');
// }

// function logProperty(target: any, propertyName: string) {
//     console.log(`Property <${propertyName}> created!`);
//     console.log('----------');
// }

// function logParameter(target: any, methodName: string, parameterIndex: number) {
//     console.log(`Parameter <${parameterIndex}> for method ${methodName} created!`);
//     console.log('----------');
// }

// @LogClass
// class User {
//     @logProperty
//     name: string;
//     age: number;

//     private _email!: string;

//     constructor(name: string, age: number, email: string) {
//         this.name = name;
//         this.age = age;
//         this.email = email;
//     }

//     @logAccessor
//     get email() {
//         return this._email;
//     }

//     set email(val: string) {
//         this._email = val;
//     }

//     @logMethod
//     getInfo(@logParameter condensed: boolean, @logParameter test: string): string {
//         return condensed ? `Person ${this.name}` : `Person ${this.name} is ${this.age} years old with email ${this._email}!`
//     }
// }