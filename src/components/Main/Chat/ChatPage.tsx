import React, {FC, useEffect, useRef, useState} from 'react'
import {Avatar} from '../../../common/Avatar'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {
  getMessagesForChatDialogs,
  getStatusForChatDialogs,
} from '../../../redux/reduxSelectors/dialogsSelector'
import {
  actionsDialog,
  closeMessagesListening,
  sendMessageForChat,
  startMessagesListening,
  ActionTypes,
} from '../../../redux/dialogsReducer'
import styles from './ChatPage.module.css'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/reduxStore'
import {Navigate, NavLink} from 'react-router-dom'
import {
  getDataUserAuth,
  getIsAuth,
} from '../../../redux/reduxSelectors/authSelector'
import classnames from 'classnames'

const ChatPage = () => {
  const isAuth = useSelector(getIsAuth)
  const dispatch: ThunkDispatch<AppStateType, any, ActionTypes> = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(closeMessagesListening())
      dispatch(actionsDialog.SetMessageForChat([], true))
    }
  }, [])

  if (!isAuth) return <Navigate to={'/login'} />
  return (
    <div>
      <Chat />
      <NewMessageForChat />
    </div>
  )
}

const Chat: FC = () => {
  const messages = useSelector(getMessagesForChatDialogs)
  const scrollDown = useRef<HTMLDivElement>(null)
  const [isScroll, setIsScroll] = useState(true)

  useEffect(() => {
    if (isScroll) scrollDown.current?.scrollIntoView()
  }, [messages])

  const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scroll = event.currentTarget
    if (
      Math.abs(scroll.scrollHeight - scroll.scrollTop) - scroll.clientHeight <
      300
    ) {
      !isScroll && setIsScroll(true)
    } else {
      isScroll && setIsScroll(false)
    }
  }

  return (
    <div className={styles.MessagesList} onScroll={scrollHandler}>
      {messages.map((message) => {
        return (
          <Message
            avatar={message.photo}
            message={message.message}
            userName={message.userName}
            userId={message.userId}
            key={message.id}
          />
        )
      })}
      <div ref={scrollDown}></div>
    </div>
  )
}
const NewMessageForChat: FC = () => {
  const readyStatus = useSelector(getStatusForChatDialogs)
  const dispatch: ThunkDispatch<AppStateType, any, ActionTypes> = useDispatch()

  const initialValues = {
    message: '',
  }
  type newMessage = {message: string}
  const onSubmit = (
    values: newMessage,
    {setSubmitting}: FormikHelpers<newMessage>,
  ) => {
    if (values.message) {
      dispatch(sendMessageForChat(values.message))
      values.message = ''
    }
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validateOnBlur onSubmit={onSubmit}>
      {({values}) => (
        <Form>
          <div className={styles.newMessageForm}>
            <div className={styles.newMessage}>
              <Field
                type="text"
                name="message"
                value={values.message}
                placeholder="Enter your message"
              />
              <hr />
            </div>
            <div>
              <button
                disabled={readyStatus === 'pending'}
                className="btn btn-dark"
                type="submit">
                Send
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
const Message: FC<PropsType> = React.memo(
  ({avatar, message, userName, userId}) => {
    const authorizedUser = useSelector(getDataUserAuth)
    return (
      <div className={styles.message}>
        <NavLink to={'/profile/' + userId} className={styles.avatar}>
          <Avatar avatar={avatar} />
        </NavLink>
        <div
          className={classnames(styles.text, {
            [styles.textHost]: authorizedUser.id === userId,
          })}>
          <div className={styles.userName}>{userName}</div>
          <div>{message}</div>
        </div>
      </div>
    )
  },
)
export default ChatPage
type PropsType = {
  avatar: string
  message: string
  userName: string
  userId: number
}
