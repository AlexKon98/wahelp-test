<template>
  <li class="post__item">
    <div class="post__body">
      <h2 v-if="user.name" class="post__author">{{ user.name }}</h2>
      <a :href="'mailto:' + user.email">{{ user.email }}</a>
      <h3 class="post__title">{{ post.title }}</h3>
      <div class="post__content">{{ post.body }}</div>
    </div>
    <h3 class="post__comments-heading">Comments:</h3>
    <ul v-if="comments.length > 0" class="post__comments">
      <li v-for="comment in comments"
        :key="`${comment.postId}${comment.id}`"
        class="post__comments-item"
      >
        <h4 class="post__comments-name">{{ comment.name }}</h4>
        <div class="post__comments-body">{{ comment.body }}</div>
        <div class="post__comments-email">
          <a :href="'mailto:' + comment.email">{{ comment.email }}</a>
        </div>
      </li>
    </ul>
    <form class="post__comment-form" action="" @submit.prevent="addComment()">
      <h2>Leave a comment:</h2>
      <div class="post__comment-form__wrap">
        <label :for="'name' + user.id">
          <input type="text" :id="'name' + user.id" placeholder="Author name" v-model.trim="commentData.name">
        </label>
        <label :for="'body' + user.id">
          <input type="text" :id="'body' + user.id" placeholder="Comment body" v-model.trim="commentData.body">
        </label>
        <label :for="'email' + user.id">
          <input type="text" :id="'email' + user.id" placeholder="Author email" v-model.trim="commentData.email">
        </label>
      </div>
      <input class="post__comment-form__submit" type="submit" value="Send comment">
    </form>
  </li>
</template>

<script>
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
      commentData: {
        name: '',
        body: '',
        email: ''
      },
      params: null,
    }
  },
  methods: {
    addComment() {
      if (this.commentData.name.length
      &&
      this.commentData.body.length
      && 
      this.commentData.email.length) {
        this.comments.push({
          name: this.commentData.name,
          body: this.commentData.body,
          email: this.commentData.email,
          id: this.comments.length + 1,
          postId: this.comments[0].postId
        });
      }
      this.commentData.name = '';
      this.commentData.body = '';
      this.commentData.email = '';
    }
  },
  async mounted() {
    if (!this.params) {
      this.user = await this.$store.dispatch('fetchUserData', {userId: this.post.userId});
      this.comments = await this.$store.dispatch('fetchUserComments', {id: this.post.id});
    }
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

.post__comments {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin-bottom: 30px;
  &-heading {
    margin-bottom: 10px;
  }
  &-item {
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
  }
  &-email {
    display: flex;
    justify-content: flex-end;
  }
}

.post__comment-form {
  h2 {
    margin-bottom: 15px;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  span {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"] {
    padding: 5px;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
  }

  &__submit {
    display: block;
    width: 100%;
    padding: 10px 0;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>