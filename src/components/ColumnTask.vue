<template lang="pug">
.task
  .task-data
    p.task-data__delete(
      @click="deleteTask",
      v-if="editing"
    ) X 
    input.task-data__checkbox(
      type="checkbox",
      v-model="task.status",
      @change="changeTaskStatus($event)",
    )
    p.task-data__name(
      v-if="!editing"
    ) {{ task.name }}
    input.task-data__edit-name(
      type="text",
      v-else,
      v-model="task.name"
    )
    p.small(
      v-if="!editing"
    ) {{ task.description }}
    textarea.task-data__edit-description(
      v-else
      type="text",
      v-model="task.description",
      placeholder="+ Enter description",
      @blur="descriptionEdited"
    )
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
    },
    editing: {
      type: Boolean,
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
    deleteTask() {
      console.log('deleting')
    },
    descriptionEdited() {
      console.log('descr edited')
    }
  },
};
</script>

<style lang="scss">
.task {
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  background-color: #edeef0;
  text-align: left;
  &-data {
    &__checkbox {
      float: left;
      margin: 0 10px;
    }
    &__delete {
      float: left;
      margin-top: 0;
      color: red;
      &:hover {
        cursor: pointer;
      }
    }
    &__edit-name {
      border: none;
      outline: none;
      background-color: transparent;
    }
    &__edit-description {
      display: block;
      outline: none;
      border: none;
      margin-top: 10px;
      width: 75%;
      padding: 5px;
      resize: vertical;
    }
  }
}
</style>