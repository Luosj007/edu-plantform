import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/student',
    component: () => import('@/views/student/student.vue'),
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: '',
        component: () => import('@/views/student/home.vue')
      },
      {
        path: 'courses',
        component: () => import('@/views/student/courses.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/student/settings/settings.vue'),
        children: [
          {
            path: 'information',
            component: () => import('@/views/student/settings/information.vue')
          },
          {
            path: 'password',
            component: () => import('@/views/student/settings/password.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/parent',
    component: () => import('@/views/parent/parent.vue'),
    meta: { requiresAuth: true, role: 'parent' }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;