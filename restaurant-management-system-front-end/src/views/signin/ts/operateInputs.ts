import { ref } from 'vue'
import { Router } from 'vue-router'

import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'

interface InputDOMStatus {
  (): boolean;
}

export const accountNumberDOM = ref<HTMLInputElement>()
export const passwordDOM = ref<HTMLInputElement>()

// 获取input 框的valid 状态
const accountNumbeStatus: InputDOMStatus = () =>
  Boolean(accountNumberDOM.value && accountNumberDOM.value.validity.valid)
const passwordStatus: InputDOMStatus = () =>
  Boolean(passwordDOM.value && passwordDOM.value.validity.valid)

// 登录
export const operateSignIn: (router: Router, role: string | null) => void =
  (router, role) => {
    if (accountNumbeStatus() && passwordStatus()) {
      console.log('登录表单提交成功!')
      if (role === STUDENT_ROLE) {
        router.push('/student/student-home')
      } else if (role === BUSINESS_ROLE) {
        router.push('/business/business-home')
      } else if (role === ADMIN_ROLE) {
        router.push('/admin/admin-home')
      } else {
        console.error(new Error('role 发生错误！'))
        router.push({ name: 'SignIn', query: { role: STUDENT_ROLE } })
      }
    }
  }
