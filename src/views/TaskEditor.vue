<template lang="pug">
  .editor
    p {{this.getTask(this.$route.params.id)}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
  },
};
</script>

<style lang="scss">
.editor {
  background-color: #edeef0;
  min-height: 50vh;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5vh;
}

</style>