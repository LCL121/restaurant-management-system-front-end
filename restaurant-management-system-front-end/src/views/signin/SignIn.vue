<template>
  <div class="sign-in">
    sign in
    <router-link :to="`/signup?role=${key}`">注册</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
  name: 'SignIn',
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
</style>
