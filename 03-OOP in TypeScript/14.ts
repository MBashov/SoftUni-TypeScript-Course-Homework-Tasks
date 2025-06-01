class Calculator {

    public calculate(operation: 'power' | 'log', num1: number, num2: number): number;
    public calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', num1: number, num2: number, num3?: number, num4?: number): number;

    public calculate(operation: 'power' | 'log' | 'add' | 'subtract' | 'multiply' | 'divide',
        num1: number,
        num2: number,
        num3?: number,
        num4?: number): number {

        const validNums = [num1, num2, num3, num4].filter(num => num !== undefined);

        switch (operation) {
            case "power":
                return num1 ** num2;

            case "log":
                if (num1 <= 0 || num2 <= 0) {
                    throw new Error('Invalid log values');
                }
                return Math.log(num1) / Math.log(num2);

            case "add":
                return validNums.reduce((acc, val) => acc + val);

            case "subtract":
                return validNums.reduce((acc, val) => acc - val);

            case "multiply":
                return validNums.reduce((acc, val) => acc * val);

            case "divide":
                return validNums.reduce((acc, val) => acc / val);
        }
    }

}

const calc = new Calculator();

console.log(calc.calculate('power', 2, 3));
console.log(calc.calculate('power', 4, 1/2));
console.log(calc.calculate('log', 8, 2));
console.log(calc.calculate('add', 10, 5));
console.log(calc.calculate('add', 10, 5, 3));
console.log(calc.calculate('subtract', 10, 5));
console.log(calc.calculate('multiply', 2, 3, 4));
console.log(calc.calculate('divide', 100, 5, 2, 2));

// const calc = new Calculator();
// console.log(calc.calculate('power', 2, 3, 2));
// console.log(calc.calculate('add', 2));
// console.log(calc.calculate('log', 2, 3, 4, 5)); 
// console.log(calc.calculate('multiply', 2, 3, 4, 5, 6));

