import Address from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

constructor (id: string , name: string){
    this._id = id;
    this._name = name;
    this.validate();
}

    get name(): string {
        return this._name;
    }   

    get id(): string {
        return this._id;
    }   

    get rewardPoints(): number {  
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    public set address(address: Address){
        this._address = address;
    }

    validate(){ 
        if(this._name.length === 0){
            throw new Error("Name is required");
        }

        if(this._id.length === 0){
            throw new Error("Id is required");
        }

        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        this._address = address;  
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate the customer");
        }
        this._active = true;
    }

    isActivate():boolean{
        return this._active;
    }


    deactivate(){
        this._active = false;
    }


    addRewardPoints(points: number){
        this._rewardPoints += points;
    }
 
}