import { ref, reactive } from 'vue'
import { Router } from 'vue-router'
import { Inputs } from './initInputs'

interface InputDOMStatus {
  (): boolean;
}

export const emailDOM = ref<HTMLInputElement>()
export const passwordDOM = ref<HTMLInputElement>()
export const confirmDOM = ref<HTMLInputElement>()
export const codeDOM = ref<HTMLInputElement>()

// 获取input 框的valid 状态
const emailStatus: InputDOMStatus = () =>
  Boolean(emailDOM.value?.validity.valid)
const passwordStatus: InputDOMStatus = () =>
  Boolean(passwordDOM.value?.validity.valid)
const confirmStatus: InputDOMStatus = () =>
  Boolean(confirmDOM.value?.validity.valid)
const codeStatus: InputDOMStatus = () =>
  Boolean(codeDOM.value?.validity.valid)

export const operateSignUp = (router: Router, role: string | null, data: Inputs[]) => {
  if (emailStatus() && passwordStatus() && confirmStatus() && codeStatus()) {
    console.log('sign up 已经全部填写')
    if (data[1].value === data[2].value) {
      console.log('密码确认成功')
    }
  }
}
