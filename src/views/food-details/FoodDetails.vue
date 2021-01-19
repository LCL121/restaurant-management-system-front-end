<template>
  <div class="food-details">
    <div class="back" @click="goBack">
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
    <div class="food-grade"><span>菜品评分：</span>{{data.grade}}</div>
    <div class="buy" @click="changeShowBuy(true)">添加订单</div>
    <transition name="show-buy">
      <add-to-order
        v-if="isShowBuy"
        :foodId="data.foodId"
        :foodName="data.name"
        :foodPrice="data.price"
        @hidden-add-to-order="changeShowBuy(false)"
      ></add-to-order>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { RespenseFoodDetails, Food } from '@/store/modules/recommendFood'
import { goBack, createMessage } from '@/utils/index'
import AddToOrder from '@/components/addToOrder/index.vue'

export default defineComponent({
  name: 'FoodDetails',
  components: {
    AddToOrder
  },
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
      floor: 0,
      grade: '当前菜品未有人评分'
    })
    const isShowBuy = ref(false)
    const getGrade = (grade: number) => {
      if (grade === -1) return '当前菜品未有人评分'
      return grade
    }
    const changeShowBuy = (isShow: boolean) => {
      isShowBuy.value = isShow
    }

    onMounted(() => {
      axios.get(`/api/dbcourse/food/details?foodId=${route.query.foodId}`)
        .then((res: RespenseFoodDetails) => {
          const resData = res.data.data
          data.foodId = resData.foodId
          data.image = data.image === '' ? resData.image : data.image
          data.name = resData.name
          data.price = resData.price
          data.taste = resData.taste
          data.wicketId = resData.wicketId
          data.wicketNumber = resData.wicketNumber
          data.floor = resData.floor
          data.grade = getGrade(resData.grade as number)
        })
        .catch(() => {
          createMessage('fail', '获取数据失败')
        })
    })

    return {
      data,
      goBack,
      isShowBuy,
      changeShowBuy
    }
  }
})
</script>

<style scoped lang="scss">
@import "./index.scss";
@import "./transition.scss";
</style>
