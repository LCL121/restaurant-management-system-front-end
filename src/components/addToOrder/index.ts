import { reactive } from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store'

export const foodData = reactive({
  isPageage: false,
  foodCount: 1,
  takeTime: ''
})
export const changePageage = () => {
  foodData.isPageage = !foodData.isPageage
}
export const changeCount = (value: number) => {
  foodData.foodCount += value
  if (foodData.foodCount <= 0) {
    foodData.foodCount = 1
  }
}

export const addToOrder = (foodId: number) => {
  if (foodData.takeTime === '') {
    store.commit('message/showMessage', {
      status: 'fail',
      title: '请选择预取时间'
    })
    return
  }
  const takeTime = new Date(foodData.takeTime).getTime()
  const differTime = takeTime - Date.now()
  if (differTime < 60 * 1000 * 5) {
    store.commit('message/showMessage', {
      status: 'fail',
      title: '预取时间请大于当前5分钟'
    })
    return
  } else if (differTime > 2 * 24 * 60 * 60 * 1000) {
    store.commit('message/showMessage', {
      status: 'fail',
      title: '预取时间请不要超过当前2天'
    })
    return
  }
  axios.post('/api/dbcourse/order/create', qs.stringify({
    foodId: foodId,
    isPackage: foodData.isPageage ? 1 : 0,
    number: foodData.foodCount,
    takeTime: foodData.takeTime
  }))
    .then(res => {
      console.log(res)
    })
}
