import axios from "axios";
import settings from "@/settings";

const API_BASE_URL = settings.API_BASE_URL;

export default {
  state: {
    posts: [],
  },
  getters: {
    getPosts: s => s.posts,
  },
  mutations: {
    changePosts(state, posts) {
      state.posts = state.posts.concat(posts);
    }
  },
  actions: {
    async fetchPosts({ commit }, start) {
      let res = (await axios.get(API_BASE_URL + `/posts?_start=${start}&_limit=20`)).data;
      if (res.length > 0) commit('changePosts', res);
      return res.length;
    }
  },
}