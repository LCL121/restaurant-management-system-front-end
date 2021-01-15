<template>
  <footer class="student-global-footer">
    <span
      class="student-nav-item"
      v-for="item in studentNavList"
      :key="item.name"
      @click="goTo(item.url)"
    >
      <svg
        class="icon student-nav-item-icon"
        aria-hidden="true"
      >
        <use v-if="!item.checked" :xlink:href="`#icon-${item.icon}`"></use>
        <use v-else :xlink:href="`#icon-${item.fillIcon}`"></use>
      </svg>
      <span class="student-nav-item-title">{{item.name}}</span>
    </span>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { studentNavList, changeChecked } from './ts/studentInit'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'StudentGlobalFooter',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentPath = computed(() => route.path)
    const goTo = (path: string) => {
      router.push(path)
    }

    changeChecked(currentPath.value)

    watch(currentPath, (newValue, oldValue) => {
      changeChecked(newValue)
    })

    return {
      studentNavList,
      goTo
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.student-global-footer {
  position: fixed;
  height: $student-footer-height;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  background-color: #ffffff;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #f8f8f8;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 px2rem(20);
  .student-nav-item {
    flex: 1;
    max-width: px2rem(75);
    font-size: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: px2rem(3) 0;
    align-items: center;
    .student-nav-item-icon {
      font-size: calc(#{$student-footer-height - px2rem(6)} - 18px);
    }
    .student-nav-item-title {
      height: 16px;
    }
  }
}
</style>
