import { FoodState } from './modules/recommendFood'
import { RoleState } from './modules/role'

export interface RootState {
  recommendFood: FoodState,
  role: RoleState
}
