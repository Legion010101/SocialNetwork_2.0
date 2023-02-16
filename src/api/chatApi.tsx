import {chatStatusType, messageResponseType} from '../types/types'

let subscribes = {
  'messages-received': [] as MessagesReceivedSubscribeType[],
  'status-changed': [] as StatusTypeSubscribeType[],
}

type eventNamesType = 'messages-received' | 'status-changed'

let ws: WebSocket | null = null
const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChanel, 3000)
}
const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('Restart Page')
}

const messageHandler = (e: MessageEvent) => {
  let messagesResponse = JSON.parse(e.data)
  subscribes['messages-received'].forEach((s) => s(messagesResponse))
}
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: chatStatusType) => {
  subscribes['status-changed'].forEach((s) => s(status))
}

function createChanel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  )
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChanel()
  },
  stop() {
    subscribes['messages-received'] = []
    subscribes['status-changed'] = []

    cleanUp()
    ws?.close()
  },
  subscribe(eventName: eventNamesType, callback: any) {
    subscribes[eventName].push(callback)

    return () => {
      // @ts-ignore
      subscribes[eventName] = subscribes[eventName].filter(
        (s: MessagesReceivedSubscribeType | StatusTypeSubscribeType) =>
          s !== callback,
      )
    }
  },
  unsubscribe(
    eventName: eventNamesType,
    callback: MessagesReceivedSubscribeType | StatusTypeSubscribeType,
  ) {
    // @ts-ignore
    subscribes[eventName] = subscribes[eventName].filter(
      (s: MessagesReceivedSubscribeType | StatusTypeSubscribeType) =>
        s !== callback,
    )
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}
type MessagesReceivedSubscribeType = (message: messageResponseType[]) => void
type StatusTypeSubscribeType = (status: chatStatusType) => void
