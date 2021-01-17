import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import '@/icon/iconfont.js'
// import './router/permission'
import focus from '@/directive/focus'

import '@/style/index.scss'
import { mockFoodList, mockFoodDetails } from '@/utils/mock'

mockFoodList()
mockFoodDetails()

if (process.env.VUE_APP_TESTAPI) {
  import('@/tryFiles/tryAPI')
    .then((module) => {
      console.log('已开启Test API 模式！')
      module.tryAPI()
    })
}

// 以500px 为界，<= 500px 为手机端，>500px 为电脑端
const clientWidth = document.documentElement.clientWidth
if (clientWidth < 500) {
  document.documentElement.style.fontSize = clientWidth / 5 + 'px'
} else {
  document.documentElement.style.fontSize = '100px'
}

createApp(App)
  .use(store)
  .use(router)
  .directive('focus', focus)
  .mount('#app')
