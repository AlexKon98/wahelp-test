<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {
  font-family: Georgia, 'Times New Roman', Times, sans-serif;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
}

input {
  outline: none;
  &:focus,
  &:active,
  &:focus-within, 
  &:focus-visible {
    outline: none;
  }
}

.container {
  width: 100%;
  max-width: 1920px;
  padding: 0 15px;
  margin: 0 auto;
  display: block;
}
</style>
