import { createStore } from 'vuex'
import role, { RoleState } from './modules/role'

interface Store {
  role: RoleState;
}

export default createStore<Store>({
  modules: {
    role
  }
})
