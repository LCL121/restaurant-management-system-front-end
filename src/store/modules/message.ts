import { MessageProps } from '@/components/message/type'
import { MutationTree } from 'vuex'

export interface MessageState extends MessageProps {
  isShow: boolean;
}

const state: MessageState = {
  status: 'none',
  title: '',
  isShow: false
}

const mutations: MutationTree<MessageState> = {
  showMessage(state, newData: MessageProps) {
    state.status = newData.status
    state.title = newData.title
    state.isShow = true
  },
  hiddenMessage(state) {
    state.status = 'none'
    state.title = ''
    state.isShow = false
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
