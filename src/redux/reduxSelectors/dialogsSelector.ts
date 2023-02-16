import {AppStateType} from '../reduxStore'

export const getMessagesForChatDialogs = (state: AppStateType) => {
  return state.messagePage.chatMessage
}
export const getStatusForChatDialogs = (state: AppStateType) => {
  return state.messagePage.chatStatus
}
