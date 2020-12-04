<template lang="pug">
  .editor
    .editor__head
      router-link(:to={ name: "Home" }) <- Back 
      h2 {{ column.name || '-'}}
    .editor__control-panel
      input.create-task(
        type="text",
        placeholder="+ Enter new task",
        @keyup.enter="createTask($event, column.tasks)"
      )
      p(
        v-if="this.blockChain.chains.length > 0"
        @click="saveNewState"
      ) Save
      p(
        v-if="this.blockChain.chains.length > 0"
        @click="prevChain"
      ) Revert
    .editor__tasks(v-if="column.tasks")
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
        current: null,
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
    prevChain() {
      const selectedChain = this.blockChain.chains[this.blockChain.current]
      if (this.blockChain.current === 0) {
        this.column.tasks[selectedChain.taskIndex][selectedChain.type] = selectedChain.oldValue
        this.blockChain.current = null;
        this.blockChain.chains = [];
      }
      console.log(this.blockChain)
      console.log(this.column.tasks)
    },
    saveNewState() {},
    taskEdited({ type, newValue, taskIndex }) {
      const oldValue = this.getTask(this.$route.params.id).tasks[taskIndex][
        type
      ];
      if (this.blockChain.current !== null && this.blockChain.chains.length - 1 !== this.blockChain.current) {
        console.log('smth reverted')
      } else {
        console.log('nothing were reverted')
      }
      if (newValue !== oldValue) {
        this.blockChain.chains.push({
          type,
          newValue,
          oldValue,
          taskIndex,
        });
        this.blockChain.current = this.blockChain.chains.length - 1;
      }
      console.log(this.blockChain);
    },
  },
  beforeMount() {
    // Глубокое копирование, так как есть вложенные объекты
    // неглубокое копирование не подходит
    this.column = JSON.parse(
      JSON.stringify(this.getTask(this.$route.params.id))
    );
  },
  beforeCreate() {
    if (
      this.$route.params.id < 0 ||
      this.$route.params.id > this.$store.state.board.columns.length - 1
    ) {
      this.$router.push({ name: "Home" });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.blockChain.chains.length) {
      this.$store
        .dispatch("confirmAction", {
          title: "Save edited info?",
          type: {
            name: "UPDATE_COLUMN",
            columnId: this.$route.params.id,
            column: this.column,
          },
        })
        .then(() => {
          next();
        })
    } else {
      next();
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