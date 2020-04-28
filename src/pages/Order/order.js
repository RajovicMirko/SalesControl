import { formatDate } from '../../jsScripts/formatDate';
import { Item } from './item';

export class Order{
    constructor(order){
        this.id = order.id;
        this.date = order.date;
        this.items = order.items.map(item => new Item(item));
    }

    getOrderDate(){
        return formatDate(this.date);
    }

    getModel(){
        return {
            id: this.id,
            date: this.date,
            items: this.items
        };
    }
    
    getListModel(){
        return [
            {
                type: 'avatarInitials',
                value: this.id,
            },
            {
                type: 'lbl',
                label: `Porudžbina na dan ${this.getOrderDate()}`
            }
        ];
    }

    getOrderDataForTable(){
        return {
            order: this,
            rowKey: "code"
        };
    }
}