<template>
  <div class="sign-up">
    sign up
    <router-link :to="`/signin?role=${key}`">登录</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { STUDENT_ROLE, BUSINESS_ROLE } from '@/utils/role'

export default defineComponent({
  name: 'SignUp',
  computed: {
    key () {
      return this.$route.query.role
    }
  },
  watch: {
    $route (to: RouteLocationNormalized) {
      const { role } = to.query
      if (role !== STUDENT_ROLE && role !== BUSINESS_ROLE) {
        this.$router.push({ name: 'SignUp', query: { role: STUDENT_ROLE } })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const { role } = to.query
    if (role !== STUDENT_ROLE && role !== BUSINESS_ROLE) {
      next({ name: 'SignUp', query: { role: STUDENT_ROLE } })
    }
    next()
  }
})
</script>

<style scoped lang="scss">
</style>
