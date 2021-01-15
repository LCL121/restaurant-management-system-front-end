<template>
  <div class="student">
    <student-global-header></student-global-header>
    <router-view class="student-main-view"/>
    <student-global-footer></student-global-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StudentGlobalHeader from '@/components/studentGlobalHeader/index.vue'
import StudentGlobalFooter from '@/components/studentGlobalFooter/index.vue'

export default defineComponent({
  name: 'Student',
  components: {
    StudentGlobalHeader,
    StudentGlobalFooter
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

.student {
  width: 100vw;
  .student-main-view {
    margin-top: $student-header-height;
  }
}
</style>
