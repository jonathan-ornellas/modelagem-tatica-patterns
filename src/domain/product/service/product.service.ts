import Product from "../entity/product";


export default class ProductService {

    static increasePrice(product: Product[], percentage: number): Product[] {
        product.forEach((product) => {
            const newPrice = product.price + (product.price * percentage / 100);
            product.changePrice(newPrice);
        });

        return product;
    }   
}