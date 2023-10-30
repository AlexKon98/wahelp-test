<template>
  <div>
    <Header @changeTab="changeTab" />
    <main class="main">
      <KeepAlive>
        <component :is="activeComponent" />
      </KeepAlive>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import PostsTab from '@/components/PostsTab.vue';
import UsersTab from '@/components/UsersTab.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      activeComponent: 'PostsTab',
    }
  },
  components: {
    PostsTab,
    UsersTab,
    Header
  },
  methods: {
    changeTab(str) {
      this.activeComponent = str;
    }
  }
}
</script>
