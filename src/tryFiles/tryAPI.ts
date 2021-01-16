import axios from 'axios'

export const tryAPI: () => void = () => {
  console.log('调用tryAPI 函数')
  axios.get('/api/dbcourse/food/list?currentPage=0&pageSize=6')
    .then(res => {
      console.log(res)
    })
  axios.get('/api/dbcourse/food/list?currentPage=1&pageSize=6')
    .then(res => {
      console.log(res)
    })
}
