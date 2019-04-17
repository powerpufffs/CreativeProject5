import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    cards: [],
    games: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCards(state, cards) {
      state.cards = cards;
    },
    setScores(state, scores) {
      state.scores = scores;
    },
    setGames(state, games) {
      state.games = games;
    },
  },
  actions: {
    async getCards(context) {
      try {
        let response = await axios.get("/api/cards");
        context.commit('setCards', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async finishGame(context, data) {
      try {
        let response = await axios.post("/api/games", data);
        console.log(response);
      } catch(error) {
        return error.response.data.message;
      }
    },
    async getGames(context, data) {
      try {
        let response = await axios.get("/api/games", data);
        context.commit('setGames', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    }
  }
})
