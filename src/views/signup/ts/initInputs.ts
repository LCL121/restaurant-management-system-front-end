import { reactive, ref } from 'vue'

export interface Inputs {
  type: string;
  id: string;
  placeholder: string;
  pattern?: string;
  refDom: string;
  value: string;
}

export const data = reactive<Inputs[]>([
  {
    type: 'email',
    id: 'emailId',
    placeholder: '邮箱',
    refDom: 'emailDOM',
    value: ''
  },
  {
    type: 'password',
    id: 'passwordId',
    placeholder: '密码 8-16位，包含大小写字母、数字',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{8,16}$',
    refDom: 'passwordDOM',
    value: ''
  },
  {
    type: 'password',
    id: 'confirmId',
    placeholder: '确认密码',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{8,16}$',
    refDom: 'confirmDOM',
    value: ''
  },
  {
    type: 'text',
    id: 'codeId',
    placeholder: '验证码',
    pattern: '^(\\d){4}$',
    refDom: 'codeDOM',
    value: ''
  }
])
