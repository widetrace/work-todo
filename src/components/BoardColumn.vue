<template lang="pug">
  .column
    h3 {{ column.name }}
    .tasks
      .list(v-for="(task, $taskIndex) in column.tasks", :key="$taskIndex")
        input.list__checkbox(
          type="checkbox",
          v-model="task.status",
          @change="changeTaskStatus($event,column.tasks, $taskIndex)"
        )
        p {{ task.name }}
        p.small {{ task.description }}
    input.list__new-task(
      type="text",
      placeholder="+ Enter new task",
      @keyup.enter="createTask($event, column.tasks)"
    )
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value,
      });
      e.target.value = "";
    },
    changeTaskStatus(e, tasks, taskIndex) {
      e.preventDefault()
      
      this.$store.commit("CHANGE_TASK_STATUS", {
        tasks,
        taskIndex
      })
    }
  },
};
</script>

<style lang="scss">
.column {
  border: 1px solid #edeef0;
  border-radius: 5px;
  padding: 10px;
}

.list {
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  background-color: #edeef0;
  &__checkbox {
    float: left;
    margin-top: 13px;
  }
  &__new-task {
    background-color: transparent;
    outline: none;
    border: none;
  }
}

.small {
  font-size: 10px;
  padding-left: 20px;
}
</style>