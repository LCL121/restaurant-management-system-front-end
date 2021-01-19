<template>
  <header class="student-global-nav">餐厅管理系统</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentGlobalHeader'
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.student-global-nav {
  background: rgb(255, 133, 42);
  @include textCenter($student-header-height);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  cursor: default;
}
</style>
