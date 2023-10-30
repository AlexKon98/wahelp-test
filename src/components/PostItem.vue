<template>
  <li class="post__item">
    <div class="post__body">
      <h2 v-if="user.name" class="post__author">{{ user.name }}</h2>
      <h3 class="post__title">{{ post.title }}</h3>
      <div class="post__content">{{ post.body }}</div>
    </div>
    <ul v-if="comments.length > 0" class="post__comments">
      <li class="post__comment">

      </li>
    </ul>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      user: {},
      comments: [],
    }
  },
  async mounted() {
    this.user = (await axios.get(`https://jsonplaceholder.typicode.com/users?id=${this.post.userId}`)).data[0];
    this.comments = (await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.post.id}`)).data;
  }
}
</script>

<style lang="scss" scoped>
.post__item {
  width: 100%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
}

.post__content {
  margin-bottom: 30px;
}
</style>