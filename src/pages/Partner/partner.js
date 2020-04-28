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
                label: 'Name',
                rules: [
                    val => !!val
                ]
            },
            {
                id: 'mob',
                name: 'inPut',
                label: 'Phone',
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
                label: 'Is active',
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
                caption: 'Name',
                label: this.name
            },
            {
                type: 'lbl',
                name: 'mob',
                caption: 'Phone',
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
                label: 'Is active',
                leftLabel: true,
                disable: true,
                value: this.active
            }
        ]
    }
}