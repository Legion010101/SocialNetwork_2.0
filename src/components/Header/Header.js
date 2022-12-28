import React from 'react'
import logo from './logo2.png'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = ({dataUser, isAuthorized, logoutUser, avatar}) => {
  const logout = () => {
    logoutUser()
  }
  return (
    <div className={s.hat}>
      <div className={s.container}>
        <img src={logo} className={s.logo} alt="logo" />
        {isAuthorized ? (
          <div>
            <div className={s.loginUser}>
              <img className={s.avatarUser} src={avatar} alt="avatar" />
              {dataUser.login}
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div>
            <NavLink to="/login">login</NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

export {Header}
