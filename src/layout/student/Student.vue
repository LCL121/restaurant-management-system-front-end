<template>
  <div class="student">
    <nav class="student-nav">nav</nav>
    <div class="student-detail">
      <div class="student-list">
        <div class="student-list-center">
          <router-link v-for="item in studentNavList" :key="item.name" :to="item.url">{{item.name}}</router-link>
        </div>
      </div>
      <router-view class="student-view" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { studentNavList } from './ts/studentInit'

export default defineComponent({
  name: 'Student',
  setup () {
    return {
      studentNavList
    }
  }
})
</script>

<style scoped lang="scss">
@import "./style/pc.scss";
@import "./style/mobile.scss";
</style>
