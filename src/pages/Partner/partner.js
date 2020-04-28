import { formatPhoneNumber } from '../../jsScripts/formatPhoneNumber';
import { getInitials } from '../../jsScripts/nameInitials';

export class Partner{
    constructor(partner){
        if (partner) {
            this.id = partner._id;
            this.name = partner.name;
            this.mob = partner.mob;
            this.email = partner.email;
            this.active = partner.active;
            this.initials = getInitials(partner.name);
        } else {
            this.id = '';
            this.name = '';
            this.mob = '';
            this.email = '';
            this.active = true;
            this.initials = getInitials(this.name);
        }
    }

    getModel(){
        return {
            name: this.name,
            mob: this.mob,
            email: this.email,
            active: this.active
        };
    }

    getFormModel(){
        return [
            {
                id: 'name',
                name: 'inPut',
                label: 'Naziv partnera',
                rules: [
                    val => !!val
                ]
            },
            {
                id: 'mob',
                name: 'inPut',
                label: 'Mobilni telefon',
                rules: [
                    val => !!val
                ]
            },
            {
                id: 'email',
                name: 'inPut',
                label: 'Email'
            },
            {
                id: 'active',
                name: 'check',
                label: 'Aktivan partner',
                leftLabel: true
            }
        ];
    }

    getListModel(){
        return [
            {
                type: 'avatarInitials',
                name: 'initials',
                value: this.initials
            },
            {
                type: 'lbl',
                name: 'name',
                caption: 'Naziv partnera',
                label: this.name
            },
            {
                type: 'lbl',
                name: 'mob',
                caption: 'Broj telefona',
                label: this.mob ? formatPhoneNumber(this.mob, 'default') : '',
                class: 'big'
            },
            {
                type: 'lbl',
                name: 'email',
                caption: 'Email',
                label: this.email,
                class: 'big'
            },
            {
                type: 'check',
                name: 'active',
                label: 'Aktivan',
                leftLabel: true,
                disable: true,
                value: this.active
            }
        ]
    }
}