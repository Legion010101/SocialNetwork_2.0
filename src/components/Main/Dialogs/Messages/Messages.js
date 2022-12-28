import style from './Messages.module.css'
import {Route, Routes} from 'react-router-dom'
import {NewMessages} from './NewMessages'
import React from 'react'

const Messages = ({message, users, my, sendNewMessage}) => {
  return (
    <Routes>
      {message.map((dialog) => {
        return (
          <Route
            path={'/' + dialog.key}
            key={dialog.key}
            element={
              <div className={style.message}>
                <h2 style={{color: '#5acdd0', margin: 0}}> {dialog.user}</h2>
                {dialog.dialogs.map((mes) => {
                  return mes.from === 'me' ? (
                    <div key={mes.id} className={style.host}>
                      {mes.text}
                      <img src={my.ava} alt="" />
                    </div>
                  ) : (
                    <div key={mes.id} className={style.guest}>
                      <img
                        src={users
                          .filter((user) => {
                            return user.name === mes.from
                          })
                          .map((user) => {
                            return user.ava
                          })
                          .join()}
                        alt=""
                      />
                      {mes.text}
                    </div>
                  )
                })}
                <NewMessages
                  user={dialog.user}
                  sendNewMessage={sendNewMessage}
                />
              </div>
            }
          />
        )
      })}
      <Route
        path="*"
        element={
          <div>
            <h2 style={{color: '#5acdd0', margin: 0}}>Начните диалог</h2>
            <NewMessages sendNewMessage={sendNewMessage} />
          </div>
        }
      />
    </Routes>
  )
}

export {Messages}
