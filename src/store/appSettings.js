//import { appSettings } from '../../db/appSettings';

const state = {
    appSettings: {
        idPrefixNumeric: '00000',
        idPrefixText: ''
    }
};

const mutations = {};
const actions = {};

const getters = {
    getAppSettings(state){
        return state.appSettings;
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};