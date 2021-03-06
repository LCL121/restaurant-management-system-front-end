import { createStore } from 'vuex'
import role from './modules/role'
import recommendFood from './modules/recommendFood'
import message from './modules/message'
import { RootState } from './type'

export default createStore<RootState>({
  modules: {
    role,
    recommendFood,
    message
  }
})
