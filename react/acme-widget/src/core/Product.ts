interface IProduct {
    productName: string;
    productCode: string;
    productPrice: number;
}


export class Product implements IProduct {
    public readonly productName: string;
    public readonly productCode: string;
    public readonly productPrice: number;

    public constructor(productName: string, productCode: string, productPrice: number) {
        this.productName = productName;
        this.productCode = productCode;
        this.productPrice = productPrice;
    }
}



