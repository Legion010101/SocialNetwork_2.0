import {CommonResponseType, instance} from './api'
import {userType} from '../types/types'
import {isShowFriendType} from '../redux/usersFindReducer'
import {updateObjectInArray} from '../utility/userHelper'

export const usersApi = {
  getUsers(
    pageNumber: number,
    usersNumber: number,
    userName = '',
    isFriend = 'any' as isShowFriendType,
  ) {
    let friend = null
    switch (isFriend) {
      case 'true': {
        friend = true
        break
      }
      case 'false': {
        friend = false
        break
      }
    }
    return instance
      .get<GetUsers>(
        `users?page=${pageNumber}&count=${usersNumber}&term=${userName}&friend=${friend}`,
      )
      .then((response) => response.data)
  },
  followUser(userId: number) {
    return instance
      .post<CommonResponseType<{userId: number}>>(`follow/${userId}`)
      .then((response) => response.data)
  },
  unFollowUser(userId: number) {
    return instance
      .delete<CommonResponseType>(`follow/${userId}`)
      .then((response) => response.data)
  },
}
type GetUsers = {
  items: Array<userType>
  totalCount: number
  error: string
}
