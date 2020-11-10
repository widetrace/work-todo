<template lang="pug">
  .board
    .board-items
      h1.board-items__title {{ board.name }}
      .board-items__columns
        board-column(
          v-for="(column, $columnIndex) in board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
        )
        input.column-new(
          type="text"
          placeholder="+ Enter new column"
          @keyup.enter="createColumn($event)"
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
  methods: {
    createColumn(e) {
      this.$store.commit("CREATE_COLUMN", e.target.value)
      e.target.value = ""
    }
  }
};
</script>

<style lang="scss">
.board {
  overflow-x: auto;
}

h3 {
  margin-top: 0;
}

p {
  text-align: left;
}

.board-items__columns {
  display: flex;
  flex-flow: row nowrap;
}

.column {
  flex: 1 1 0;
}

.column-new {
  margin-top: 35px;
  margin-left: 35px;
  height: 1em;
  background-color: transparent;
  outline: none;
  border: none;
}
</style>