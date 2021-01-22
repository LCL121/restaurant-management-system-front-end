<template>
  <div class="add-to-order" @click.self="hiddenAddToOrder">
    <div class="add-to-order-main">
      <div class="food-name">{{foodName}}</div>
      <div class="food-price">
        <span>价格</span>
        <span>￥{{Math.round(foodPrice * foodData.foodCount * 10) / 10}}</span>
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
      <div class="determine-button" @click="addToOrder(foodId)">确定</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted, onMounted } from 'vue'
import { foodData, changePageage, changeCount, addToOrder, clearData } from './index'

export default defineComponent({
  name: 'AddToOrder',
  props: {
    foodId: {
      type: Number,
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
    const hiddenAddToOrder = () => {
      context.emit('hidden-add-to-order')
    }

    onMounted(() => {
      clearData()
    })

    return {
      foodData,
      changePageage,
      changeCount,
      hiddenAddToOrder,
      addToOrder
    }
  }
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
