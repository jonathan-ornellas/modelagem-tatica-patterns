import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it("Should create a product type a", () => {
        const product = ProductFactory.create("a","Product A", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    });


    it("Should create a product type b", () => {
        const product = ProductFactory.create("b","Product B", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(200);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("Should throw an error when product type is invalid", () => {
        expect(() => {
            ProductFactory.create("c","Product C", 100);
        }).toThrow("Invalid product type");
    });
});