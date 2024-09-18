import Customer from "../../customer/entity/customer";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerUpdatedEvent from "../../customer/event/customer-update.event";
import CreateCustomerHandler, { EnviaConsoleLog1Handler, EnviaConsoleLog2Handler } from "../../customer/event/handler/create-customer.handler";
import UpdateCustomerHandler from "../../customer/event/handler/update-customer.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
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
        const handler1 = new EnviaConsoleLog1Handler();
        const handler2 = new EnviaConsoleLog2Handler();
        const spyHandler1 = jest.spyOn(handler1, "handle");
        const spyHandler2 = jest.spyOn(handler2, "handle");
    
        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);
    
        const customer = new Customer("123", "Marilia Silva");
        const address = new Address("Street 1", 100, "São Paulo", "SP", "08431410");
        customer.address = address;
        customer.activate();
    
        const customerCreatedEvent = new CustomerCreatedEvent(customer);
    
        eventDispatcher.notify(customerCreatedEvent);
    
        expect(spyHandler1).toHaveBeenCalledTimes(1);
        expect(spyHandler2).toHaveBeenCalledTimes(1);
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