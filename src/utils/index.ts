import router from '@/router'

export const goTo = (path: string) => {
  router.push(path)
}

export const goBack = () => {
  router.go(-1)
}
