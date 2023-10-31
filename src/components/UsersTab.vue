<template>
  <div class="users container">
    <ul class="users__list" v-if="users.length > 0">
      <li class="users__item" v-for="user in users" :key="user.id">
        <h2>Username: {{ user.name }}</h2>
        <h3>
          name: {{ user.name }}
        </h3>
        <a :href="'mailto:' + user.email">{{ user.email }}</a>
        <div class="users__button-wrap">
          <button @click="showUserPosts(user)">Посмотреть посты пользователя</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UsersTab',
  computed: {
    users() {
      return this.$store.getters['getUsers'];
    }
  },
  methods: {
    showUserPosts(user) {
      this.$mitt.emit('showUserPosts', {name: 'PostsTab', user: user});
    }
  },
  async mounted() {
    this.$store.commit('changeUsers', []);
    try {
      await this.$store.dispatch('fetchUsers');
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.users {
  margin-top: 30px;
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  &__item {
    width: calc((100% / 3) - 30px);
    padding: 15px;
    border: 1px solid black;
    border-radius: 10px;
  }
  &__button-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      cursor: pointer;
    }
  }
}

@media (max-width: 1200px) {
  .users__item {
    width: calc((100% / 2) - 30px);
  }
}

@media (max-width: 900px) {
  .users__item {
    width: 100%;
  }
}
</style>
