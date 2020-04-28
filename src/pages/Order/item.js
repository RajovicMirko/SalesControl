import { formatDate } from '../../jsScripts/formatDate';

export class Item{
    constructor(item){
        this.id = item.id;
        this.code = item.code;
        this.product = item.product;
        this.quantity = item.quantity;
    }

    getItemDate(){
        return formatDate(this.date);
    }

    getModel(){
        return {
            id: this.id,
            code: this.code,
            product: this.product,
            quantity: this.quantity,
        };
    }

    getFormModel(){
        return [
            {
                id: 'code',
                name: 'inPut',
                disable: true,
                label: 'Šifra',
                value: this.code
            },
            {
                id: 'product',
                name: 'inPut',
                disable: true,
                label: 'Naziv proizvoda',
                value: this.product
            },
            {
                id: 'quantity',
                name: 'inPut',
                label: 'Količina',
                value: this.quantity,
                rules: [
                    val => !!val
                ]
            }
        ];
    }
}