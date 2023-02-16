import React, {FC} from 'react'
import style from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import {Avatar} from '../../common/Avatar'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAvatarForDialogs,
  getDataUserAuth,
} from '../../redux/reduxSelectors/authSelector'
import {getIsAuthorized} from '../../redux/reduxSelectors/profileSelector'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../redux/reduxStore'
import {ActionTypes} from '../../redux/profileReducer'
import {logoutUser} from '../../redux/authReducer'
import {Button} from 'antd'

const Header: FC = () => {
  const dataUser = useSelector(getDataUserAuth)
  const avatar = useSelector(getAvatarForDialogs)
  const isAuthorized = useSelector(getIsAuthorized)
  const dispatch: HeaderDispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutUser())
  }
  const login = () => {
    navigate('/login')
  }

  return (
    <div className={style.hat}>
      <div className={style.container}>
        {isAuthorized ? (
          <div className={style.loginUser}>
            <div className={style.avatarAndName}>
              <div>
                {<Avatar avatar={avatar} classAvatar={'avatarHeader'} />}
              </div>
              <div className={style.userName}>{dataUser.login}</div>
            </div>
            <Button type="primary" size="large" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className={style.login}>
            <Button type="primary" size="large" onClick={login}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export {Header}
export type HeaderDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
