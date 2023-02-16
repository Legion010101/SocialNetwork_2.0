import {ResultCode, ResultCodeCaptcha} from '../api/api'
import {authApi} from '../api/authApi'
import {securityApi} from '../api/securityApi'
import {profileApi} from '../api/profileApi'

import {
  AppStateType,
  InferActionType,
  store,
  ThankTypeCreator,
} from './reduxStore'
import {dataUserType, loginType} from '../types/types'
import {ThunkAction} from 'redux-thunk'

const initialState = {
  dataUser: {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
  } as dataUserType,
  isAuthorized: false as boolean,
  avatar: null as string | null,
  captcha: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'auth/AUTH-USER': {
      return {
        ...state,
        dataUser: action.dataUser,

        isAuthorized: action.isAuthorized,
      }
    }
    case 'auth/AVATAR-USER': {
      if (action.avatarUser) {
        return {...state, avatar: action.avatarUser}
      }
      return state
    }
    case 'auth/GET-CAPTCHA': {
      return {...state, captcha: action.captchaURL}
    }
    default:
      return state
  }
}

export const actionsAuth = {
  captcha: (link: string | null) =>
    ({
      type: 'auth/GET-CAPTCHA',
      captchaURL: link,
    } as const),

  avatarUser: (link: string | null) =>
    ({
      type: 'auth/AVATAR-USER',
      avatarUser: link,
    } as const),

  setAuthDataUser: (
    id: number | null,
    login: string | null,
    email: string | null,
    auth: boolean,
  ) =>
    ({
      type: 'auth/AUTH-USER',
      dataUser: {id, login, email},
      isAuthorized: auth,
    } as const),
}

export const authUser = (): ThankType => (dispatch) => {
  return authApi
    .authUser()
    .then((data) => {
      if (data.resultCode === ResultCode.Success) {
        let {id, login, email} = data.data
        dispatch(actionsAuth.setAuthDataUser(id, login, email, true))
      }
    })
    .then(
      (data) =>
        store.getState().authReducer.dataUser.id &&
        profileApi.getProfile(store.getState().authReducer.dataUser.id),
    )
    .then((data) => {
      store.getState().authReducer.dataUser.id &&
        dispatch(actionsAuth.avatarUser(data.photos.large))
    })
}

export const getCaptchaUrl = (): ThankType => async (dispatch) => {
  const response = await securityApi.getCaptcha()
  dispatch(actionsAuth.captcha(response.url))
}

export const loginUser =
  (
    dataUser: loginType,
    setStatus: (message: Array<string>) => void,
  ): ThankType =>
  async (dispatch) => {
    const data = await authApi.login(dataUser)
    if (data.resultCode === ResultCode.Success) {
      dispatch(actionsAuth.captcha(null))
      dispatch(authUser())
    } else if (data.resultCode === ResultCodeCaptcha.Captcha) {
      dispatch(getCaptchaUrl())
    } else {
      setStatus(data.messages)
    }
  }

export const logoutUser = (): ThankType => async (dispatch) => {
  const data = await authApi.logout()
  if (!data.resultCode) {
    dispatch(actionsAuth.setAuthDataUser(null, null, null, false))
    dispatch(authUser())
  }
}

export {authReducer}

export type ActionTypes = InferActionType<typeof actionsAuth>
type initialStateType = typeof initialState
type ThankType = ThankTypeCreator<ActionTypes>
