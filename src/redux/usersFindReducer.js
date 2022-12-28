import {usersApi} from '../api/api'
import {updateObjectInArray} from '../utility/userHelper'

const initialState = {
  users: [],
  pageNumber: 1,
  usersNumber: 5,
  totalPage: 0,
  pagesLimit: 10,
  toggleIsFetching: true,
  usersRequest: [],
}
const usersFindReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWING_USER: {
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userId,
          'id',
          true,
          false,
        ),
      }
    }
    case UNFOLLOWING_USER: {
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userId,
          'id',
          false,
          true,
        ),
      }
    }
    case SET_USERS: {
      return {...state, users: [...action.users]}
    }
    case SET_PAGE: {
      return {
        ...state,
        pageNumber: action.numberPage,
      }
    }
    case SET_TOTAL_PAGE: {
      let maxPage = +action.totalNumber / state.usersNumber
      Math.ceil(maxPage)

      return {
        ...state,
        totalPage: maxPage,
      }
    }
    case FETCHING_PAGE: {
      return {
        ...state,
        toggleIsFetching: action.isFetching,
      }
    }
    case USERS_REQUEST: {
      return {
        ...state,
        usersRequest: state.usersRequest.some(
          (element) => element === action.userId,
        )
          ? state.usersRequest.filter((user) => user !== action.userId)
          : [...state.usersRequest, action.userId],
      }
    }

    default:
      return state
  }
}

const USERS_REQUEST = 'find/USERS-REQUEST'

const FETCHING_PAGE = 'find/FETCHING-PAGE'

const FOLLOWING_USER = 'find/FOLLOWING-USER'
const UNFOLLOWING_USER = 'find/UNFOLLOWING-USER'
const SET_USERS = 'find/SET-USERS'

const SET_PAGE = 'find/SET-PAGE'
const SET_TOTAL_PAGE = 'find/SET_TOTAL-PAGE'

export const usersButtonDisable = (userId) => ({type: USERS_REQUEST, userId})

export const fetcingPage = (isFetching) => ({type: FETCHING_PAGE, isFetching})

export const setPage = (numberPage) => ({type: SET_PAGE, numberPage})
export const setTotalPage = (totalNumber) => ({
  type: SET_TOTAL_PAGE,
  totalNumber,
})

export const following = (userId) => ({type: FOLLOWING_USER, userId})
export const unfollowing = (userId) => ({
  type: UNFOLLOWING_USER,
  userId,
})
export const setUsers = (users) => ({type: SET_USERS, users})

export const requestUsers = (pageNumber, usersNumber) => async (dispatch) => {
  dispatch(fetcingPage(true))
  const data = await usersApi.getUsers(pageNumber, usersNumber)
  dispatch(fetcingPage(false))
  dispatch(setUsers(data.items))
  dispatch(setPage(pageNumber))
  dispatch(setTotalPage(data.totalCount))
}

const followUnfollowPattern = async (
  userId,
  apiMethod,
  actionCreator,
  dispatch,
) => {
  dispatch(usersButtonDisable(userId))
  const data = await apiMethod(userId)
  if (!data.resultCode) {
    dispatch(actionCreator(userId))
  }
  dispatch(usersButtonDisable(userId))
}

export const followSuccessful = (userId) => {
  return async (dispatch) => {
    followUnfollowPattern(userId, usersApi.followUser, following, dispatch)
  }
}
export const unfollowSuccessful = (userId) => {
  return async (dispatch) => {
    followUnfollowPattern(userId, usersApi.unFollowUser, unfollowing, dispatch)
  }
}

export {usersFindReducer}
