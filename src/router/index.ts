import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Home from '@/layout/home/Home.vue'
import Student from '@/layout/student/Student.vue'
import Business from '@/layout/business/Business.vue'
import Admin from '@/layout/admin/Admin.vue'

import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/student'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'SignIn',
      query: {
        role: STUDENT_ROLE
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
        meta: {
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "student-details" */ '@/views/student-details/StudentDetails.vue')
      },
      {
        path: 'food-sort',
        name: 'FoodSort',
        component: () => import(/* webpackChunkName: "food-sort" */ '@/views/food-sort/FoodSort.vue')
      },
      {
        path: 'order-page',
        name: 'OrderPage',
        meta: {
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "order-page" */ '@/views/order-page/OrderPage.vue')
      }
    ]
  },
  {
    path: '/business',
    name: 'Business',
    meta: {
      needLogin: true
    },
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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      needLogin: true
    },
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
  },
  {
    path: '/food',
    name: 'Food',
    component: () => import(/* webpackChunkName: "food" */ '@/views/food-details/FoodDetails.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    store.dispatch('role/getStudentInfo')
    next()
  }
  next()
})

export default router
