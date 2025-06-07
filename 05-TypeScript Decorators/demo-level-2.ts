// function FreezeClass(constructor: Function) {
//     console.log('Freeze applied!');
//     console.log('-----------');

//     Object.freeze(constructor);
//     Object.freeze(constructor.prototype);
// }

// function ValidateStringAccessor(target: any, propertyName: string, descriptor: PropertyDescriptor) {
//     const originalSetter = descriptor.set;

//     descriptor.set = function (val: string) {
//         if (val.length < 3) {
//             throw new Error('Length must be minimum 3 characters!');
//         }

//         originalSetter?.call(this, val);
//     }

//     return descriptor;
// }

// function DepricatedMethod(message: string) {

//     return function (target: any, methodName: string, descriptor: PropertyDescriptor) {

//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             console.log(`⚠️ Caution ${message}`);

//             return originalMethod.apply(this, args);
//         }

//         return descriptor;
//     }

// }

// @FreezeClass
// class User {
//     name: string;
//     age: number;

//     private _email!: string;

//     constructor(name: string, age: number, email: string) {
//         this.name = name;
//         this.age = age;
//         this.email = email;
//     }

//     @ValidateStringAccessor
//     get email() {
//         return this._email;
//     }

//     set email(val: string) {
//         this._email = val;
//     }

//     @DepricatedMethod('Method is depricated!')
//     getInfo(condensed: boolean): string {
//         return condensed ? `Person ${this.name}` : `Person ${this.name} is ${this.age} years old with email ${this._email}!`
//     }
// }

// const user = new User('Pesho', 22, 'pesho@abv.bg');
// console.log(user.getInfo(false));