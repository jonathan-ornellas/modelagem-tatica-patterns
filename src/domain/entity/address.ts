export default class Address {
    private _street: string = "";
    private _number: number = 0;
    private _city: string = "";
    private _state: string = "";
    private _zipCode: string = "";

    constructor(street: string, number: number, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;

        this.validate();
    }

    validate(){
        if(this._street.length ===0){
            throw new Error("Street is required");
        }
        if(this._number ===0){
            throw new Error("Number is required");
        }
        if(this._city.length ===0){
            throw new Error("City is required");
        }
        if(this._state.length ===0){
            throw new Error("State is required");
        }
        if(this._zipCode.length ===0){
            throw new Error("ZipCode is required");
        }
        if(this._zipCode.length !== 8){
            throw new Error("ZipCode must have 8 digits");
        }
        if(this._number < 0){
            throw new Error("Number must be greater than zero");
        }
        if(this._state.length !== 2){
            throw new Error("State must have 2 digits");
        }

        return true;
    }

    changeStreet(street: string){
        this._street = street;
        this.validate();
    }

    changeNumber(number: number){
        this._number = number;
        this.validate();
    }   
    changeCity(city: string){   
        this._city = city;
        this.validate();
    }

    changeState(state: string){
        this._state = state;
        this.validate();
    }   

    changeZipCode(zipCode: string){
        this._zipCode = zipCode;
        this.validate();
    }       

    get street(){
        return this._street;
    }

    get number(){
        return this._number;
    }

    get city(){
        return this._city;
    }
    get state(){
        return this._state;
    }

    get zipCode(){
        return this._zipCode;
    }


    TosString(){
        return `${this._street}, ${this._number} - ${this._city}/${this._state}`;
    }
}
