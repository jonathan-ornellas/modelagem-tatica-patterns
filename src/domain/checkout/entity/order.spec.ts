
import OrderItem from "./orderItem";
import Order from "./order";


describe("Order unit tests", () => {
    
it("Should throw error  when id is empty", () => {
    
    expect(() => {
        let order = new Order("", "123", []);
    }).toThrow("Id is required");

});



it("Should throw error  when customerId is empty", () => {
    
    expect(() => {
        let order = new Order("123", "", []);
    }).toThrow("customerId is required");

});

it("Should throw error  when orderItem is empty", () => {
    
    expect(() => {
        let order = new Order("123", "456", []);
    }).toThrow("orderItem are required");

});

it("Should calculate total", () => {
    
        const item = new OrderItem("123","item 1", "123", 100,1);
        const item2 = new OrderItem("123","item 2", "123", 200,2);
        const order = new Order("123", "456", [item]);
        let total = order.total();

        expect(total).toBe(100);

        const order2 = new Order("123", "456", [item, item2]);
        total = order2.total();

        expect(total).toBe(500);
});


it("Should Throw error if the qte qtd is less or equal zero", () => {
    expect(() => {
        const item = new OrderItem("123","item 1", "123", 100,0);
        const order = new Order("123", "456", [item]);
    }).toThrow("Quantity must be greater than zero");
});

});
