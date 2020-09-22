<template lang="pug">
.task
  .task-data
    input.task-data__checkbox(
      type="checkbox",
      v-model="task.status",
      :disabled="true"
    )
    p {{ task.name }}
    p.small {{ task.description }}
  input(
    type="text",
    placeholder="+ Enter new task",
    @keyup.enter="createTask($event, column.tasks)"
  )
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required
    },
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    }
  }
}
</script>

<style lang="scss">
.task {
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  background-color: #edeef0;
  &-data {
    &__checkbox {
      float: left;
      margin-top: 13px;
    }
  }
  &__new {
    background-color: transparent;
    outline: none;
    border: none;
  }
}
</style>