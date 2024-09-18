import OrderItem from "./orderItem";


export default class Order {

 private _id: string;
 private _customerId: string;
 private _items: OrderItem[];
 private _total: number;

 constructor(id: string, customerId: string, items: OrderItem[]){
     this._id = id;
     this._customerId = customerId;
     this._items = items;
     this._total = this.total();
     this.validate();
 }
 

    get items(): OrderItem[] {
        return this._items;
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

 validate(): boolean {
     if (this._id.length === 0) {
         throw new Error("Id is required"); 
    }
    if(this._customerId.length === 0){
        throw new Error("customerId is required");
    }

    if(this._items.length === 0){
        throw new Error("orderItem are required");
    }

    // verifica se a quantidade de cada item é maior que zero
    if(this._items.some(item => item.quantity <= 0)){
        throw new Error("Quantity must be greater than zero"); 
    }

    return true;
}

 // para calcular o total do pedido, é necessário somar o total de cada item
  total(): number{
      return  this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}