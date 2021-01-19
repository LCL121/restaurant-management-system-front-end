import { reactive } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { createMessage } from '@/utils/index'
import { ResponseAddToOrder } from './type'

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

export const clearData = () => {
  foodData.foodCount = 1
  foodData.isPageage = false
  foodData.takeTime = ''
}

export const addToOrder = (foodId: number) => {
  if (foodData.takeTime === '') {
    createMessage('fail', '请选择预取时间')
    return
  }
  const takeTime = new Date(foodData.takeTime).getTime()
  const differTime = takeTime - Date.now()
  if (differTime < 60 * 1000 * 5) {
    createMessage('fail', '预取时间请大于当前5分钟')
    return
  } else if (differTime > 2 * 24 * 60 * 60 * 1000) {
    createMessage('fail', '预取时间请不要超过当前2天')
    return
  }
  axios.post('/api/dbcourse/order/create', qs.stringify({
    foodId: foodId,
    isPackage: foodData.isPageage ? 1 : 0,
    number: foodData.foodCount,
    takeTime: `${foodData.takeTime.replace('T', ' ')}:00`
  }))
    .then((res: ResponseAddToOrder) => {
      if (res.data.code === '200') {
        createMessage('success', '订单添加成功，等待跳转', '/student/order-page')
      } else {
        createMessage('fail', '订单添加失败')
      }
    })
    .catch(() => {
      createMessage('fail', '订单添加失败')
    })
}
