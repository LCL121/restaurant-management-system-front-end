import { ref, reactive, Ref } from 'vue'
import { Router } from 'vue-router'
import { Inputs } from './initInputs'

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
    console.log('已发送，请等待')
    return
  }
  if (emailStatus()) {
    console.log('email 已经填写')
    codeButtonText.value = '60秒后重发'
    setTimeout(countDown, 1000)
  }
}

export const operateSignUp = (router: Router, role: string | null, data: Inputs[]) => {
  if (emailStatus() && passwordStatus() && confirmStatus() && codeStatus()) {
    console.log('sign up 已经全部填写')
    if (data[1].value === data[2].value) {
      console.log('密码确认成功')
    }
  }
}
