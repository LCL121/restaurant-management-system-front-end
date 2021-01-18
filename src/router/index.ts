import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Error404 from '@/views/error-pages/404.vue'
import { homeRoutes, studentRoutes, businessRoutes, adminRoutes } from './routes'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/student'
  },
  homeRoutes,
  studentRoutes,
  businessRoutes,
  adminRoutes,
  {
    path: '/food',
    name: 'Food',
    component: () => import(/* webpackChunkName: "food" */ '@/views/food-details/FoodDetails.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  },
  {
    path: '/404',
    name: '404',
    component: Error404
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needStudent) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 0) {
          next()
        } else {
          next('/home')
        }
      })
  } else if (to.meta.needBusiness) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 1) {
          next()
        } else {
          next('/home')
        }
      })
  } else if (to.meta.needAdmin) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 2) {
          next()
        } else {
          next('/home')
        }
      })
  } else {
    next()
  }
})

export default router
