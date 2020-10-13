<template>
  <div class="home">
    <h1>{{key}} home</h1>
    <div class="main">
      <nav v-if="key !== 'admin'">
        <router-link to="/signin?role=student">学生</router-link>
        <router-link to="/signin?role=business">商家</router-link>
      </nav>
      <div class="center">
        <router-view :key="key" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  computed: {
    key () {
      return this.$route.query.role
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    padding-top: px2rem(20);
    cursor: default;
    @include textCenter(px2rem(60));
  }

  .main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .center {

    }
  }
}
</style>
