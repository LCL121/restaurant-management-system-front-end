<template>
  <div class="dropdown-mask"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'DropdownMask',
  setup() {
    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
      document.body.style.overflow = 'auto'
    })
  }
})
</script>

<style scoped lang="scss">
.dropdown-mask {
  position: absolute;
  background: rgba($color: #000000, $alpha: 0.5);
  height: 100%;
  width: 100%;
  border: none;
  z-index: 100;
}
</style>
