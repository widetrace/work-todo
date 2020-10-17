<template>
  <div id="app">
    <router-view/>
    <vue-confirm-dialog />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['confirm'])
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

h1 {
  margin-top: 0;
}

p {
  font-size: 1em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: #2c3e50;
  min-height: 100vh;
  max-width: 100vw;
}

.router-link-active {
  color: black;
}
</style>
