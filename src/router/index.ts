import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Error404 from '@/views/error-pages/404.vue'
import { homeRoutes, studentRoutes, businessRoutes, adminRoutes } from './routes'
import { createMessage } from '@/utils/index'

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
    meta: {
      needStudent: true
    },
    component: () => import(/* webpackChunkName: "food" */ '@/views/food-details/FoodDetails.vue')
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    meta: {
      needStudent: true
    },
    component: () => import(/* webpackChunkName: "order-details" */ '@/views/order-details/OrderDetails.vue')
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
          createMessage('fail', '请先登录，等待跳转登录页面', '/home')
        }
      })
  } else if (to.meta.needBusiness) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 1) {
          next()
        } else {
          createMessage('fail', '请先登录，等待跳转登录页面', '/home')
        }
      })
  } else if (to.meta.needAdmin) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 2) {
          next()
        } else {
          createMessage('fail', '请先登录，等待跳转登录页面', '/home')
        }
      })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  console.log('from', from.fullPath)
  console.log('to', to.fullPath)
})

export default router
