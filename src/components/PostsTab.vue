<template>
  <div class="posts container">
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
    }
  },
  computed: {
    posts() {
      return this.$store.getters['getPosts'];
    }
  },
  methods: {
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
    try  {
      await this.fetchPosts();
      this.loadMoreOnScroll();
    } catch (err) {
      console.log(err);
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
  }
</style>
