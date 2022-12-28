import defaultAva from '../accept/img/defaultAva.png'
import {authApi} from '../api/api'

const initialState = {
  dataUser: {
    id: null,
    login: null,
    email: null,
  },
  isAuthorized: false,
  avatar: defaultAva,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      return {
        ...state,
        dataUser: action.dataUser,
        isAuthorized: action.isAuthorized,
      }
    }
    case AVATAR_USER: {
      return {...state, avatarUser: action.link}
    }
    default:
      return state
  }
}
const AUTH_USER = 'auth/AUTH-USER'
const AVATAR_USER = 'auth/AVATAR-USER'

export const avatarUser = (link) => ({
  type: AVATAR_USER,
  avatarUser: link,
})
const setAuthDataUser = (id, login, email, auth) => ({
  type: AUTH_USER,
  dataUser: {id, login, email},
  isAuthorized: auth,
})

export const authUser = () => async (dispatch) => {
  const data = await authApi.authUser()
  if (!data.resultCode) {
    let {id, login, email} = data.data
    dispatch(setAuthDataUser(id, login, email, true))
  }
}
export const loginUser = (dataUser, setStatus) => async (dispatch) => {
  const data = await authApi.login(dataUser)
  if (!data.resultCode) {
    dispatch(authUser())
  } else {
    setStatus(data.messages)
  }
}

export const logoutUser = () => async (dispatch) => {
  const data = await authApi.logout()
  if (!data.resultCode) {
    dispatch(setAuthDataUser(null, null, null, false))
    dispatch(authUser())
  }
}

export {authReducer}
