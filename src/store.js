import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    cards: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCards(state, cards) {
      state.cards = cards;
    }
  },
  actions: {
    async getCards(context) {
      try {
        await axios
      
      } catch (error) {

      }
    }
  }
})
