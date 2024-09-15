import { Sequelize } from 'sequelize-typescript';
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from '../../domain/entity/orderItem';

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({  
                product_id: item.productId,
                quantity: item.quantity,
                id: item.id,
                name: item.name,
                price: item.price
            })),
    },
     {
        include: [{model: OrderItemModel}]
     }

    );
}

    async update(entity: Order): Promise<void> {

        try {
            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total(),
            }, {
                where: { id: entity.id },
            });

            await Promise.all(entity.items.map(async (item) => {
                await OrderItemModel.update(
                  {
                    quantity: item.quantity,
                    name: item.name,
                    price: item.price,
                  },
                  {
                    where: { id: item.id, order_id: entity.id },  
                  }
                );
              }));
    
        } catch {
            throw new Error("Error updating order");
        }
    }

    async findAll(): Promise<Order[]> {
       const orderModels = await OrderModel.findAll({ include: ["items"] });
       return orderModels.map(orderModel =>
        new Order(orderModel.id, orderModel.customer_id,
            orderModel.items.map(item => 
           new OrderItem(item.id, 
               item.product_id,
               item.name, 
               item.price, 
               item.quantity))));   
    }

    async findById(id: string): Promise<Order> {
         const orderModel =  await OrderModel.findOne({ where: { id }, include: ["items"] });

         return new Order(orderModel.id, orderModel.customer_id,
             orderModel.items.map(item => 
            new OrderItem(item.id, 
                item.product_id,
                item.name, 
                item.price, 
                item.quantity)));
    }
}