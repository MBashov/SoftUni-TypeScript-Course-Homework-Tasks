class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    };

    withdraw(amount: number): void {
        if (amount > this.balance) {
            return;
        }
        this.balance -= amount;
    };
    getBalance(): number {
        return this.balance;
    }
}

// const account = new BankAccount(100);
// account.deposit(50);
// account.withdraw(30);
// console.log(account.getBalance());

const account = new BankAccount(80);
account.withdraw(30);
console.log(account.getBalance());