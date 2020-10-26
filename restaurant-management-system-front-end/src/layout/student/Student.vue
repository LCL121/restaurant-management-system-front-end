<template>
  <div class="student">
    <div class="student-search">
      <svg
        class="icon icon-search"
        aria-hidden="true"
      >
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
    <nav class="student-nav">nav</nav>
    <div class="student-detail">
      <div class="student-list">list</div>
      <router-view class="student-view" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Student'
})
</script>

<style scoped lang="scss">
@import "./style/pc.scss";
@import "./style/mobile.scss";
</style>
