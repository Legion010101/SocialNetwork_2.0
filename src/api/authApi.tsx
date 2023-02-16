import {loginType} from '../types/types'
import {CommonResponseType, instance} from './api'

type AuthUser = {
  id: number
  email: string
  login: string
}

export const authApi = {
  authUser() {
    return instance
      .get<CommonResponseType<AuthUser>>(`auth/me`)
      .then((response) => response.data)
  },
  login(dataUser: loginType) {
    return instance
      .post<CommonResponseType<{userId: number}>>(`auth/login`, dataUser)
      .then((response) => response.data)
  },
  logout() {
    return instance
      .delete<CommonResponseType>(`auth/login`)
      .then((response) => response.data)
  },
}
