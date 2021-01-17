import axios, { AxiosResponse } from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import qs from 'qs'
import { RootState } from '@/store/type'
import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'

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
  async getStudentInfo ({ commit }) {
    const res: ResponseRoleInfo = await axios.get('/api/dbcourse/getMessage')
    const data = res.data
    console.log(data)
    // 过期
    if (data.code === '403') {
      commit('clearStudentInfo')
      return false
    }
    if (data.code === '200') {
      if (data.data?.role === 0) {
        commit('getStudentInfo', data.data)
      }
      return true
    }
    // return {
    //   data: {
    //     data: {
    //       role: 'student'
    //     }
    //   },
    //   status: 200
    // }
  },
  async signIn({ state }, data) {
    const res: AxiosResponse = await axios.post('/api/dbcourse/user/login', qs.stringify(data))
    console.log(res)
  },
  signUp ({ state }, data) {
    console.log(data)
    axios.post('/api/dbcourse/user/register', qs.stringify(data))
      .then(res => {
        console.log(res)
      })
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
