<template>
  <div class="add-to-order" @click.self="hiddenAddToOrder">
    <div class="add-to-order-main">
      <div class="food-name">{{foodName}}</div>
      <div class="food-price">
        <span>价格</span>
        <span>￥{{foodPrice * foodData.foodCount}}</span>
      </div>
      <div class="food-package">
        <span>是否打包</span>
        <span
          :class="{checked: foodData.isPageage}"
          @click="changePageage"
        ></span>
      </div>
      <div class="food-count">
        <span>数量</span>
        <span
          @click="changeCount(-1)"
          :class="{disable: foodData.foodCount === 1}"
        >-</span>
        <span class="food-number">{{foodData.foodCount}}</span>
        <span @click="changeCount(1)">+</span>
      </div>
      <div class="food-time">
        <span>预取时间</span>
        <input
          v-model="foodData.takeTime"
          type="datetime-local"
        >
      </div>
      <div class="determine-button">确定</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'AddToOrder',
  props: {
    foodId: {
      type: String,
      required: true
    },
    foodName: {
      type: String,
      required: true
    },
    foodPrice: {
      type: Number,
      required: true
    }
  },
  emits: ['hidden-add-to-order'],
  setup(props, context) {
    const foodData = reactive({
      isPageage: false,
      foodCount: 1,
      takeTime: ''
    })
    const changePageage = () => {
      foodData.isPageage = !foodData.isPageage
    }
    const changeCount = (value: number) => {
      foodData.foodCount += value
      if (foodData.foodCount <= 0) {
        foodData.foodCount = 1
      }
    }
    const hiddenAddToOrder = () => {
      context.emit('hidden-add-to-order')
    }

    return {
      foodData,
      changePageage,
      changeCount,
      hiddenAddToOrder
    }
  }
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
