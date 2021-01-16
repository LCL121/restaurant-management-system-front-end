<template>
  <div class="student-home">
    <carousel-picture :list="carouselPictureDatas"></carousel-picture>
    <food-list-model
      :foodList="foodListModelProps"
      title="猜你喜欢"
    ></food-list-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { FoodList } from './ts/type'
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

    onMounted(() => {
      axios.get('/api/dbcourse/food/list')
        .then((res: AxiosResponse<{
          data: FoodList;
        }>) => {
          console.log(res.data.data)
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

    return {
      carouselPictureDatas,
      foodListModelProps
    }
  }
})
</script>

<style scoped lang="scss">
</style>
