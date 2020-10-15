<template lang="pug">
.task
  .task-data
    .task-data__buttons
      p.task-data__delete(@click="deleteTask", v-if="editing") X
      input.task-data__checkbox(
        type="checkbox",
        v-model="task.status",
        @change="changeTaskStatus($event)"
      )
    .task-data__textfields
      template
        p.task-data__name(v-if="!editing") {{ task.name }}
        input.task-data__edit-name(
          type="text",
          v-else,
          v-model="task.name",
          @keyup.enter="blurEvent($event)",
          @blur="titleEdited($event)"
        )
      template
        p.small(v-if="!editing") {{ task.description }}
        textarea.task-data__edit-description(
          v-else,
          type="text",
          v-model="task.description",
          placeholder="+ Enter description",
          @blur="descriptionEdited($event)"
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
    },
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
      this.$store.commit("CALL_CONFIRM", {
        name: `Delete task: ${this.task.name}?`,
        type: {
          name: 'DELETE_TASK',
          tasks: this.tasks,
          taskIndex: this.taskIndex
        },
        disabled: false,
      })
    },
    descriptionEdited(e) {
      console.log(e.target.value);
      const editObj = {
        type: 'description',
        newValue: e.target.value,
        taskIndex: this.taskIndex,
      }
      this.$emit("edit:task", editObj);
    },
    titleEdited(e) {
      console.log(e.target.value)
      const editObj = {
        type: 'name',
        newValue: e.target.value,
        taskIndex: this.taskIndex,
      }
      this.$emit("edit:task", editObj)
    },
    blurEvent(e) {
      e.target.blur();
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
  text-align: left;
  &-data {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    &__checkbox {
      margin: 0 10px;
    }
    &__delete {
      margin-top: 0;
      color: red;
      text-align: center;
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
      width: 50vw;
      margin-top: 10px;
      padding: 5px;
      resize: vertical;
    }
  }
}
</style>