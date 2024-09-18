import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';
describe("Order factory unit tests", () => {
    it("Should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    productId: uuid(),
                    name: "Product 1",
                    price: 100,
                    quantity: 1
                }
            ]
       
        };  

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
}   );