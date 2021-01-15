interface StudentNav {
  name: string;
  url: string;
}

export const studentNavList: StudentNav[] = [
  {
    name: '首页',
    url: '/student/student-home'
  },
  {
    name: '我的',
    url: '/student/student-details'
  },
  {
    name: '订单列表',
    url: '/student/order-page'
  },
  {
    name: '分类搜索',
    url: '/student/food-sort'
  }
]
