<template>
  <div class="food-list">
    <div class="food-list-title">{{title}}</div>
    <div class="food-item-list">
      <food-list-item
        v-for="item in foodList"
        :key="item.foodId"
        :foodName="item.foodName"
        :foodPrice="item.foodPrice"
        :imgSrc="item.imgSrc"
      ></food-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FoodListItem from '@/components/foodListItem/index.vue'
import { FoodListModelProps } from './type'

export default defineComponent({
  name: 'FoodListModel',
  components: {
    FoodListItem
  },
  props: {
    foodList: {
      type: Array as PropType<FoodListModelProps>,
      required: true
    },
    title: String
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.food-list {
  padding: px2rem(15) 3vw;
  background: #f2f2f2;
  box-sizing: border-box;
  .food-list-title {
    color: #FF852A;
    font-weight: bold;
    font-size: 17px;
    margin: px2rem(15) 0;
    text-align: center;
  }
  .food-item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
