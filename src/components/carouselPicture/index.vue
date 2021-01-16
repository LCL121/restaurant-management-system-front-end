<template>
  <div
    class="carousel-picture"
    @touchStart="touchStart"
    @touchEnd="touchEnd"
    @touchMove="touchMove"
  >
    <carousel-picture-item
      v-for="(item, index) in list"
      :key="item.imgSrc"
      :imgSrc="item.imgSrc"
      :url="item.url"
      :currentIndex="currentIdx"
      :maxIndex="list.length - 1"
      :index="index"
      :moveDistance="moveDistance"
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
import { CarouselPictureData } from './type'
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
    const sleepTime = 5000
    const currentScreenX = window.innerWidth
    const boundaryX = currentScreenX / 4
    let startX = 0
    let startTime = 0
    const moveDistance = ref(0)
    let timer = setInterval(() => {
      currentIdx.value++
      if (currentIdx.value === props.list.length) currentIdx.value = 0
    }, sleepTime)

    const touchStart = (event: TouchEvent) => {
      clearInterval(timer)
      startX = event.touches[0].pageX
      startTime = new Date().getTime()
      timer = 0
    }

    const touchMove = (event: TouchEvent) => {
      console.log('touch move')
      moveDistance.value = event.changedTouches[0].pageX - startX
    }

    const touchEnd = (event: TouchEvent) => {
      const x = event.changedTouches[0].pageX - startX
      const t = new Date().getTime() - startTime
      if (t >= 150) {
        if (x < -boundaryX) {
          currentIdx.value++
        } else if (x > boundaryX) {
          currentIdx.value--
        } else {
          moveDistance.value = 0
        }
      } else {
        x < 0 ? currentIdx.value++ : currentIdx.value--
      }
      if (currentIdx.value === props.list.length) currentIdx.value = 0
      if (currentIdx.value === -1) currentIdx.value = props.list.length - 1
      startX = 0
      if (!timer) {
        timer = setInterval(() => {
          currentIdx.value++
          if (currentIdx.value === props.list.length) currentIdx.value = 0
        }, sleepTime)
      }
    }

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      currentIdx,
      touchStart,
      touchMove,
      touchEnd,
      moveDistance
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
