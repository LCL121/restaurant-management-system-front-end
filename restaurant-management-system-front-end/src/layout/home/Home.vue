<template>
  <div class="home" ref="homeDOM">
    <h1>{{role}} home</h1>
    <div class="main">
      <div class="center" @mousemove.stop="">
        <nav v-if="role !== ADMIN_ROLE">
          <router-link
            :to="`/signin?role=${role}`"
            :class="{selected: index === 0}"
          >登录</router-link>
          <router-link
            :to="`/signup?role=${role}`"
            :class="{selected: index === 1}"
          >注册</router-link>
        </nav>
        <router-view :key="role" />
      </div>
    </div>
    <div class="square">
      <ul>
        <li
          v-for="i in 5"
          :key="i"
        ></li>
      </ul>
    </div>
    <div class="circle">
      <ul ref="circleULDOM">
        <li
          v-for="i in 5"
          :key="i"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, LocationQuery } from 'vue-router'
import { ADMIN_ROLE } from '@/utils/role'
import { homeDOM, circleULDOM, homeDOMEvent } from './ts/createBubble'

// type MyLocationQuery = {
//   role: string;
// } & LocationQuery

export default defineComponent({
  name: 'Home',
  setup () {
    const route = useRoute()

    const role = computed(() => {
      const role = route.query.role as string | null
      return role
    })

    const index = computed(() => {
      const layout = route.path
      if (layout === '/signin') {
        return 0
      } else {
        return 1
      }
    })

    onMounted(() => {
      if (document.documentElement.clientWidth > 500) {
        if (circleULDOM.value?.animate) {
          console.log('Your browser support Element.animate()')
          homeDOMEvent()
        } else {
          console.log('Your browser doesn\'t support Element.animate()')
        }
      }
    })

    return {
      index,
      ADMIN_ROLE,
      role,
      homeDOM,
      circleULDOM
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";
@import "./style/animation.scss";

$homeCenter: px2rem(380);

.selected {
  border-bottom: 2px black solid;
}

.home {
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(#ff5722, #ffc107);

  h1 {
    color: #fff;
    margin: 0;
    padding-top: px2rem(40);
    cursor: default;
    font-size: px2rem(60);
    @include textCenter(px2rem(80));
  }

  .main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .center {
      height: $homeCenter;
      width: $homeCenter;
      padding: px2rem(25);
      box-sizing: border-box;
      background: hsla(0, 0%, 100%, 0.8);
      z-index: 100;

      nav {
        display: flex;
        margin-bottom: px2rem(20);

        a {
          flex: 1;
          margin: 0 px2rem(20);
          font-weight: 700;
          box-sizing: border-box;
          @include textCenter(px2rem(40));
        }
      }
    }
  }
}
</style>
