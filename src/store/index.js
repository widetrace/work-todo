import Vue from 'vue'
import Vuex from 'vuex'
import taskList from '../task-list'
import { saveStatePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || taskList

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
    confirm: {
      name: '',
      type: {
        name: '',
        index: '',
        columnIndex: '',
      },
      disabled: true,
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
      })
    },
    CREATE_COLUMN(state, name) {
      const newColumn = {
        name,
        tasks: []
      }
      state.board.columns.push(newColumn)
    },
    CHANGE_TASK_STATUS(state, { tasks, taskIndex }) {
      tasks[taskIndex].status = !!tasks[taskIndex].status
    },
    UPDATE_COLUMN(state, {columnId, column}) {
      state.board.columns.splice(columnId, 1, column)
    },
    DELETE_COLUMN(state) {
      state.board.columns.splice(state.confirm.type.columnIndex, 1)
    },
    DELETE_TASK(state) {
      state.confirm.type.tasks.splice(state.confirm.type.taskIndex, 1)
    },
    CALL_CONFIRM(state, confirm) {
      state.confirm = confirm
    }
  },
  actions: {
    callConfirmedAction({ state, commit }) {
      commit(state.confirm.type.name)
      commit('CALL_CONFIRM', {disabled: true})
    }
  },
  getters: {
    getTask(state) {
      return (id) => {
        return state.board.columns[id]
      }
    },
  },
})
