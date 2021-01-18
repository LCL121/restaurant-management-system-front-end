import axios, { AxiosResponse } from 'axios'
import { ActionTree, Commit, MutationTree } from 'vuex'
import qs from 'qs'
import { RootState } from '@/store/type'
import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'
import { ResponseCommon } from '@/utils/type'
import router from '@/router'
import store from '@/store'

interface StudentInfo {
  email: string;
  id: string;
  name: string;
  role: number;
}

type ResponseRoleInfo = AxiosResponse<{
  code: string;
  data: StudentInfo | null;
  msg: string;
}>

interface StudentState {
  studentNumber: string;
  email: string;
  name: string;
}

interface BusinessState {
  email: string;
  name: string;
}

interface AdminState {
  name: string;
}

export interface RoleState {
  belong: string;
  student: StudentState;
  business: BusinessState;
  admin: AdminState;
}

const goToSuccess = (path: string) => {
  store.commit('message/showMessage', {
    status: 'success',
    title: '登录成功，等待跳转'
  })
  setTimeout(() => {
    router.push(path)
  }, 2000)
}

const judgeGoto = (roleCode: number) => {
  if (roleCode === -1) {
    store.commit('message/showMessage', {
      status: 'fail',
      title: '已在其他设备登录'
    })
    return false
  } else if (roleCode === 0) {
    goToSuccess('/student')
  } else if (roleCode === 1) {
    goToSuccess('/business')
  } else if (roleCode === 2) {
    goToSuccess('/admin')
  }
  return true
}

const state: RoleState = {
  belong: '',
  student: {
    studentNumber: '',
    email: '',
    name: ''
  },
  business: {
    email: '',
    name: ''
  },
  admin: {
    name: ''
  }
}

const getters = {}

const actions: ActionTree<RoleState, RootState> = {
  async getUserInfo ({ commit }) {
    const res: ResponseRoleInfo = await axios.get('/api/dbcourse/getMessage')
    const data = res.data
    console.log(data)
    if (data.code === '200') {
      if (data.data?.role === 0) {
        commit('getStudentInfo', data.data)
        return 0
      }
      return -1
    } else {
      commit('clearStudentInfo')
      return -1
    }
  },
  async signIn({ state, dispatch, commit }, data) {
    const res: ResponseCommon = await axios.post('/api/dbcourse/user/login', qs.stringify(data))
    const resData = res.data
    if (resData.code === '200') {
      const roleCode: number = await dispatch('getUserInfo')
      return judgeGoto(roleCode)
    } else if (resData.code === '402') {
      // 已登录
      const roleCode: number = await dispatch('getUserInfo')
      return judgeGoto(roleCode)
    } else {
      return false
    }
  },
  signUp({ state }, data) {
    console.log(data)
    axios.post('/api/dbcourse/user/register', qs.stringify(data))
      .then(res => {
        console.log(res)
      })
  },
  async logout({ commit }, email) {
    const res: ResponseCommon = await axios.get(`/api/dbcourse/user/logout?email=${email}`)
    const data = res.data
    if (data.code === '200') {
      return true
    }
    return false
  }
}

const mutations: MutationTree<RoleState> = {
  getStudentInfo (state, data) {
    state.belong = STUDENT_ROLE
    state.student.email = data.email
    state.student.name = data.name
    state.student.studentNumber = data.id
  },
  clearStudentInfo(state, data) {
    state.belong = ''
    state.student.email = ''
    state.student.name = ''
    state.student.studentNumber = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
