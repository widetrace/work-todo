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
        :key="$taskIndex",
        :task="task",
        :tasks="column.tasks",
        :taskIndex="$taskIndex",
        :editing="true"
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
  },
  created() {
    this.column = this.getTask(this.$route.params.id);
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