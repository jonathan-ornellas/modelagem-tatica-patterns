import Product from "./product";

describe("Product unit tests", () => {  
    it("Should throw error  when id is empty", () => {
        
        expect(() => {
            const product = new Product("", "product 1", 100);
        }).toThrow("Id is required");
    
    });

    it("Should throw error  when name is empty", () => {
        
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrow("Name is required");
    
    });

    it("Should throw error  when price is less than zero", () => {
        
        expect(() => {
            const product = new Product("123", "item", -100);
        }).toThrow("Price must be greater than zero");
    
    });

    it("Should change name", () => {
    
            const product = new Product("123", "Produto 1", 100);
            product.changeName("item 2");
            expect(product.name).toBe("item 2");
    });


    it("Should change price", () => {
    
        const product = new Product("123", "item 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
});
});
    