import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios, { AxiosResponse } from 'axios'
import { RootState } from '@/store/type'

export interface Food {
  foodId: number;
  name: string;
  price: number;
  taste: string;
  wicketId: number;
  image: string;
}

export type FoodList = Food[]

export interface FoodState {
  foodList: FoodList;
  currentPage: number;
  pageSize: number;
  finish: boolean;
  pending: boolean;
}

const state: FoodState = {
  foodList: [],
  currentPage: 1,
  pageSize: 6,
  finish: false,
  pending: false
}

const getters: GetterTree<FoodState, RootState> = {

}

const mutations: MutationTree<FoodState> = {
  addCurrentPage(state) {
    state.currentPage++
  },
  changeFinishState(state) {
    state.finish = true
  },
  changePendingState(state, newSate: boolean) {
    state.pending = newSate
  },
  fetchFoodList(state, payload: FoodList) {
    payload.map(item => {
      state.foodList.push(item)
    })
  }
}

const actions: ActionTree<FoodState, RootState> = {
  fetchFoodList({ state, commit }) {
    if (!state.finish && !state.pending) {
      commit('changePendingState', true)
      axios.get(`/api/dbcourse/food/list?page=${state.currentPage}&size=${state.pageSize}`)
        .then((res: AxiosResponse<{
          data: FoodList;
        }>) => {
          const list = res.data.data
          if (list.length === 0) {
            commit('changeFinishState')
          } else {
            commit('addCurrentPage')
            commit('fetchFoodList', res.data.data)
          }
        })
        .finally(() => {
          commit('changePendingState', false)
        })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
