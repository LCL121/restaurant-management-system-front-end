import { reactive } from 'vue'
import axios from 'axios'
import { RespenseFoodList } from '@/store/modules/recommendFood'
import { FoodListModelProps } from '@/components/foodListModel/type'

export const foodListModelProps = reactive<FoodListModelProps>([])

export const getFoodList = async (
  floor: number,
  page: number,
  size = 6,
  wicketNumber = 0
) => {
  if (floor && wicketNumber !== 0) {
    const res: RespenseFoodList = await axios.get(`/api/dbcourse/food/getByWindowId?floor=${floor}&wicketNumber=${wicketNumber}&page=${page}&size=${size}`)
    const data = res.data
    if (data.code === '200') {
      const resData = data.data
      if (resData) {
        if (resData.length) {
          resData.map(item => {
            foodListModelProps.push({
              foodId: item.foodId,
              imgSrc: item.image || require('@/assets/food_default_image.png'),
              foodName: item.name,
              foodPrice: item.price
            })
          })
          return {
            isFinished: false,
            msg: data.msg
          }
        } else {
          return {
            isFinished: true,
            msg: data.msg
          }
        }
      }
    } else {
      return {
        isFinished: false,
        msg: data.msg
      }
    }
  } else if (floor) {
    const res: RespenseFoodList = await axios.get(`/api/dbcourse/food/getByFloor?floor=${floor}&page=${page}&size=${size}`)
    const data = res.data
    if (data.code === '200') {
      const resData = data.data
      if (resData) {
        if (resData.length) {
          resData.map(item => {
            foodListModelProps.push({
              foodId: item.foodId,
              imgSrc: item.image || require('@/assets/food_default_image.png'),
              foodName: item.name,
              foodPrice: item.price
            })
          })
          return {
            isFinished: false,
            msg: data.msg
          }
        } else {
          return {
            isFinished: true,
            msg: data.msg
          }
        }
      }
    } else {
      return {
        isFinished: false,
        msg: data.msg
      }
    }
  }
}

export const clearFoodList = () => {
  while (foodListModelProps.length) {
    foodListModelProps.pop()
  }
}
