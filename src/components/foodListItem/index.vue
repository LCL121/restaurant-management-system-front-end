<template>
  <div class="food-list-item">
    <img class="food-image" :src="imgSrc" :alt="foodName" />
    <div class="food-name">{{foodName}}</div>
    <div class="food-price">￥ {{foodPrice}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FoodListItem',
  props: {
    imgSrc: {
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
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

$border-radius: 10px;

.food-list-item {
  max-width: 46vw;
  background: #ffffff;
  border-radius: $border-radius;
  margin-bottom: px2rem(15);
  .food-image {
    width: 100%;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
  .food-name {
    margin: px2rem(12) px2rem(10) 0 px2rem(10);
    height: 37px;
    line-height: 18.5px;
    font-size: 13px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .food-price {
    margin: px2rem(12) px2rem(10);
    color: #ff5500;
    font-size: 14px;
  }
}
</style>
