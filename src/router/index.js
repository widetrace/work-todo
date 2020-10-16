import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import TaskEditor from '../views/TaskEditor.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    component: TaskEditor,
  },
  {
    path: '/editor',
    redirect: { name: 'Home' },
  },
  {
    path: '*',
    redirect: { name: 'Home' },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
