<template>
  <div
    class="home"
    ref="homeDOM"
  >
    <h1>{{role}} home</h1>
    <div class="main">
      <div
        class="center"
        @mousemove.stop=""
      >
        <nav v-if="role !== ADMIN_ROLE">
          <router-link
            :to="`/home/signin?role=${role}`"
            :class="{selected: index === 0}"
          >登录</router-link>
          <router-link
            :to="`/home/signup?role=${role}`"
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
      <ul>
        <li
          v-for="i in 5"
          :key="i"
        ></li>
      </ul>
      <transition-group name="bubble">
        <div
          class="bubble"
          v-for="item in bubbleList"
          :key="item.id"
          :style="item.style"
        ></div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, LocationQuery } from 'vue-router'
import store from '@/store'
import { ADMIN_ROLE } from '@/utils/role'
import { homeDOM, homeDOMEvent, bubbleList } from './ts/createBubble'

// type MyLocationQuery = {
//   role: string;
// } & LocationQuery

export default defineComponent({
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    store.dispatch('role/getUserInfo')
      .then((res: number) => {
        if (res === 0) {
          next('/student')
        } else if (res === 1) {
          next('/business')
        } else if (res === 2) {
          next('/admin')
        } else {
          next()
        }
      })
  },
  setup () {
    const route = useRoute()

    const role = computed(() => {
      const role = route.query.role as string | null
      return role
    })

    const index = computed(() => {
      const layout = route.path
      if (layout === '/home/signin') {
        return 0
      } else {
        return 1
      }
    })

    onMounted(() => {
      if (document.documentElement.clientWidth > 500) {
        homeDOMEvent()
      }
    })

    return {
      index,
      ADMIN_ROLE,
      role,
      homeDOM,
      bubbleList
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
