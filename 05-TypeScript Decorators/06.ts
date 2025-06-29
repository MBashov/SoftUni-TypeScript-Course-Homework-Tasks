function validateName(minLength: number) {
    return function(target: any, propName: string, descriptor: PropertyDescriptor) {

        const originallSetter = descriptor.set;

        descriptor.set = function(val: string) {
            if (val.length < minLength) {
                throw new Error(`name must have a min length of ${minLength} characters`);
            }

            originallSetter?.call(this, val);
        }

        return descriptor;
    }
}

function validaAge(min: number, max: number) {
    return function(target: any, propName: string, descriptor: PropertyDescriptor) {

        const originallSetter = descriptor.set;
        
        descriptor.set = function(val: number) {
            if (val < min || val > max) {
                throw new Error(`age must be between ${min} and ${max}`);
            }

            originallSetter?.call(this, val);
        }

        return descriptor
    }
}

function validatePassword(pattern: RegExp) {
    return function(target: any, propName: string, descriptor: PropertyDescriptor) {
        const originallSetter = descriptor.set;
        
        descriptor.set = function(val: string) {
            if (!val.match(pattern)) {
                throw new Error(`password needs to match ${pattern}`);
            }

            originallSetter?.call(this, val);
        }

        return descriptor;
    }
}


class User {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor(name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @validateName(1)
    set name(val: string) { this._name = val; }
    
    @validaAge(1, 150)
    set age(val: number) { this._age = val; }

    @validatePassword(/^[a-zA-Z0-9!@]+$/g)
    set password(val: string) { this._password = val; }

    get name() { return this._name; }
    get age() { return this._age; }
}

let user = new User('John', 160, 'hardPassword12');

let user2 = new User('John', 30, '!test');

let user3 = new User('John', 25, '@werty');

let user4 = new User('Jo', 20, 'password123');