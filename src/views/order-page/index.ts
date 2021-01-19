import { reactive } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { OrderListItemProps } from '@/components/orderListitem/type'
import { createMessage } from '@/utils/index'
import { ResponseCommon } from '@/utils/type'

type OrderDataList = OrderListItemProps[]

type ResponseOrderList = ResponseCommon<OrderDataList | null>

export const orderList = reactive<OrderDataList>([])

export const getData = () => {
  axios.get('/api/dbcourse/user/getAllOrders')
    .then((res: ResponseOrderList) => {
      const data = res.data
      if (data.code === '200') {
        data.data && data.data.map(item => {
          orderList.push({
            foodName: item.foodName,
            foodImg: item.foodImg || require('@/assets/food_default_image.png'),
            takeTime: new Date(item.takeTime).toLocaleString(),
            totalPrice: item.totalPrice,
            number: item.number,
            orderId: item.orderId,
            isComplete: item.isComplete
          })
        })
      } else {
        createMessage('fail', '获取数据失败')
      }
    })
    .catch(() => {
      createMessage('fail', '获取数据失败')
    })
}

export const clearData = () => {
  while (orderList.length) {
    orderList.pop()
  }
}
