<template>
  <form class="sign-in">
    <div class="fm-input">
      <template v-if="key === 'student'">
        <label for="studentNumber"></label>
        <input
          type="text"
          id="studentNumber"
          placeholder="学号"
          pattern="^\d{12}$"
          autocomplete
          required
          ref="studentNumber"
          v-model="studentNumber"
          v-focus
        >
      </template>
      <template v-else-if="key === 'business'">
        <label for="businessEmail"></label>
        <input
          type="email"
          id="businessEmail"
          placeholder="邮箱"
          autocomplete
          required
          ref="businessEmail"
          v-model="businessEmail"
          v-focus
        >
      </template>
      <template v-else>
        <label for="adminId"></label>
        <input
          type="text"
          id="adminId"
          placeholder="账号"
          pattern=".{1,64}"
          autocomplete
          required
          ref="adminId"
          v-model="adminId"
          v-focus
        >
      </template>
    </div>
    <div class="fm-input">
      <label for="password"></label>
      <input
        type="password"
        id="password"
        placeholder="密码 8-64位，包含大小写字母、数字"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,64}$"
        required
        ref="password"
        autocomplete
        v-model="password"
      >
    </div>
    <div class="fm-button">
      <button @submit.prevent="signin">登录</button>
    </div>
    <router-link
      v-if="key !== 'admin'"
      :to="`/signup?role=${key}`"
    >注册</router-link>
    <router-link
      v-else
      to="/signin?role=student"
    >其他登录</router-link>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
  name: 'SignIn',
  data () {
    return {
      studentNumber: '',
      businessEmail: '',
      adminId: '',
      password: ''
    }
  },
  computed: {
    key () {
      return this.$route.query.role
    }
  },
  watch: {
    $route (to: RouteLocationNormalized, from: RouteLocationNormalized) {
      const { role, key } = to.query
      if (
        (role !== 'student' && role !== 'business' && role !== 'admin') ||
        (role === 'admin' && key !== '2000')
      ) {
        this.$router.push({ name: 'SignIn', query: { role: 'student' } })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const { role, key } = to.query
    if (
      (role !== 'student' && role !== 'business' && role !== 'admin') ||
      (role === 'admin' && key !== '2000')
    ) {
      next({ name: 'SignIn', query: { role: 'student' } })
    }
    next()
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
