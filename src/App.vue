<template>
  <div id="app">
    <router-view/>
    <window-confirm v-if="confirm" />
  </div>
</template>

<script>
import WindowConfirm from '@/components/WindowConfirm.vue'

export default {
  components: {
    WindowConfirm,
  },
  data() {
    return {
      confirm: false,
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
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
  overflow-x: scroll;
  padding-right: 10vw;
  padding-left: 10vw;
}
</style>
