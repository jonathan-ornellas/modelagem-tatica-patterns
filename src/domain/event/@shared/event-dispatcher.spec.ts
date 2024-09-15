import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerUpdatedEvent from "../customer/customer-update.event";
import CreateCustomerHandler from "../customer/handler/create-customer.handler";
import UpdateCustomerHandler from "../customer/handler/update-customer.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
    it("Should register an event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"] [0]).toMatchObject(eventHandler);
    });

    it("Should unregister an event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"] [0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("Should unregister all event handlers", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"] [0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("Should notify event handlers", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"] [0]).toMatchObject(eventHandler);

        const productCreateEvent = new ProductCreatedEvent({
            name: "Product 1",
            price: 100
        });

        // Quando o notify for executado o sendEmailWhenProductIsCreatedHandler.handle será chamado  
        eventDispatcher.notify(productCreateEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        
    });
    
    it("Should notify create customer event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateCustomerHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"] [0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        const customer = new Customer("123", "Marilia Silva");
        const address = new Address("Street 1", 100, "São Paulo", "SP", "08431410");
        customer.address = address;
        customer.activate();


        const customer2 = new Customer("321", "Gustavo Mendes");
        const address2 = new Address("Street 2", 200, "São Paulo", "SP", "03331422");
        customer2.address = address2;
        customer2.activate();

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        const customerCreatedEvent2 = new CustomerCreatedEvent(customer2);


        // Quando o notify for executado o createCustomerHandler.handle será chamado  
        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent2);


        expect(spyEventHandler).toHaveBeenCalledTimes(2);
        
    });

    it("Should notify update customer event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerCreate = new CreateCustomerHandler();
        const eventHandlerUpdate = new UpdateCustomerHandler();
        const spyEventHandlerCreate = jest.spyOn(eventHandlerCreate, "handle");
        const spyEventHandlerUpdate = jest.spyOn(eventHandlerUpdate, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCreate);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"] [0]).toMatchObject(eventHandlerCreate);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        const customer = new Customer("123", "Jonathan Ornellas");
        const address = new Address("Street 1", 100, "São Paulo", "SP", "08431410");
        customer.address = address;
        customer.activate();   

        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandlerCreate).toHaveBeenCalledTimes(1);

        eventDispatcher.register("CustomerUpdatedEvent", eventHandlerUpdate);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"] [0]).toMatchObject(eventHandlerUpdate);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);

        const address2 = new Address("Street 2", 200, "Rio de Janeiro", "RJ", "03331422");
        customer.changeAddress(address2);

        eventDispatcher.notify(new CustomerUpdatedEvent(customer));

        expect(spyEventHandlerUpdate).toHaveBeenCalledTimes(1);

    });
});