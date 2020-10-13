import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/layout/home/Home.vue'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'SignIn',
      query: {
        role: 'student'
      }
    },
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "signin" */ '@/views/signin/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "signup" */ '@/views/signup/SignUp.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
