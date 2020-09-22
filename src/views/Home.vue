<template lang="pug">
  .board
    .board-items
      h1 {{ board.name }}
      .board-items__columns
        .column(
          v-for="(column, $columnIndex) in board.columns"
          :key="$columnIndex"
        )
          h3 {{ column.name }}
          .list(
            v-for="(task, $taskIndex) in column.tasks"
            :key="$taskIndex"
          )
            input.list__checkbox(
              type="checkbox", 
              v-model="task.status", 
              :disabled="true"
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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['board']),
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
};
</script>

<style lang="scss">
p {
  text-align: left;
}

.board-items__columns {
  display: flex;
  flex: 1 1 0;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

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
  // edeef0
}
</style>