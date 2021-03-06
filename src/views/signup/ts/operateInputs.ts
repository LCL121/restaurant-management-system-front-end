import { ref } from 'vue'
import { Router } from 'vue-router'
import { Inputs, data as inputDatas } from './initInputs'
import axios from 'axios'
import store from '@/store'
import { createMessage } from '@/utils/index'
import { ResponseCommon } from '@/utils/type'

interface InputDOMStatus {
  (): boolean;
}

export const emailDOM = ref<HTMLInputElement>()
export const passwordDOM = ref<HTMLInputElement>()
export const confirmDOM = ref<HTMLInputElement>()
export const codeDOM = ref<HTMLInputElement>()

export const codeButtonText = ref('获取验证码')

// 获取input 框的valid 状态
const emailStatus: InputDOMStatus = () =>
  Boolean(emailDOM.value?.validity.valid)
const passwordStatus: InputDOMStatus = () =>
  Boolean(passwordDOM.value?.validity.valid)
const confirmStatus: InputDOMStatus = () =>
  Boolean(confirmDOM.value?.validity.valid)
const codeStatus: InputDOMStatus = () =>
  Boolean(codeDOM.value?.validity.valid)

const countDown = () => {
  const num = parseInt(codeButtonText.value)
  codeButtonText.value = `${num - 1}秒后重发`
  if (codeButtonText.value !== '0秒后重发') {
    setTimeout(countDown, 1000)
  } else {
    codeButtonText.value = '获取验证码'
  }
}

export const operateSendCode = (data: Inputs) => {
  if (codeButtonText.value !== '获取验证码') {
    createMessage('fail', '已发送，请等待')
    return
  }
  if (emailStatus()) {
    codeButtonText.value = '60秒后重发'
    axios.get(`/api/dbcourse/user/getCode?email=${data.value}`)
      .then((res: ResponseCommon<null>) => {
        if (res.data.code === '200') {
          createMessage('success', '发送成功，请等待')
        } else {
          createMessage('fail', '发送失败')
        }
      })
      .catch(() => {
        createMessage('fail', '发送失败')
      })
    setTimeout(countDown, 1000)
  } else {
    createMessage('fail', '请填写email')
  }
}

export const judgePasswordSame = (data: Inputs[], index: number) => {
  if (index === 2 && data[1].value !== data[2].value) {
    createMessage('fail', '密码填写不相同')
  }
}

export const operateSignUp = async (router: Router, role: string | null, data: Inputs[]) => {
  if (emailStatus() && passwordStatus() && confirmStatus() && codeStatus()) {
    console.log('sign up 已经全部填写')
    if (data[1].value === data[2].value) {
      console.log('密码确认成功')
      store.dispatch('role/signUp', {
        code: inputDatas[3].value,
        email: inputDatas[0].value,
        password: inputDatas[1].value,
        qualifyPass: inputDatas[2].value
      })
      // if (role === STUDENT_ROLE) {
      //   router.push('/student/student-home')
      // } else if (role === BUSINESS_ROLE) {
      //   router.push('/business/business-home')
      // } else {
      //   console.error(new Error('role 发生错误！'))
      //   router.push({ name: 'SignIn', query: { role: STUDENT_ROLE } })
      // }
    } else {
      createMessage('fail', '密码填写不相同')
    }
  }
}
