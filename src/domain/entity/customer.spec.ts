import Address from "./address";
import Customer from "./customer";
import { v4 as uuid } from 'uuid';

describe("Customer unit tests", () => {
    
it("Should throw error  when id is empty", () => {
    
    expect(() => {
        let customer = new Customer("", "John Doe");
    }).toThrow("Id is required");

});

it("Should throw error  when name is empty", () => {
    
    expect(() => {
        let customer = new Customer("123", "");
    }).toThrow("Name is required");

});

it("Should change name", () => {
    
    const customer = new Customer("123", "John Doe");
    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
});

it("Should activate Customer", () => {
    
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 100, "São Paulo ", "SP", "08431410");
    customer.address = address;

    customer.activate();

    expect(customer.isActivate()).toBe(true);
});


it("Should throw error when address is undefined when you activate a customer", () => {
    expect(() => {

        const customer = new Customer("123", "John Doe");
        customer.activate();
    }).toThrow("Address is mandatory to activate the customer");
  
});

it("Should deactivate Customer", () => {
    
    const customer = new Customer("123", "John Doe");

    customer.deactivate();

    expect(customer.isActivate()).toBe(false);
});

it("should add reward points", () => {
    const customer = new Customer(uuid(), "John Doe");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10); 
    expect(customer.rewardPoints).toBe(20);
});

});