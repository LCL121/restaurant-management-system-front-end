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
import { defineComponent, onMounted, reactive, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { FoodList } from '@/store/modules/food'
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
    const foodListModelProps = reactive<FoodListModelProps>([])
    const observedRef = ref<HTMLDivElement>()
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return
      axios.get('/api/dbcourse/food/list')
        .then((res: AxiosResponse<{
          data: FoodList;
        }>) => {
          res.data.data.map(item => {
            foodListModelProps.push({
              foodId: item.foodId,
              imgSrc: item.image,
              foodName: item.name,
              foodPrice: item.price
            })
          })
        })
    })

    onMounted(() => {
      axios.get('/api/dbcourse/food/list')
        .then((res: AxiosResponse<{
          data: FoodList;
        }>) => {
          res.data.data.map(item => {
            foodListModelProps.push({
              foodId: item.foodId,
              imgSrc: item.image,
              foodName: item.name,
              foodPrice: item.price
            })
          })
        })

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

<style scoped lang="scss">
</style>
