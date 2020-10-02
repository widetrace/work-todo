<template lang="pug">
  .board
    .board-items
      h1 {{ board.name }}
      .board-items__columns
        board-column(
          v-for="(column, $columnIndex) in board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
        )
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  name: 'Home',
  components: {
    BoardColumn,
  },
  computed: {
    ...mapState(['board']),
  },
};
</script>

<style lang="scss">
h3 {
  margin-top: 0;
}

p {
  text-align: left;
}

.board-items__columns {
  display: flex;
  flex: 1 1 0;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
</style>