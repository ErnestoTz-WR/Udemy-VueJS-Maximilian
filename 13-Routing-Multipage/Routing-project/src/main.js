import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { path: '/teams', 
      component: TeamsList, 
      children: [
        {path: ':teamId', component: TeamMembers, props: true}
      ]},
    { path: '/users', component: UsersList },
    // { path: '/teams/:teamId', component: TeamMembers, props: true },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    console.log(to,from)
    if(savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0}
  }
});

app.use(router);

app.mount('#app');
