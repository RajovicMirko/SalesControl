import { notify } from '../jsScripts/notification.js';
import { Partner } from '../pages/Partner/partner';

const state = {
    partner: new Partner(),
    formDisabled: true,
    orders: {}
};

const mutations = {
    setPartner(state, partnerData){
      state.partner.id = partnerData._id;
      state.partner.name = partnerData.name;
      state.partner.mob = partnerData.mob;
      state.partner.email = partnerData.email;
      state.partner.active = partnerData.active;
    },

    setNewPartner(state){
      state.formDisabled = false;
    },

    setPartnerOrders(state, orders){
      state.orders = orders;
    },

    setFormDisabled(state, payload){
      state.formDisabled = payload;
    },

    updatePartner(state, partnerObj){
        Object.keys(partnerObj).forEach(k => state.partner[k] = partnerObj[k]);
    },

    destroyPartner(state){
        state.partner = new Partner(),
        state.formDisabled = true,
        state.orders = {}
    }
};

const actions = {
    setPartner({ commit, dispatch }, partnerId){
      if(partnerId){
        state.partner.init(partnerId)
          .then(partnerData => {
            commit('setPartner', partnerData);
            dispatch('setPartnerOrders')
          });
      } else {
        commit('setNewPartner');
      }
    },

    setPartnerOrders({ commit }){
      state.partner.getOrders()
        .then(orders => {
          commit('setPartnerOrders', orders);
        });
    },

    insertPartner({ commit, dispatch }, newPartner){
      state.partner.insert(newPartner)
        .then(function(newPartnerId) {
          dispatch('setPartner', newPartnerId)
          this.$router.push({
            path: `/partners/partner`,
            query: {
              partnerId: newPartnerId
            }
          })
        }.bind(this));
    },

    updatePartner({ commit }, partnerNewData){
      state.partner.update(partnerNewData)
        .then(partner => {
          commit('setPartner', partner);
        });
    },

    destroyPartner({ commit }){
      commit('destroyPartner');
    },

    insertOrder({ commit }, order){
      console.log('insert order', order)
      notify({
        icon: "edit",
        color: "secondary",
        position: 'center',
        message: `Insert order is under construction`
      });
    },

    deleteOrder({ commit }, order){
      console.log('delete order', order)
      notify({
        icon: "delete",
        color: "warning",
        position: 'center',
        message: `Delete order is under construction`
      });
    },

    insertItem({ commit }, payload){
      console.log('insert item', payload)
      notify({
        icon: "edit",
        color: "secondary",
        position: 'center',
        message: `Insert item is under construction`
      });
    },

    updateItem({ commit }, payload){
      console.log('update item', payload)
      notify({
        icon: "edit",
        color: "secondary",
        position: 'center',
        message: `Update item is under construction`
      });
    },

    deleteItem({ commit }, payload){
      console.log('delete item', payload)
      notify({
        icon: "delete",
        color: "warning",
        position: 'center',
        message: `Delete item is under construction`
      });
    }
};

const getters = {
    getPartner(state){
      console.log(state.partner)
        return state.partner;
    },

    getIsNewPartner(){
      return state.isNewPartner;
    },

    formDisabled(){
      return state.formDisabled;
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