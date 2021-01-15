<template>
  <div
    class="carousel-picture-item"
    :style="`z-index: ${zIndex}; width: 100%; height: 100%; position: absolute; opacity: 1; transition-duration: ${transitionDuration}ms; transform: translate(${translateX}px, 0px) translateZ(0px);`"
  >
    <a :href="url">
      <img :src="imgSrc" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'CarouselPictureItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    maxIndex: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    }
  },
  setup(props) {
    // const currentScreenX = screen.width
    const currentScreenX = window.innerWidth
    const boundary = currentScreenX / 2
    const modNumer = props.maxIndex + 1
    const data = reactive({
      translateX: 0,
      // 倒叙，使初始化不会有覆盖
      zIndex: 100 - props.index,
      // 一般为0ms，只有当有元素移动时设为300ms，使非移动调换位置时不会出现覆盖
      transitionDuration: 0
    })

    // 初始化
    if (props.index === props.currentIndex + 1) {
      data.translateX = currentScreenX
    }
    if (props.index === props.maxIndex) {
      data.translateX = -currentScreenX
    }

    watch(() => props.currentIndex, (newValue, oldValue) => {
      if ((newValue + modNumer) % (modNumer) === (oldValue + modNumer + 1) % (modNumer)) {
        if (props.index === (newValue + modNumer) % (modNumer)) {
          data.translateX = 0
          data.transitionDuration = 300
          setTimeout(() => {
            data.transitionDuration = 0
          }, 300)
        } else if (props.index === (newValue + 1 + modNumer) % (modNumer)) {
          data.translateX = currentScreenX
        } else if (props.index === (newValue - 1 + modNumer) % (modNumer)) {
          data.translateX = -currentScreenX
          data.transitionDuration = 300
          setTimeout(() => {
            data.transitionDuration = 0
          }, 300)
        }
      }
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang="scss">
.carousel-picture-item {
  a {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
