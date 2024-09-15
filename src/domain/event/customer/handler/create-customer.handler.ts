import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class CreateCustomerHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    private count: number = 0;

    handle(event: CustomerCreatedEvent): void {
        this.count += 1;
        const { id, name, Address } = event.eventData;
        console.log(`Esse é o ${this.count}º console.log do evento: CustomerCreated com os dados: ${id}, ${name}, ${Address.TosString()}`);
    }
}