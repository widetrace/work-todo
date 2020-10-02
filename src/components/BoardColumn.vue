<template lang="pug">
.column
  h3 {{ column.name }}
  span(@click="goToEditor(columnIndex)", class="edit btn") Edit
  span(class="delete btn") Delete
  .tasks
    column-task(
      v-for="(task, $taskIndex) in column.tasks",
      :key="$taskIndex",
      :task="task",
      :tasks="column.tasks",
      :taskIndex="$taskIndex"
    )
  input.list__new-task(
    type="text",
    placeholder="+ Enter new task",
    @keyup.enter="createTask($event, column.tasks)"
  )
</template>

<script>
import ColumnTask from "@/components/ColumnTask.vue";

export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  components: {
    ColumnTask,
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value,
      });
      e.target.value = "";
    },
    goToEditor(columnIndex) {
      this.$router.push({ name: "Editor", params: { id: columnIndex } });
    },
  },
};
</script>

<style lang="scss">
.btn {
  padding: 10px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.delete {
  color: red;
}

.column {
  border: 1px solid #edeef0;
  border-radius: 5px;
  padding: 10px;
}

.list__new-task {
  margin-top: 15px;
  background-color: transparent;
  outline: none;
  border: none;
}

.small {
  font-size: 10px;
  padding-left: 20px;
}
</style>