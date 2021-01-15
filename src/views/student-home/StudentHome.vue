<template>
  <div class="student-home">
    <carousel-picture :list="carouselPictureDatas"></carousel-picture>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselPicture from '@/components/carouselPicture/index.vue'
import { carouselPictureDatas } from '@/utils/testData'

export default defineComponent({
  name: 'StudentHome',
  components: {
    CarouselPicture
  },
  setup() {
    return {
      carouselPictureDatas
    }
  }
})
</script>

<style scoped lang="scss">
</style>
