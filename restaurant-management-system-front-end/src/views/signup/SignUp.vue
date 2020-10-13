<template>
  <div class="sign-up">
    sign up
    <router-link :to="`/signin?role=${key}`">登录</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
  name: 'SignUp',
  computed: {
    key () {
      return this.$route.query.role
    }
  },
  watch: {
    $route (to: RouteLocationNormalized, from: RouteLocationNormalized) {
      const { role, key } = to.query
      if (role !== 'student' && role !== 'business') {
        this.$router.push({ name: 'SignUp', query: { role: 'student' } })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const { role, key } = to.query
    if (role !== 'student' && role !== 'business') {
      next({ name: 'SignUp', query: { role: 'student' } })
    }
    next()
  }
})
</script>

<style scoped lang="scss">
</style>
