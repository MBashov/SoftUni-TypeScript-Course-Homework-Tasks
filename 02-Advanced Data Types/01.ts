function multyplier(param1?: string | number, param2?: string | number, param3?: string | number) {

    const num1 = param1 !== undefined ? Number(param1) : 1
    const num2 = param2 !== undefined ? Number(param2) : 1
    const num3 = param3 !== undefined ? Number(param3) : 1

    return num1 * num2 * num3;

}

console.log(multyplier('3', 5, '10'));
console.log(multyplier('30', 5, '10'));
console.log(multyplier('2','2'));
console.log(multyplier(undefined, 2, 3));
console.log(multyplier(7, undefined, '2'));
console.log(multyplier());