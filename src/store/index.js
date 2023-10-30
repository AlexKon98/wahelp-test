import { createStore } from 'vuex';
import users from './users';
import posts from './posts';

export default createStore({
  modules: {
    users,
    posts
  }
})
