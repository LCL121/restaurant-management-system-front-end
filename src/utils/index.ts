import router from '@/router'
import store from '@/store'
import { MessageStatus } from '@/components/message/type'

export const goTo = (path: string) => {
  router.push(path)
}

export const goBack = () => {
  router.go(-1)
}

export const refresh = () => {
  router.go(0)
}

export const createMessage = (status: MessageStatus, title: string, path?: string) => {
  store.commit('message/showMessage', {
    status,
    title
  })
  if (path) {
    setTimeout(() => {
      router.push(path)
    }, 2000)
  }
}
