<template>
  <header class="header">
    <nav class="header__nav container">
      <ul class="header__list">
        <li class="header__item">
          <button @click.prevent="emitComponent('PostsTab')">
            Posts
          </button>
        </li>
        <li class="header__item">
          <button @click.prevent="emitComponent('UsersTab')">
            Users
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    activeComponent: {
      type: String,
    }
  },
  methods: {
    emitComponent(str) {
      this.$emit('changeTab', str);
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 0;
  border-bottom: 1px solid black;
  &__list {
    display: flex;
    gap: 0 30px;
  }
  &__item button {
    cursor: pointer;
  }
}
</style>