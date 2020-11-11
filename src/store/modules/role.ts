import axios, { AxiosResponse } from 'axios'
import { Commit } from 'vuex'

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

const actions = {
  async getStudentInfo (
    { commit }: { commit: Commit }
  ) {
    const res: AxiosResponse = await axios.get('/api/dbcourse/role.json')
    const data = res.data.data
    commit('GET_STUDENT_INFO', { belong: data.role, student: data.data })
    return res
  }
}

const mutations = {
  GET_STUDENT_INFO (
    state: RoleState,
    newState: { belong: string; student: StudentState }
  ) {
    console.log('GET_STUDENT_INFO: ', newState)
    state.belong = newState.belong
    state.student.email = newState.student.email
    state.student.name = newState.student.name
    state.student.studentNumber = newState.student.studentNumber
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
