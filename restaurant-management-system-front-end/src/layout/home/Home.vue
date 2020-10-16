<template>
  <div class="home">
    <h1>{{role}} home</h1>
    <div class="main">
      <div class="center">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ADMIN_ROLE } from '@/utils/role'

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

    return {
      index,
      ADMIN_ROLE,
      role
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

$homeCenter: px2rem(380);

.selected {
  border-bottom: 2px black solid;
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: gray;

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
      height: $homeCenter;
      width: $homeCenter;
      padding: px2rem(25);
      box-sizing: border-box;
      background: hsla(0, 0%, 100%, 0.7);

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
