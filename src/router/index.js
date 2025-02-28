import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/student',
    component: () => import('@/views/StudentPage.vue'),
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/parent',
    component: () => import('@/views/ParentPage.vue'),
    meta: { requiresAuth: true, role: 'parent' }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;