import {AppStateType} from '../reduxStore'

export const getAvatarForDialogs = (state: AppStateType) => {
  return state.authReducer.avatar
}
export const getIsAuth = (state: AppStateType) => {
  return state.authReducer.isAuthorized
}
export const getCaptcha = (state: AppStateType) => {
  return state.authReducer.captcha
}
export const getIdUserAuth = (state: AppStateType) => {
  return state.authReducer.dataUser.id
}
export const getDataUserAuth = (state: AppStateType) => {
  return state.authReducer.dataUser
}

export const getInitialization = (state: AppStateType) => {
  return state.app.initialization
}
