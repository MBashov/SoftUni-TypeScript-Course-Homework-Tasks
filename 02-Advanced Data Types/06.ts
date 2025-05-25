const names = { 
    fName: 'John', 
    lName: 'Doe', 
    age: 22, 
    getPersonInfo() { return`${this.fName} ${this.lName}, age ${this.age}` } 
};

const address = { 
    city:'Boston', street: 'Nowhere street', 
    number: 13, postalCode: 51225, 
    getAddressInfo() { return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`} 
};

type namesType = typeof names;
type addressType = typeof address;

function createCombinedFunction(names: namesType, address: addressType) {
    return function(combineObject: namesType & addressType) {
        console.log(`Hello, ${combineObject.getPersonInfo()} from ${combineObject.getAddressInfo()}`);
    }
}

const combinedFunction = createCombinedFunction(names, address); 
const combinedPerson = Object.assign({}, names, address); 
combinedFunction(combinedPerson);