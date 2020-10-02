<template lang="pug">
.task
  .task-data
    input.task-data__checkbox(
      type="checkbox",
      v-model="task.status",
      @change="changeTaskStatus($event)",
    )
    p.task-data__name {{ task.name }}
    p.small {{ task.description }}
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    }
  },
  methods: {
    changeTaskStatus(e) {
      e.preventDefault();

      this.$store.commit("CHANGE_TASK_STATUS", {
        tasks: this.tasks,
        taskIndex: this.taskIndex,
      });
    },
  },
};
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
    }
  }
}
</style>