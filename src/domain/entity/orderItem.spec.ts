import OrderItem from "./orderItem";

describe("OrderItem unit tests", () => {
    it("Should throw error  when id is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("", "123", "item 1", 100, 1);
        }).toThrow("Id is required");
    });
    it("Should throw error  when id is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("", "123", "item 1", 100, 1);
        }).toThrow("Id is required");
    });

    it("Should throw error  when productId is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "", "item 1", 100, 1);
        }).toThrow("productId is required");
    });

    it("Should throw error  when name is empty", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "123", "", 100, 1);
        }).toThrow("Name is required");
    });

    it("Should throw error  when price is less than zero", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "123", "item 1", -100, 1);
        }).toThrow("Price must be greater than zero");
    });

    it("Should throw error  when quantity is less or equal zero", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "123", "item 1", 100, 0);
        }).toThrow("Quantity must be greater than zero");
    });

    it("Should calculate total", () => {
        const orderItem = new OrderItem("123", "123", "item 1", 100, 1);
        const total = orderItem.orderItemTotal();
        expect(total).toBe(100);
    });

    it("Should change quantity", () => {
        const orderItem = new OrderItem("123", "123", "item 1", 100, 1);
        orderItem.changeQuantity(2);
        expect(orderItem.quantity).toBe(2);
    });

    it("Should throw error  when quantity is less or equal zero", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "123", "item 1", 100, 1);
            orderItem.changeQuantity(0);
        }).toThrow("Quantity must be greater than zero");
    });

});
