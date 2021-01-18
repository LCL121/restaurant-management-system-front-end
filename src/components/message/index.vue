<template>
  <teleport to='#message'>
    <div class="message" :style="style">
      <div class="message-title">message</div>
      <svg
        class="icon message-icon"
        aria-hidden="true"
        @click="hidden"
      >
        <use xlink:href="#icon-guanbi"></use>
      </svg>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, reactive } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/store/type'
import { MessageStatus } from './type'
import { style, getStyle } from './index'

export default defineComponent({
  name: 'Message',
  props: {
    status: {
      type: String as PropType<MessageStatus>,
      default: 'success'
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore<RootState>()
    const div = document.createElement('div')
    const hidden = () => {
      store.commit('message/hiddenMessage')
    }

    div.id = 'message'
    document.body.appendChild(div)
    getStyle(props.status)

    setTimeout(() => {
      store.commit('message/hiddenMessage')
    }, 2000)

    onUnmounted(() => {
      document.body.removeChild(div)
    })

    return {
      style,
      hidden
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

.message {
  position: fixed;
  top: calc(#{$student-header-height + px2rem(10)});
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  border-radius: 4px;
  border: 1px solid transparent;
  padding: px2rem(16);
  z-index: 1002;
  display: flex;
  justify-content: space-between;
  .message-title {
    @include textCenter(px2rem(70));
    flex: 1;
  }
  .message-icon {
    @include textCenter(px2rem(70));
  }
}
</style>
