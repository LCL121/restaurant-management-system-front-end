import axios, { AxiosResponse } from 'axios'
import { Commit } from 'vuex'
import qs from 'qs'

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
  belong: 'student',
  student: {
    studentNumber: '1',
    email: '1391436522@qq.com',
    name: 'LCL'
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
  async getStudentInfo () {
    const res: AxiosResponse = await axios.post('/api/dbcourse/user/login', qs.stringify({
      id: '1463507919@qq.com',
      password: '456'
    }))
    console.log(res)
    return {
      data: {
        data: {
          role: 'student'
        }
      },
      status: 200
    }
  },
  signUp () {
    axios.post('/api/dbcourse/user/register', qs)
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
