<template>
  <div class="student-home">
    <carousel-picture :list="carouselPictureDatas"></carousel-picture>
    <food-list-model
      :foodList="foodListModelProps"
      title="猜你喜欢"
    ></food-list-model>
    <div ref="observedRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { RootState } from '@/store/type'
import { FoodList } from '@/store/modules/recommendFood'
import CarouselPicture from '@/components/carouselPicture/index.vue'
import FoodListModel from '@/components/foodListModel/index.vue'
import { FoodListModelProps } from '@/components/foodListModel/type'
import { carouselPictureDatas } from '@/utils/testData'

export default defineComponent({
  name: 'StudentHome',
  components: {
    CarouselPicture,
    FoodListModel
  },
  setup() {
    const store = useStore<RootState>()
    const observedRef = ref<HTMLDivElement>()
    const recommendFoodList = computed(() => store.state.recommendFood.foodList)
    const foodListModelProps = computed<FoodListModelProps>(() => {
      return recommendFoodList.value.map(item => ({
        foodId: item.foodId,
        imgSrc: item.image || require('@/assets/food_default_image.png'),
        foodName: item.name,
        foodPrice: item.price
      }))
    })
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return
      store.dispatch('recommendFood/fetchFoodList')
    })

    onMounted(() => {
      store.dispatch('recommendFood/fetchFoodList')

      if (observedRef.value) {
        intersectionObserver.observe(observedRef.value)
      }
    })

    return {
      carouselPictureDatas,
      foodListModelProps,
      observedRef
    }
  }
})
</script>
