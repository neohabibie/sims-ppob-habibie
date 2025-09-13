import Vue from 'vue';
import Vuex from 'vuex';
import api from './services/api';

Vue.use(Vuex);

const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('his_token') || null,
    user: JSON.parse(localStorage.getItem('his_user') || 'null')
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) localStorage.setItem('his_token', token);
      else localStorage.removeItem('his_token');
    },

    setUser(state, user) {
      state.user = user;
      if (user) localStorage.setItem('his_user', JSON.stringify(user));
      else localStorage.removeItem('his_user');
    }
  },

  actions: {
    async login({commit}, payload) {
      const res = await api.post('/login', payload);
      const {data} = res;

      if (data && data.token) {
        commit('setToken', data.token);
        commit('setUser', data.user || null);
      }
      return data;
    },

    logout({commit}) {
      commit('setToken', null);
      commit('setUser', null);
    }
  },
  getters: {
    isLoggedIn: s => !!s.token
  }
};

export default new Vuex.Store({
  modules: { 
    auth: authModule 
  },

  state: { 
    balance: 0 
  },

  mutations: {
    setBalance(state, amount) { state.balance = amount; }
  },
  
  actions: {
    async fetchBalance({commit}) {
      const res = await api.get('/balance');
      if (res.data && res.data.balance !== undefined) {
        commit('setBalance', res.data.balance);
      }
    }
  }
});