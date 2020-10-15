<template lang="pug">
  .window(@keyup.enter="test", tabindex="0")
    .window-box
      h2 {{ confirm.name }}
      span.btn(@click="approveAction") Yes
      span.btn(@click="closeWindow") No
</template>

<script>
import { mapState } from 'vuex' 

export default {
  computed: {
    ...mapState(['confirm'])
  },
  methods: {
    closeWindow() {
      this.$store.commit('CALL_CONFIRM', {
        name: '',
        disabled: true,
      })
    },
    test() {
      console.log('123')
    },
    approveAction() {
      this.$store.dispatch('callConfirmedAction')
    },
    handler(e) {
      if (e.keyCode === 27) {
        this.closeWindow()
      }
    }
  },
  mounted() {
    window.scrollTo(0,0);
    window.addEventListener('keyup', this.handler)
  },
  destroyed() {
    window.removeEventListener('keyup', this.handler)
  }
};
</script>

<style lang="scss" scopped>
.window {
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  &-box {
    margin-top: 15vh;
    background-color: blanchedalmond;
    padding: 35px;
    border-radius: 5px;
  }
}

.btn {
  font-size: 15px;
}
</style>