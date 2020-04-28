import { fetchData } from './fetchData';
import { notify } from '../jsScripts/notification.js';
import { Loading } from 'quasar';
import { SERVERPATH } from '../jsScripts/consts';

import { Partner } from '../pages/Partner/partner';

import { OrdersDb } from '../../db/orders';
import { ProductsDb } from '../../db/products';

import { Orders } from '../pages/Orders/orders';
import { Order } from '../pages/Order/order';

const state = {
    partner: {},
    orders: {}
};

const mutations = {
    setPartner(state, partner){
        state.partner = new Partner(partner);
    },

    updatePartner(state, partnerObj){
        Object.keys(partnerObj).forEach(k => {
            state.partner[k] = partnerObj[k];
        });
    },

    destroyPartner(state){
        state.partner = {},
        state.orders = {}
    }
};

const actions = {
    setPartner({ commit }, partnerId){
        Loading.show();
        //const myUrl = `https://wdb-shtty.run-eu-central1.goorm.io/api/partners/${partnerId}`;
        const allData = {
            url: SERVERPATH + `partners/${partnerId}`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            //withCredentials: true
        };

        fetchData(allData, (res) => {
            commit('setPartner', res.data);
            Loading.hide();
        });
    },

    updatePartner({ commit, dispatch }, partnerObj){
        Loading.show();
        const partnerId = state.partner.id;
        //const myUrl = `https://wdb-shtty.run-eu-central1.goorm.io/api/partners/${partnerId}`;
        const allData = {
            url: SERVERPATH + `partners/${partnerId}`,
            method: 'PUT',
            data: partnerObj,
            headers: {
                'content-type': 'application/json',
            },
            //withCredentials: true
        };
        
        fetchData(allData, (res) => {
            commit('setPartner', res.data);

            notify({
                icon: "edit",
                color: "secondary",
                position: 'bottom',
                message: `Uspešno ste ažurirali partnera ${partnerObj.name}`
            });
            Loading.hide();
        });
    },

    destroyPartner({ commit }){
        commit('destroyPartner');
    }
};

const getters = {
    getPartner(state){
        return state.partner;
    },

    getOrders(state){
        return state.orders.getOrders();
    },

    getOrderById(state){
        return state.orders.getOrderById();
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};