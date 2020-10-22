import { reactive } from 'vue'

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
    value: '1391436522@qq.com'
  },
  {
    type: 'password',
    id: 'passwordId',
    placeholder: '密码 8-16位，包含大小写字母、数字',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{8,16}$',
    refDom: 'passwordDOM',
    value: '1234abcdABCD'
  },
  {
    type: 'password',
    id: 'confirmId',
    placeholder: '密码 8-16位，包含大小写字母、数字',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{8,16}$',
    refDom: 'confirmDOM',
    value: '1234abcdABCD'
  },
  {
    type: 'text',
    id: 'codeId',
    placeholder: '验证码',
    pattern: '^(\\d){4}$',
    refDom: 'codeDOM',
    value: '1234'
  }
])
