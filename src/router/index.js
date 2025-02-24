import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/student',
    component: () => import('@/views/StudentView.vue'),
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/parent',
    component: () => import('@/views/ParentView.vue'),
    meta: { requiresAuth: true, role: 'parent' }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;