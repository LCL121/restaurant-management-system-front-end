import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/layout/home/Home.vue'
import Student from '@/layout/student/Student.vue'

import { STUDENT_ROLE } from '@/utils/role'

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

export default router
