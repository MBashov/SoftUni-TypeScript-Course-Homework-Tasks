class Product {
    private static _productCount = 0;
    public readonly id: number;
    public _name!: string;
    public _price!: number;

    constructor(name: string, price: number) {
        Product._productCount++;
        this.id = Product._productCount;
        this.name = name;
        this.price = price;
    }

    public getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
    }

    public static get productCount(): number {
        return Product._productCount;
    }

    get name() {
        return this._name;
    }

    set name(n: string) {
        if (n.length < 1) {
            throw new Error('Name must be at least 1 character long');
        }
        this._name = n;
    }

    get price() {
        return this._price;
    }

    set price(p: number) {
        if (p < 1) {
            throw new Error('Price must be greater than 0');
        }
        this._price = p;
    }
}

class Inventory {
    private products: Product[] = [];

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public listProducts(): string {
        const productDetails = this.products.map(p => p.getDetails()).join('\n');
        return `${productDetails}\nTotal products created: ${Product.productCount}`;
    }

}

const inventory = new Inventory();
const product1 = new Product("Laptop", 1200);
const product2 = new Product("Phone", 800);

inventory.addProduct(product1);
inventory.addProduct(product2);


console.log(inventory.listProducts());