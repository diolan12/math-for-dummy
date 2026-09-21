import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChapterView from '../views/ChapterView.vue'
import LearningView from '../views/LearningView.vue'
import TestingView from '../views/TestingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/chapter/:chapterId',
      name: 'chapter-detail',
      component: ChapterView,
    },
    {
      path: '/learn/:chapterId/:subId',
      name: 'learn-module',
      component: LearningView,
    },
    {
      path: '/test/:chapterId/:subId',
      name: 'test-module',
      component: TestingView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
