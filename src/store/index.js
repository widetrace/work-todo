import Vue from 'vue';
import Vuex from 'vuex';
import taskList from '../task-list';
import { saveStatePlugin, uuid } from '../utils';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || taskList

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
