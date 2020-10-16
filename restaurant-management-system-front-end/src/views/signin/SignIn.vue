<template>
  <form
    class="sign-in"
    @submit.prevent=""
  >
    <div class="fm-input">
      <label :for="accountNumberId"></label>
      <input
        :type="type"
        :id="accountNumberId"
        :placeholder="placeholder"
        :pattern="pattern"
        autocomplete
        required
        ref="accountNumberDOM"
        v-model="accountNumber"
        v-focus
      >
    </div>
    <div class="fm-input">
      <label for="password"></label>
      <input
        type="password"
        id="password"
        placeholder="密码 8-16位，包含大小写字母、数字"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$"
        required
        ref="passwordDOM"
        autocomplete
        v-model="password"
      >
    </div>
    <div class="fm-button">
      <button @click="signIn">登录</button>
    </div>
    <router-link
      v-if="role === STUDENT_ROLE"
      to="/signin?role=business"
    >商家登录</router-link>
    <router-link
      v-else
      to="/signin?role=student"
    >学生登录</router-link>
  </form>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { STUDENT_ROLE, BUSINESS_ROLE, ADMIN_ROLE } from '@/utils/role'
import { Inputs, getAccountInputInfo } from './ts/initInputs'
import { accountNumberDOM, passwordDOM, operateSignIn } from './ts/operateInputs'

export default defineComponent({
  name: 'SignIn',
  setup (props, context) {
    const route = useRoute()
    const router = useRouter()

    const role = computed(() => {
      const role = route.query.role as string | null
      return role
    })

    // 初始化所有的input 框
    const inputs: Inputs = getAccountInputInfo(role.value)

    const signIn = () => {
      operateSignIn(router, role.value)
    }

    // 进一步登录页面权限控制
    watchEffect(() => {
      if (route.fullPath.includes('/signin')) {
        const { role, key } = route.query
        if (
          (role !== STUDENT_ROLE && role !== BUSINESS_ROLE && role !== ADMIN_ROLE) ||
          (role === ADMIN_ROLE && key !== '2000')
        ) {
          router.push({ name: 'SignIn', query: { role: STUDENT_ROLE } })
        }
      }
    })

    return {
      ...toRefs(inputs),
      role,
      accountNumberDOM,
      passwordDOM,
      signIn,
      STUDENT_ROLE
    }
  }
})
</script>

<style scoped lang="scss">
$fontColorA: #6c6c6c;

.sign-in {
  & > a {
    float: right;
    margin-right: 10%;
    color: $fontColorA;
    font-size: 14px;
  }
}
</style>
