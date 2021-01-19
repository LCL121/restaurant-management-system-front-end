<template>
  <router-view />
  <message
    :status="messageStatus"
    :title="messageTitle"
    v-if="isShowMessage"
  ></message>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/store/type'
import Message from '@/components/message/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Message
  },
  setup() {
    const store = useStore<RootState>()
    const messageStatus = computed(() => store.state.message.status)
    const messageTitle = computed(() => store.state.message.title)
    const isShowMessage = computed(() => store.state.message.isShow)

    return {
      messageStatus,
      messageTitle,
      isShowMessage
    }
  }
})
</script>
