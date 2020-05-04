import { fetchData } from '../../store/fetchData';
import { SERVERPATH } from '../../jsScripts/consts';
import { notify } from '../../jsScripts/notification.js';
import { Loading } from 'quasar';

import { formatPhoneNumber } from '../../jsScripts/formatPhoneNumber';
import { Orders } from '../Orders/orders';
import { Order } from '../Order/order';
import { getInitials } from '../../jsScripts/nameInitials';

export function Partner(partner = {}){
  this.id = partner._id || '';
  this.name = partner.name || '';
  this.mob = partner.mob || '';
  this.email = partner.email || '';
  this.active = partner._id ? partner.active : true;
}

Partner.prototype.init = function(partnerId){
    return new Promise(function(resolve, reject){
      Loading.show();
      const allData = {
        url: SERVERPATH + `partners/${partnerId}`,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      };
    
      fetchData(allData, (res) => {
        Loading.hide();
        resolve(res.data);
      });
    });
}

Partner.prototype.insert = function(newPartner){
  return new Promise(function(resolve, reject){
    Loading.show();
    const allData = {
        url: SERVERPATH + `partners`,
        method: 'POST',
        data: newPartner,
        headers: { 'content-type': 'application/json' },
    };
    
    fetchData(allData, (res) => {
      notify({
          icon: "edit",
          color: "secondary",
          position: 'bottom',
          message: `Uspešno ste uneli partnera ${res.data.name}`
      });
      Loading.hide();
      resolve(res.data._id);
    });
  });
}

Partner.prototype.update = function(partner){
  return new Promise(function(resolve, reject){
    Loading.show();
    const allData = {
      url: SERVERPATH + `partners/${this.id}`,
      method: 'PUT',
      data: partner,
      headers: { 'content-type': 'application/json' },
    };

    fetchData(allData, (res) => {
      notify({
        icon: "edit",
        color: "secondary",
        position: 'bottom',
        message: `Uspešno ste ažurirali partnera ${res.data.name}`
      });
      Loading.hide();
      resolve(res.data);
    });
  }.bind(this));
}

Partner.prototype.getOrders = function(){
  return new Promise(function(resolve, reject){
    const allData = {
        url: SERVERPATH + `orders/${this.id}`,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    };

    fetchData(allData, (res) => {
      const partnerOrders = new Orders(res.data.orders.map(order => new Order(order)));
      resolve(partnerOrders);
    });
  }.bind(this));
}

Partner.prototype.getModel = function(){
    return {
        name: this.name,
        mob: this.mob,
        email: this.email,
        active: this.active
    };
}


Partner.prototype.getFormModel = function(){
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
          //leftLabel: true
      }
  ];
}

Partner.prototype.getListModel = function(){
  return [
      {
          type: 'avatarInitials',
          name: 'initials',
          value: this.name ? getInitials(this.name) : ''
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
          side: true,
          value: this.active,
      }
  ]
}