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
    async fetchUsers({ dispatch }, params) {
      
    }
  },
}