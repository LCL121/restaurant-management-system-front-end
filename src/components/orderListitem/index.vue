<template>
  <div class="order-list-item">
    <div class="order-list-item-main">
      <img :src="foodImg" :alt="foodName">
      <div class="details">
        <span>{{foodName}}</span>
        <span>预取：{{takeTime}}</span>
      </div>
      <div class="price">
        <span>￥{{totalPrice}}</span>
        <span>x{{number}}</span>
      </div>
    </div>
    <div v-if="isComplete" class="food-score completed">评分</div>
    <div v-else class="food-score uncompleted">未完成</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderListItem',
  props: {
    foodName: {
      type: String,
      required: true
    },
    foodImg: {
      type: String,
      required: true
    },
    takeTime: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    isComplete: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
