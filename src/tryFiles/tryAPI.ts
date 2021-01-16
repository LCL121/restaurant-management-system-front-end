import axios from 'axios'
import qs from 'qs'

export const tryAPI: () => void = () => {
  console.log('调用tryAPI 函数')
  axios.request({
    url: '/api/dbcourse/user/login',
    method: 'post',
    data: qs.stringify({
      id: '123456786@qq.com',
      password: '123abcABC'
    })
  })
    .then(res => {
      console.log(res)
    })
}
