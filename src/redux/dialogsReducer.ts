import {InferActionType, ThankTypeCreator} from './reduxStore'
import {chatStatusType, messageResponseType} from '../types/types'
import {chatApi} from '../api/chatApi'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

type messageResponseWishIdType = messageResponseType & {id: string}
const initialState = {
  chatMessage: [] as messageResponseWishIdType[],
  chatStatus: 'pending' as chatStatusType,
}

export const actionsDialog = {
  SetMessageForChat: (messages: messageResponseType[], clear = false) =>
    ({
      type: 'dialog/SET-MESSAGE-FOR-CHAT',
      messages,
      clear,
    } as const),
  StatusChangeForChat: (status: chatStatusType) =>
    ({
      type: 'dialog/STATUS-CHANGE-FOR-CHAT',
      status,
    } as const),
}

const dialogReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'dialog/SET-MESSAGE-FOR-CHAT': {
      return {
        ...state,
        chatMessage: action.clear
          ? []
          : [
              ...state.chatMessage,
              ...action.messages.map((m) => ({...m, id: v1()})),
            ],
      }
    }
    case 'dialog/STATUS-CHANGE-FOR-CHAT': {
      return {
        ...state,
        chatStatus: action.status,
      }
    }

    default:
      return state
  }
}
let _newMessageHandler: ((messages: messageResponseType[]) => void) | null =
  null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (message) => {
      dispatch(actionsDialog.SetMessageForChat(message))
    }
  }
  return _newMessageHandler
}
let _statusHandler: ((status: chatStatusType) => void) | null = null

const StatusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusHandler === null) {
    _statusHandler = (status) => {
      dispatch(actionsDialog.StatusChangeForChat(status))
    }
  }
  return _statusHandler
}

export const startMessagesListening = (): ThankType => async (dispatch) => {
  chatApi.start()
  chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.subscribe('status-changed', StatusChangedHandlerCreator(dispatch))
}
export const closeMessagesListening = (): ThankType => async (dispatch) => {
  chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.unsubscribe('status-changed', StatusChangedHandlerCreator(dispatch))
}
export const sendMessageForChat =
  (message: string): ThankType =>
  async (dispatch) => {
    chatApi.sendMessage(message)
  }

export default dialogReducer

type initialStateType = typeof initialState
export type ActionTypes = InferActionType<typeof actionsDialog>
export type ThankType = ThankTypeCreator<ActionTypes>
