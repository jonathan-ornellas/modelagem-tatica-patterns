import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerUpdatedEvent from "../customer-update.event";

export default class UpdateCustomerHandler implements EventHandlerInterface {
    handle(event: CustomerUpdatedEvent): void {
        const { id, name, Address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${Address.TosString()}`); 
    }
}
