import {createRouter, createWebHistory, RouterOptions} from 'vue-router';
import DashboardView from '@views/DashboardView.vue';
import BoardView from '@views/BoardView.vue';
import {store} from './store';

const history = createWebHistory('/kanban-task-management-web-app/');
const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: DashboardView,
    children: [
      {
        path: ':id',
        component: BoardView,
      },
    ],
  },
];

const router = createRouter({
  history,
  routes,
});

// Set current board by path
router.afterEach((to, from) => {
  store.commit('setCurrentBoardByPath', to.path);
});

export default router;
