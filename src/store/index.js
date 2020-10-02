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
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
      })
    },
    CHANGE_TASK_STATUS(state, { tasks, taskIndex }) {
      tasks[taskIndex].status = !!tasks[taskIndex].status
    },
  },
  actions: {},
  modules: {},
  getters: {
    getTask(state) {
      return (id) => {
        return state.board.columns[id]
        // for (const column of state.board.columns) {
        //   for (const task of column.tasks) {
        //     if (task.id === id) {
        //       return task
        //     }
        //   }
        // }
      }
    },
  },
})
