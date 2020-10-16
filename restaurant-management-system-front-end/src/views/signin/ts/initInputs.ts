import { reactive } from 'vue'
import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'

export interface Inputs {
  accountNumberId: string;
  type: string;
  pattern?: string;
  placeholder: string;
  accountNumber: string;
  password: string;
}

const originInputs: Inputs = {
  accountNumberId: '',
  type: 'text',
  placeholder: '',
  accountNumber: '201801001116',
  password: '123abcABC'
}

// 初始化所有input 框
export const getAccountInputInfo = (role: string | null) => {
  originInputs.accountNumberId = `${role}Id`
  if (role === STUDENT_ROLE) {
    originInputs.type = 'text'
    originInputs.pattern = '^\\d{12}$'
    originInputs.placeholder = '学号'
  } else if (role === BUSINESS_ROLE) {
    originInputs.type = 'email'
    originInputs.pattern = undefined
    originInputs.placeholder = '邮箱'
  } else if (role === ADMIN_ROLE) {
    originInputs.type = 'text'
    originInputs.pattern = '.{1,64}'
    originInputs.placeholder = '账号'
  } else {
    console.error(new Error('role 发生错误！'))
  }
  return reactive(originInputs)
}
