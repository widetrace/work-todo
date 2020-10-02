<template lang="pug">
  .window
    .window-box
      h2 {{ confirm.name }}
      span.btn(@click="closeWindow") No
      span.btn(@click="approveAction") Yes
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
    approveAction() {
      this.$store.dispatch('callConfirmedAction')
    }
  }
};
</script>

<style lang="scss" scopped>
.window {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    background-color: blanchedalmond;
    padding: 35px;
    border-radius: 5px;
  }
}

.btn {
  font-size: 15px;
}
</style>