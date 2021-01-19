<template>
  <div class="order-page">
    <order-list-item
      v-for="item in orderList"
      :key="item.orderId"
      :foodImg="item.foodImg"
      :foodName="item.foodName"
      :number="item.number"
      :takeTime="item.takeTime"
      :totalPrice="item.totalPrice"
      :isComplete="item.isComplete"
      @click="goTo(`/order-details?orderId=${item.orderId}`)"
    ></order-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { getData, orderList, clearData } from './index'
import OrderListItem from '@/components/orderListitem/index.vue'
import { goTo } from '@/utils/index'

export default defineComponent({
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  setup() {
    onMounted(() => {
      getData()
    })

    onUnmounted(() => {
      clearData()
    })

    return {
      orderList,
      goTo
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

.order-page {
  background: #f2f2f2;
  min-height: calc(100vh - #{$student-header-height + $student-footer-height});
}
</style>
