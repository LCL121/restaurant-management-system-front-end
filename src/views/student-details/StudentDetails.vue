<template>
  <div class="student-details">
    student details
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import { STUDENT_ROLE } from '@/utils/role'

export default defineComponent({
  name: 'StudentDetails',
  beforeRouteEnter (to, from, next) {
    if (!store.state.role.student.email) {
      next({ name: 'SignIn', query: { role: STUDENT_ROLE } })
    }
    next()
  }
})
</script>

<style scoped lang="scss">
</style>
