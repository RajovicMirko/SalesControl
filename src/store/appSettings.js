import { appSettings } from '../../db/appSettings';

const state = {
    appSettings: {},
};

state.appSettings = appSettings;

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