<template>
  <form
    @submit.prevent=""
    class="sign-up"
  >
    <div
      class="fm-input"
      v-for="(item, index) in data"
      :key="index"
      :class="{'code-input': item.id === 'codeId'}"
    >
      <label :for="item.id"></label>
      <input
        :type="item.type"
        :id="item.id"
        :placeholder="item.placeholder"
        :pattern="item.pattern"
        autocomplete
        required
        :ref="item.refDom"
        v-model="item.value"
        @blur="judgePasswordSame(data, index)"
      >
      <button
        v-if="item.id === 'codeId'"
        class="code-button"
        @click="sendCode"
      >{{codeButtonText}}</button>
    </div>
    <div class="fm-button">
      <button @click="signUp">注册</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, watchEffect, computed, reactive } from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import { STUDENT_ROLE, BUSINESS_ROLE } from '@/utils/role'
import { data } from './ts/initInputs'
import {
  emailDOM,
  passwordDOM,
  confirmDOM,
  codeDOM,
  operateSendCode,
  operateSignUp,
  codeButtonText,
  judgePasswordSame
} from './ts/operateInputs'

export default defineComponent({
  name: 'SignUp',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const role = computed(() => {
      const role = route.query.role as string | null
      return role
    })

    const sendCode = () => {
      operateSendCode(data[0])
    }

    const signUp = () => {
      operateSignUp(router, role.value, data)
    }

    // 进一步登录页面权限控制
    watchEffect(() => {
      if (route.fullPath.includes('/signup')) {
        const { role } = route.query
        if (role !== STUDENT_ROLE && role !== BUSINESS_ROLE) {
          router.push({ name: 'SignUp', query: { role: STUDENT_ROLE } })
        }
      }
    })

    return {
      role,
      STUDENT_ROLE,
      data,
      signUp,
      emailDOM,
      passwordDOM,
      confirmDOM,
      codeDOM,
      sendCode,
      codeButtonText,
      judgePasswordSame
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

$fontColorA: #6c6c6c;

.sign-up {
  & > a {
    float: right;
    margin-right: 10%;
    color: $fontColorA;
    font-size: 14px;
  }

  .code-input {
    .code-button {
      position: absolute;
      @include textCenter(px2rem(38));
      transform: translateX(-120%);
      background: #f9f9f9;
      top: px2rem(1);
      font-size: 13px;
      color: #6c6c6c;
      cursor: pointer;
    }
  }
}
</style>
