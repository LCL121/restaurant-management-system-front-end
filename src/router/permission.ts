import axios, { AxiosResponse } from 'axios'
import { RouteRecordRaw } from 'vue-router'
import router from './index'
import store from '@/store'
// import Student from '@/layout/student/Student.vue'
import Business from '@/layout/business/Business.vue'
import Admin from '@/layout/admin/Admin.vue'

import { BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'

export const businessRoute: RouteRecordRaw = {
  path: '/business',
  name: 'Business',
  component: Business,
  redirect: '/business/business-home',
  children: [
    {
      path: 'business-home',
      name: 'BusinessHome',
      component: () => import(/* webpackChunkName: "business-home" */ '@/views/business-home/BusinessHome.vue')
    },
    {
      path: 'business-details',
      name: 'BusinessDetails',
      component: () => import(/* webpackChunkName: "business-details" */ '@/views/business-details/BusinessDetails.vue')
    }
  ]
}

export const adminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  component: Admin,
  redirect: '/admin/admin-home',
  children: [
    {
      path: 'admin-home',
      name: 'AdminHome',
      component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin-home/AdminHome.vue')
    },
    {
      path: 'admin-details',
      name: 'AdminDetails',
      component: () => import(/* webpackChunkName: "admin-details" */ '@/views/admin-details/AdminDetails.vue')
    }
  ]
}

const other: Array<RouteRecordRaw> = [
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

let res: AxiosResponse

router.beforeEach(async (to, from, next) => {
  if (!res) {
    res = await store.dispatch('role/getStudentInfo')
    if (res.status === 200) {
      const role = res.data.data.role
      switch (role) {
        case BUSINESS_ROLE:
          router.addRoute(businessRoute)
          break
        case ADMIN_ROLE:
          router.addRoute(adminRoute)
          break
      }
      other.forEach(item => {
        router.addRoute(item)
      })
      next({ ...to })
    } else {
      next({ ...to, path: '/' })
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  console.log(router.getRoutes())
  console.log(`${to.fullPath} 路由跳转成功!`)
})
