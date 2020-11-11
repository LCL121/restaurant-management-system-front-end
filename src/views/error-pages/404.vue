<template>
  <div class="404">
    404
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  name: '404',
  mounted () {
    console.log(store.state)
  }
})
</script>

<style scoped lang="scss">
</style>
