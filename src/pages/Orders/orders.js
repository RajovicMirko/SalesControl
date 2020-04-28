export class Orders{
    constructor(orders){
        this.data = orders;
    }

    getOrders(){
        return this.data;
    }

    getOrderById(){
        return (orderId) => this.data.find(order => order.id === orderId);
    }
}