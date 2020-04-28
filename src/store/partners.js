import { fetchData } from './fetchData';
import { Partner } from '../pages/Partner/partner';
import { SERVERPATH } from '../jsScripts/consts';

const state = {
    partners: []
};

const mutations = {
    setPartners(state, partners){
        state.partners = partners.map(partner => new Partner(partner));
    }
};

const actions = {
    partnersInit({ commit }, queryString){
        let myUrl = SERVERPATH + `partners${queryString ? queryString : ''}`;
        
        const allData = {
            url: myUrl,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            //withCredentials: true
        };
        
        fetchData(allData, (res) => {
            commit('setPartners', res.data);
        });
    }
};

const getters = {
    getPartners(state){
        return state.partners;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};