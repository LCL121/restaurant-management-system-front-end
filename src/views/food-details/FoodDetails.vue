<template>
  <div class="food-details" @click="goBack">
    <div class="back">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoyu"></use>
      </svg>
    </div>
    <img :src="data.image" :alt="data.name">
    <div class="food-price"><span>￥</span><span>{{data.price}}</span></div>
    <div class="food-name">{{data.name}}</div>
    <div class="food-position">
      <div class="food-floor"><span>楼层：</span>{{data.floor}}楼</div>
      <div class="food-wicket"><span>窗口号：</span>{{data.wicketNumber}}号</div>
    </div>
    <div class="buy">添加订单</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute, LocationQuery } from 'vue-router'
import axios from 'axios'
import { RespenseFoodDetails, Food } from '@/store/modules/recommendFood'
import { goBack } from '@/utils/index'

export default defineComponent({
  name: 'FoodDetails',
  setup() {
    const route = useRoute()
    const data = reactive<Food>({
      foodId: 0,
      image: require('@/assets/food_default_image.png'),
      name: '',
      price: 0,
      taste: '',
      wicketId: 0,
      wicketNumber: 0,
      floor: 0
    })

    onMounted(() => {
      axios.get(`/api/dbcourse/food/details?foodId=${route.query.foodId}`)
        .then((res: RespenseFoodDetails) => {
          const resData = res.data.data
          data.foodId = resData.foodId
          data.image = resData.image
          data.name = resData.name
          data.price = resData.price
          data.taste = resData.taste
          data.wicketId = resData.wicketId
          data.wicketNumber = resData.wicketNumber
          data.floor = resData.floor
        })
    })

    return {
      data,
      goBack
    }
  }
})
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
