import Address from './address';

describe('Address', () => {
    let address: Address;

    beforeEach(() => {
        address = new Address('Main Street', 123, 'City', 'SP', '08431410');
    });

    it('should change the street', () => {
        address.changeStreet('New Street');
        expect(address.street).toBe('New Street');
    });

    it('should change the number', () => {
        address.changeNumber(456);
        expect(address.number).toBe(456);
    });

    it('should change the city', () => {
        address.changeCity('New City');
        expect(address.city).toBe('New City');
    });

    it('should change the state', () => {
        address.changeState('RJ');
        expect(address.state).toBe('RJ');
    });

    it('should change the zip code', () => {
        address.changeZipCode('08431410');
        expect(address.zipCode).toBe('08431410');
    });

    it('should validate the address', () => {
        expect(address.validate()).toBe(true);
    });
});