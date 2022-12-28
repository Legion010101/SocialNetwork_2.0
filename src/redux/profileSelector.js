export const getUsers = (state) => {
  return state.usersFind.users
}
export const getUsersNumber = (state) => {
  return state.usersFind.usersNumber
}
export const getPageNumber = (state) => {
  return state.usersFind.pageNumber
}
export const getTotalPage = (state) => {
  return state.usersFind.totalPage
}
export const getPages = (state) => {
  return state.usersFind.pages
}
export const getPagesLimit = (state) => {
  return state.usersFind.pagesLimit
}
export const getToggleIsFetching = (state) => {
  return state.usersFind.toggleIsFetching
}
export const getUsersRequest = (state) => {
  return state.usersFind.usersRequest
}
