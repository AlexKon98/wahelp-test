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
    clearPosts(state) {
      state.posts = [];
    },
    changePosts(state, posts) {
      state.posts = state.posts.concat(posts);
    }
  },
  actions: {
    async fetchPosts({ commit }, start) {
      let res = (await axios.get(API_BASE_URL + `/posts?_start=${start}&_limit=20`)).data;
      if (res.length > 0) commit('changePosts', res);
      return res.length;
    },
    async fetchUserData(state, params) {
      return (await axios.get(`https://jsonplaceholder.typicode.com/users?id=${params.userId}`)).data[0];
    },
    async fetchUserComments(state, params) {
      return (await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${params.id}`)).data;
    },
    async fetchUserPost({ commit }, params) {
      let res = (await axios.get(API_BASE_URL + `/posts?userId=${params.id}`)).data;
      if (res.length > 0) commit('changePosts', res);
    }
  },
}