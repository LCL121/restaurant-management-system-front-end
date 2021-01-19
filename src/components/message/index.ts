import { reactive } from 'vue'
import { MessageStyle, MessageStatus } from './type'

export const style = reactive<MessageStyle>({
  backgroundColor: '',
  borderColor: '',
  color: ''
})

export const getStyle = (status: MessageStatus) => {
  if (status === 'success') {
    style.backgroundColor = '#d1e7dd'
    style.borderColor = '#badbcc'
    style.color = '#0f5132'
  } else if (status === 'fail') {
    style.backgroundColor = '#f8d7da'
    style.borderColor = '#f5c2c7'
    style.color = '#842029'
  } else if (status === 'none') {
    style.backgroundColor = ''
    style.borderColor = ''
    style.color = ''
  }
}
