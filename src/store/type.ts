import { FoodState } from './modules/recommendFood'
import { RoleState } from './modules/role'
import { MessageState } from './modules/message'

export interface RootState {
  recommendFood: FoodState,
  role: RoleState,
  message: MessageState
}
