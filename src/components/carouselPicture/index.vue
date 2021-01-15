<template>
  <div class="carousel-picture">
    <carousel-picture-item
      v-for="(item, index) in list"
      :key="item.imgSrc"
      :imgSrc="item.imgSrc"
      :url="item.url"
      :currentIndex="currentIdx"
      :maxIndex="list.length - 1"
      :index="index"
    ></carousel-picture-item>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in list"
        :key="item.imgSrc"
        :class="{checked: index === currentIdx}"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted, onUnmounted } from 'vue'
import { CarouselPictureData } from '@/utils/testData'
import CarouselPictureItem from '@/components/carouselPictureItem/index.vue'

export default defineComponent({
  name: 'CarouselPicture',
  components: {
    CarouselPictureItem
  },
  props: {
    list: {
      type: Array as PropType<CarouselPictureData[]>,
      required: true
    }
  },
  setup(props) {
    const currentIdx = ref(0)
    const timer = setInterval(() => {
      currentIdx.value++
      if (currentIdx.value === props.list.length) currentIdx.value = 0
    }, 3000)

    return {
      currentIdx
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.carousel-picture {
  height: px2rem(300);
  overflow: hidden;
  position: relative;
  img {
    height: 100%;
    width: 100%;
  }
  .dots {
    position: absolute;
    display: flex;
    z-index: 1000;
    bottom: px2rem(10);
    left: 50%;
    transform: translate(-50%, 0);
    .dot {
      height: px2rem(20);
      width: px2rem(20);
      background: rgba($color: #ffffff, $alpha: 0.3);
      border-radius: 50%;
      margin: 0 px2rem(2);
    }
    .checked {
      background: #ffffff;
    }
  }
}
</style>
