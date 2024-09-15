
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order service unit test", () => {

    it("should place an order", () => {
        const customer = new  Customer("c1", "Customer 1");
        const item = new OrderItem("i1", "p1", "Item 1", 100, 30);

        const order =  OrderService.placeOrder(customer, [item]);

        expect(customer.rewardPoints).toBe(1500);
        expect(order.total()).toBe(3000);
     
    });

    it("Should get total of all orders", () => {

       const item1 = new OrderItem("i1", "p1", "Item 1", 100, 30);
       const item2 = new OrderItem("i2", "p2", "Item 2", 200, 20);

       const order = new Order("o1", "c1", [item1]);
       const order2 = new Order("o2", "c2", [item1, item2]);

       const total = OrderService.total([order, order2]);

       expect(total).toBe(10000);

    });


});