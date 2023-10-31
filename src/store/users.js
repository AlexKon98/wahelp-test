import axios from "axios";
import settings from "@/settings";

const API_BASE_URL = settings.API_BASE_URL;

export default {
  state: {
    users: [],
  },
  getters: {
    getUsers: s => s.users,
  },
  mutations: {
    changeUsers(state, users) {
      state.users = state.users.concat(users);
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      let res = (await axios.get(API_BASE_URL + '/users')).data;
      commit('changeUsers', res);
    }
  },
}