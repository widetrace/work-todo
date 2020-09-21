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
            p {{ task.name }}
            p.small {{ task.description }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['board']),
  }
};
</script>

<style lang="scss">
p {
  text-align: left;
}

.small {
  font-size: 10px;
}
</style>