import {AppStateType} from '../reduxStore'

export const getUsersList = (state: AppStateType) => {
  return state.usersFind.users
}
export const getUsersNumber = (state: AppStateType) => {
  return state.usersFind.usersNumber
}
export const getPageNumber = (state: AppStateType) => {
  return state.usersFind.pageNumber
}
export const getTotalPage = (state: AppStateType) => {
  return state.usersFind.totalPage
}

export const getPagesLimit = (state: AppStateType) => {
  return state.usersFind.pagesLimit
}
export const getToggleIsFetching = (state: AppStateType) => {
  return state.usersFind.toggleIsFetching
}
export const getUsersRequest = (state: AppStateType) => {
  return state.usersFind.usersRequest
}

export const getIsAuthorized = (state: AppStateType) => {
  return state.authReducer.isAuthorized
}
export const getNameUser = (state: AppStateType) => {
  return state.usersFind.nameUserForFind
}
export const getIsFriends = (state: AppStateType) => {
  return state.usersFind.isShowFriend
}
export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}
export const getStatus = (state: AppStateType) => {
  return state.profilePage.status
}
