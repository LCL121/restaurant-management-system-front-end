<template>
  <div class="order-details">
    <div class="title">
      <div class="back" @click="goBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoyu"></use>
        </svg>
      </div>
      {{orderData.isComplete ? '已完成' : '未完成'}}
    </div>
    <div class="order-details-main">
      <img :src="orderData.foodImg" :alt="orderData.foodName">
      <div class="order-details-info">
        <div class="details">
          <span>{{orderData.foodName}}</span>
        </div>
        <div class="price">
          <span>￥{{orderData.totalPrice}}</span>
          <span>x{{orderData.number}}</span>
        </div>
      </div>
    </div>
    <div class="order-details-other">
      <div><span>楼层：</span>{{orderData.floor}}楼</div>
      <div><span>窗口号：</span>{{orderData.wicketNumber}}号</div>
      <div><span>是否打包：</span>{{orderData.isPackage}}</div>
      <div><span>预取时间：</span>{{orderData.takeTime}}</div>
    </div>
    <div v-if="orderData.isComplete" class="add-grade">
      <template v-if="defaultGrade === -1">
        <span class="current-grade">评分：{{getGrade(currentGrade)}}</span>
        <div class="grade-stars">
          <svg
            v-for="(item, index) in stars"
            :key="index"
            class="icon order-icon"
            aria-hidden="true"
            @touchstart.passive="changeCurrentGrade(index + 1)"
          >
            <use :xlink:href="`#icon-${item ? 'favorfill' : 'favor'}`"></use>
          </svg>
        </div>
        <div class="submit-grade" @click="sumbitGradeFuc">提交</div>
      </template>
      <template v-else>
        <span class="current-grade">评分：{{currentGrade}}</span>
        <div class="grade-stars">
          <svg
            v-for="(item, index) in stars"
            :key="index"
            class="icon order-icon"
            aria-hidden="true"
          >
            <use :xlink:href="`#icon-${item ? 'favorfill' : 'favor'}`"></use>
          </svg>
        </div>
      </template>
    </div>
    <div
      v-if="orderData.isComplete"
      @click="goTo(`/food?foodId=${orderData.foodId}`)"
      class="order-details-button"
    >再次购买</div>
    <div
      v-else
      class="order-details-button"
      @click="deleteFuc"
    >删除订单</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { goBack, goTo } from '@/utils/index'
import { orderData, getOrderData, deleteOrder, getGrade, sumbitGrade } from './index'

export default defineComponent({
  name: 'OrderDetails',
  setup(props) {
    const route = useRoute()
    const orderId = route.query.orderId as unknown as number
    const deleteFuc = () => {
      deleteOrder(orderId)
    }
    const currentGrade = ref<number>(-1)
    const defaultGrade = ref<number>(-1)
    const stars = computed(() => {
      const tmp = Array(10).fill(false)
      for (let i = 0; i < currentGrade.value; i++) {
        tmp[i] = true
      }
      return tmp
    })
    const changeCurrentGrade = (index: number) => {
      currentGrade.value = index
    }
    const sumbitGradeFuc = () => {
      sumbitGrade(currentGrade.value, orderId, route.fullPath)
    }

    getOrderData(orderId)
      .then(res => {
        defaultGrade.value = res as number
        currentGrade.value = res as number
      })

    return {
      orderData,
      goBack,
      goTo,
      deleteOrder,
      deleteFuc,
      defaultGrade,
      stars,
      changeCurrentGrade,
      currentGrade,
      getGrade,
      sumbitGradeFuc
    }
  }
})
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
