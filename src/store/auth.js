import { fetchData } from './fetchData';
import { Loading } from 'quasar';
import Cookies from 'js-cookie';
import { SERVERPATH } from '../jsScripts/consts';

const appCookieName = 'epUnPs';

const state = {
    user: {},
    isLogged: false
};

const mutations = {
    setUser(state, user){
        state.user = user;
        state.isLogged = true;
    },

    logout(state){
        state.user = {};
        state.isLogged = false;
    }
};

const actions = {
    login({ commit }, payload){
        //const myUrl = `https://wdb-shtty.run-eu-central1.goorm.io/api/login`;
        const allData = {
            url: SERVERPATH + 'login',
            method: 'post',
            data: payload,
            headers: {
                'content-type': 'application/json',
            }
        };
        
        fetchData(allData, (res) =>{
            commit('setUser', res.data);
            this.$router.push('/');
            Loading.hide();
            Cookies.set(appCookieName, payload);
        });
    },

    register({ commit }, payload){
        //const myUrl = `https://wdb-shtty.run-eu-central1.goorm.io/api/register`;
        const allData = {
            url: SERVERPATH + 'register',
            method: 'post',
            data: payload,
            headers: {
                'content-type': 'application/json',
            }
        };
        
        fetchData(allData, (res) => {
            commit('setUser', res.data);
            this.$router.push('/');
            Loading.hide();
            //Cookies.set(appCookieName, payload);
        });
    },

    logout({ commit }){
        //const myUrl = `https://wdb-shtty.run-eu-central1.goorm.io/api/logout`;
        const allData = {
            url: SERVERPATH + 'logout',
            method: 'get',
            headers: {
                'content-type': 'application/json',
            }
        };
        
        fetchData(allData, () => {
            commit('logout');
            this.$router.push('/login');
            Loading.hide();
            Cookies.remove(appCookieName);
        });
    }
};

const getters = {
    getUser(state){
        return state.user;
    },

    getIsLogged(state){
        return state.isLogged;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};