<template>
  <div class="posts container">
    <div class="posts__user" v-if="filtered">
      <h2>Посты пользователя: {{ user.name }}</h2>
      <button @click="clearFilter">Очистить фильтр</button>
    </div>
    <ul class="posts__list">
      <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
      />
    </ul>
    <div class="posts__obs" ref="obs"></div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'PostsTab',
  components: {
    PostItem
  },
  data() {
    return {
      start: 0,
      intersectionObserverObj: null,
      user: null,
      filtered: false,
    }
  },
  watch: {
    user: {
      async handler(v) {
        if (v) {
          this.filtered = true;
          this.intersectionObserverObj?.disconnect();
          this.$store.commit('clearPosts');
          this.$store.dispatch('fetchUserPost', v);
        }
      }, 
      deep: true,
    }
  },
  computed: {
    posts() {
      return this.$store.getters['getPosts'];
    }
  },
  methods: {
    async clearFilter() {
      this.filtered = false;
      this.start = 0;
      this.$store.commit('clearPosts');
      try  {
        await this.fetchPosts();
        this.loadMoreOnScroll();
      } catch (err) {
        console.log(err);
      }
    },
    async fetchPosts() {
      let res = await this.$store.dispatch('fetchPosts', this.start);
      this.start = this.start + 20;
      if (res === 0) {
        this.intersectionObserverObj?.disconnect();
      }
    },
    loadMoreOnScroll() {
      this.$nextTick(() => {
        this.intersectionObserverObj = new IntersectionObserver(([entry]) => {
          if (entry.intersectionRect.y > 0) {
            this.fetchPosts();
          }
        }, {
          rootMargin: "0px"
        });
        this.intersectionObserverObj.observe(this.$refs.obs);
      });
    },
  },
  async mounted() {
    this.$store.commit('clearPosts');
    this.$mitt.on('showUserPosts', (params) => this.user = params.user);
    if (!this.user) {
      try  {
        await this.fetchPosts();
        this.loadMoreOnScroll();
      } catch (err) {
        console.log(err);
      }
    }
  },
  destroyed() {
    this.intersectionObserverObj?.disconnect();
  },
}
</script>

<style lang="scss" scoped>
  .posts {
    margin-top: 30px;
    &__list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      gap: 30px;
    }
    &__obs {
      margin-bottom: 10px;
      height: 20px;
    }
    &__user {
      margin-bottom: 30px;
    }
  }
</style>
