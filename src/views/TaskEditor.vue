<template lang="pug">
  .editor
    .editor__head
      router-link(:to={ name: "Home" }) <- Back 
      h2 {{ column.name }}
    .editor__control-panel
      input.create-task(
        type="text",
        placeholder="+ Enter new task",
        @keyup.enter="createTask($event, column.tasks)"
      )
      p Save
      p Revert
    .editor__tasks
      column-task(
        v-for="(task, $taskIndex) in column.tasks",
        :key="$taskIndex + 1",
        :task="task",
        :tasks="column.tasks",
        :taskIndex="$taskIndex",
        :editing="true",
        @edit:task="taskEdited($event)"
      )
</template>

<script>
import { mapGetters } from "vuex";
import ColumnTask from "@/components/ColumnTask.vue";

export default {
  components: {
    ColumnTask,
  },
  data() {
    return {
      column: null,
      blockChain: {
        current: 0,
        chains: [],
      },
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value,
      });
      e.target.value = "";
    },
    taskEdited({ type, newValue, taskIndex }) {
      const oldValue = this.getTask(this.$route.params.id).tasks[taskIndex][
        type
      ];
      this.blockChain.chains.push({
        type,
        newValue,
        oldValue,
        taskIndex,
      });
      this.blockChain.current = this.blockChain.chains.length - 1;
      console.log(this.blockChain);
    },
  },
  created() {
    this.column = JSON.parse(
      JSON.stringify(this.getTask(this.$route.params.id))
    );
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Вы хотите уйти? У вас есть несохранённые изменения!"
    );
    if (answer) {
      this.$store.commit("UPDATE_COLUMN", {
        columnId: this.$route.params.id,
        column: this.column,
      });
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style lang="scss">
.editor {
  // background-color: #edeef0;
  min-height: 50vh;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5vh;
  &__control-panel {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}

.create-task {
  outline: none;
}
</style>