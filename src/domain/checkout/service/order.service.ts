
import { v4 as uuid } from 'uuid';
import OrderItem from '../entity/orderItem';
import Order from '../entity/order';
import Customer from '../../customer/entity/customer';

export default class OrderService {

    // método que recebe um array de pedidos e retorna o total de todos os pedidos
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    
    static placeOrder(customer: Customer, items: OrderItem[]): Order {

       if(items.length === 0){
           throw new Error("OrderItem are required");
       }

       const order = new Order(uuid(), customer.id, items);
       customer.addRewardPoints(order.total()/2);

       return order;
       
    }
}