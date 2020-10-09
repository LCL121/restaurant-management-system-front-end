<template>
  <div class="student">
    student
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Student'
})
</script>

<style scoped lang="scss">
</style>
