function checkEvenSum(a: number, b: number, c: number): boolean {
    const sum = a + b + c;

    return sum % 2 === 0;
}

console.log(checkEvenSum(1, 2, 3));
console.log(checkEvenSum(2, 3, 4));
