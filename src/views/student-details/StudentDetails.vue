<template>
  <div class="student-details">
    <div class="student-info">
      <div class="student-name">昵称：{{studentName}}</div>
      <div class="student-email">邮箱：{{studentEmail}}</div>
      <div class="student-number">学号：{{studentNumber}}</div>
    </div>
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { RootState } from '@/store/type'
import { STUDENT_ROLE } from '@/utils/role'

export default defineComponent({
  name: 'StudentDetails',
  setup() {
    const store = useStore<RootState>()
    const router = useRouter()
    const studentName = computed(() => store.state.role.student.name)
    const studentEmail = computed(() => store.state.role.student.email)
    const studentNumber = computed(() => {
      const studentNumber = store.state.role.student.studentNumber
      if (studentNumber === '') return '无'
      else return studentNumber
    })
    const logout = () => {
      store.dispatch('role/logout', studentEmail.value)
        .then((res: boolean) => {
          if (res) {
            router.push('/home')
          }
        })
    }

    return {
      studentName,
      studentEmail,
      studentNumber,
      logout
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/style/index.scss";

.student-details {
  min-height: calc(100vh - #{$student-header-height + $student-footer-height});
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .student-info {
    div {
      margin: px2rem(10) 0;
    }
  }
  .logout {
    margin-top: px2rem(50);
    background: #f40;
    color: #fff;
    @include textCenter(px2rem(40));
    width: px2rem(150);
    border-radius: 4px;
    border: 0;
  }
}
</style>
