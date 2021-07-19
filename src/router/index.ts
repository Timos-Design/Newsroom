import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export const suffix = " | Timo's Newsroom";

const router = new VueRouter({
  scrollBehavior(to, _from, savePosition) {
    if (savePosition && to.name !== 'news') return savePosition;
    return { x: 0, y: 0 };
  },

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/archive/:page?',
      name: 'archive',
      component: () => import('@/views/archives/Archive.vue'),
      meta: {
        title: 'Archive',
      },
    },
    {
      path: '/news/:id',
      name: 'news',
      component: () => import('@/views/News.vue'),
      meta: {
        title: 'News',
      },
    },
    {
      path: '/search/:query',
      name: 'search',
      component: () => import('@/views/Search.vue'),
      meta: {
        title: 'Search',
      },
    },
    {
      path: '/project/:project',
      name: 'project',
      component: () => import('@/views/Project.vue'),
      meta: {
        title: 'Project',
      },
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
