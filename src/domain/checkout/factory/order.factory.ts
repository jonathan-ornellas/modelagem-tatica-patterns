import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

 interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(Props: OrderFactoryProps): Order {

        const items = Props.items.map((item) => {
            return new OrderItem(item.id, item.productId, item.name, item.price, item.quantity);
        });

        return new Order(Props.id, Props.customerId, items);
       
    }
}