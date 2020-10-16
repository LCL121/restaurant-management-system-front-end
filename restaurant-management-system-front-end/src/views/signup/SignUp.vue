<template>
  <form
    @submit.prevent=""
    class="sign-up"
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
      <button @click="signUp">注册</button>
    </div>
    <router-link
      v-if="role === STUDENT_ROLE"
      to="/signup?role=business"
    >商家注册</router-link>
    <router-link
      v-else
      to="/signup?role=student"
    >学生注册</router-link>
  </form>
</template>

<script lang="ts">
import { defineComponent, watchEffect, computed } from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import { STUDENT_ROLE, BUSINESS_ROLE } from '@/utils/role'

export default defineComponent({
  name: 'SignUp',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const role = computed(() => {
      const role = route.query.role as string | null
      console.log(role === STUDENT_ROLE)
      return role
    })

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
      STUDENT_ROLE
    }
  }
})
</script>

<style scoped lang="scss">
$fontColorA: #6c6c6c;

.sign-up {
  & > a {
    float: right;
    margin-right: 10%;
    color: $fontColorA;
    font-size: 14px;
  }
}
</style>
