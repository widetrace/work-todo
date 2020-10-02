<template lang="pug">
  .editor
    .editor__head
      router-link(:to={ name: "Home" }) <- Back 
      h2 {{ tasks.name }}
    p {{this.getTask(this.$route.params.id)}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tasks: null,
    }
  },
  computed: {
    ...mapGetters(['getTask']),
  },
  created() {
    this.tasks = this.getTask(this.$route.params.id)
  }
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