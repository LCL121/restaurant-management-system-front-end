import { reactive } from 'vue'

interface StudentNav {
  name: string;
  url: string;
  checked: boolean;
  icon: string;
  fillIcon: string;
}

export const studentNavList = reactive<StudentNav[]>([
  {
    name: '首页',
    url: '/student/student-home',
    checked: false,
    icon: 'home',
    fillIcon: 'homefill'
  },
  {
    name: '我的',
    url: '/student/student-details',
    checked: false,
    icon: 'my',
    fillIcon: 'myfill'
  },
  {
    name: '订单列表',
    url: '/student/order-page',
    checked: false,
    icon: 'form',
    fillIcon: 'formfill'
  },
  {
    name: '分类搜索',
    url: '/student/food-sort',
    checked: false,
    icon: 'search',
    fillIcon: 'searchfill'
  }
])

export const changeChecked = (currentPath: string) => {
  studentNavList.map(item => {
    if (item.url === currentPath) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
}
