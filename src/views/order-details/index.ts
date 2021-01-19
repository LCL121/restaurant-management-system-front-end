import { reactive } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { createMessage, refresh } from '@/utils/index'
import { ResponseCommon } from '@/utils/type'

export interface OrderDetailsData {
  foodName: string;
  foodId: number;
  foodImg: string;
  floor: number;
  wicketNumber: number;
  isPackage: string;
  isComplete: boolean;
  takeTime: string;
  number: number;
  totalPrice: number;
  grade?: number;
}

export type ResponseOrderDetails = ResponseCommon<OrderDetailsData | null>

type ResponseDeleteOrder = ResponseCommon<null>

export const orderData = reactive<OrderDetailsData>({
  foodName: '',
  foodId: 0,
  foodImg: '' || require('@/assets/food_default_image.png'),
  floor: 0,
  wicketNumber: 0,
  isPackage: '',
  isComplete: false,
  takeTime: '',
  number: 0,
  totalPrice: 0
})

export const getOrderData = async (orderId: number) => {
  const res: ResponseOrderDetails = await axios.get(`/api/dbcourse/order/details?orderId=${orderId}`)
  const data = res.data
  if (data.code === '200') {
    const resData = data.data
    if (resData) {
      orderData.foodName = resData.foodName
      orderData.foodId = resData.foodId
      orderData.foodImg = resData.foodImg === '' ? resData.foodImg : require('@/assets/food_default_image.png')
      orderData.floor = resData.floor
      orderData.wicketNumber = resData.wicketNumber
      orderData.isPackage = resData.isPackage ? '是' : '否'
      orderData.isComplete = resData.isComplete
      orderData.takeTime = new Date(resData.takeTime).toLocaleString()
      orderData.number = resData.number
      orderData.totalPrice = resData.totalPrice
      return resData.grade
    }
  }
  createMessage('fail', '获取数据失败')
  return -1
}

export const deleteOrder = (orderId: number) => {
  axios.post('/api/dbcourse/order/delete', qs.stringify({
    orderId
  }))
    .then((res: ResponseDeleteOrder) => {
      if (res.data.code === '200') {
        createMessage('success', '订单删除成功，等待跳转', '/student/order-page')
      } else {
        createMessage('fail', '订单删除失败')
      }
    })
    .catch(() => {
      createMessage('fail', '订单删除失败')
    })
}

export const getGrade = (grade: number) => {
  if (grade === -1) {
    return '请进行评分'
  }
  return grade
}

export const sumbitGrade = (grade: number, orderId: number) => {
  if (grade <= 0) {
    createMessage('fail', '评分不能为空')
    return
  }
  axios.post('/api/dbcourse/user/gradeOrder', qs.stringify({
    grade,
    orderId
  }))
    .then((res: ResponseCommon<null>) => {
      if (res.data.code === '200') {
        createMessage('success', '提交成功，等待刷新')
        setTimeout(() => {
          refresh()
        }, 2000)
      } else {
        createMessage('fail', '提交失败')
      }
    })
    .catch(() => {
      createMessage('fail', '提交失败')
    })
}
