import axios, { AxiosResponse } from 'axios'
import { RouteRecordRaw } from 'vue-router'
import router from './router/index'
import Student from '@/layout/student/Student.vue'
import Business from '@/layout/business/Business.vue'
import Admin from '@/layout/admin/Admin.vue'

const studentRoute: RouteRecordRaw = {
  path: '/student',
  name: 'Student',
  component: Student,
  redirect: '/student/student-home',
  children: [
    {
      path: 'student-home',
      name: 'StudentHome',
      component: () => import(/* webpackChunkName: "student-home" */ '@/views/student-home/StudentHome.vue')
    },
    {
      path: 'student-details',
      name: 'StudentDetails',
      component: () => import(/* webpackChunkName: "student-details" */ '@/views/student-details/StudentDetails.vue')
    },
    {
      path: 'student-search',
      name: 'StudentSearch',
      component: () => import(/* webpackChunkName: "student-search" */ '@/views/student-search/StudentSearch.vue')
    },
    {
      path: 'food-sort',
      name: 'FoodSort',
      component: () => import(/* webpackChunkName: "food-sort" */ '@/views/food-sort/FoodSort.vue')
    },
    {
      path: 'order-page',
      name: 'OrderPage',
      component: () => import(/* webpackChunkName: "order-page" */ '@/views/order-page/OrderPage.vue')
    }
  ]
}

const businessRoute: RouteRecordRaw = {
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

const adminRoute: RouteRecordRaw = {
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

let res: AxiosResponse

router.beforeEach(async (to, from, next) => {
  if (!res) {
    res = await axios.get('/api/dbcourse/role.json')
    if (res.status === 200) {
      console.log('权限获取成功!')
      const role = res.data.data.role
      switch (role) {
        case 'student':
          router.addRoute(studentRoute)
          break
        case 'business':
          router.addRoute(businessRoute)
          break
        case 'admin':
          router.addRoute(adminRoute)
          break
      }
      next({ ...to })
    } else {
      next({ ...to, path: '/' })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  console.log('路由跳转成功!')
})
