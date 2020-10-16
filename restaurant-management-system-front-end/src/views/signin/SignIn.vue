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
      <button @click="signin">登录</button>
    </div>
    <router-link
      v-if="role === 'student'"
      to="/signin?role=business"
    >商家登录</router-link>
    <router-link
      v-else
      to="/signin?role=student"
    >学生登录</router-link>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  reactive,
  toRefs,
  computed,
  watch,
  watchEffect,
  onMounted
} from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'

interface Inputs {
  accountNumberId: string;
  type: string;
  pattern: string;
  placeholder: string;
  accountNumber: string;
  password: string;
}

interface InputDOMStatus {
  (): boolean;
}

export default defineComponent({
  name: 'SignIn',
  setup (props, context) {
    const route = useRoute()
    const router = useRouter()

    // const getAccountInputInfo = (role: string) => {
    //   if (role === )
    // }

    const inputs: Inputs = reactive({
      accountNumberId: `${route.query.role}Id`,
      type: 'text',
      pattern: '',
      placeholder: '学号',
      accountNumber: '201801001116',
      password: '123abcABC'
    })

    const role = computed(() => route.query.role)

    const accountNumberDOM = ref<HTMLInputElement>()
    const passwordDOM = ref<HTMLInputElement>()

    const studentNumberStatus: InputDOMStatus = () =>
      Boolean(accountNumberDOM.value && accountNumberDOM.value.validity.valid)
    const passwordStatus: InputDOMStatus = () =>
      Boolean(passwordDOM.value && passwordDOM.value.validity.valid)

    const signin = (e: Event) => {
      if (studentNumberStatus() && passwordStatus()) {
        console.log('登录表单提交成功!')
        router.push('/student/student-home')
      }
    }

    watchEffect(() => {
      if (route.fullPath.includes('/signin')) {
        const { role, key } = route.query
        if (
          (role !== 'student' && role !== 'business' && role !== 'admin') ||
          (role === 'admin' && key !== '2000')
        ) {
          router.push({ name: 'SignIn', query: { role: 'student' } })
        }
      }
    })

    return {
      ...toRefs(inputs),
      role,
      accountNumberDOM,
      passwordDOM,
      signin
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
