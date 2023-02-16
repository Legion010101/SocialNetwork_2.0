import {CommonResponseType, ResultCode} from '../api/api'
import {usersApi} from '../api/userApi'

import {updateObjectInArray} from '../utility/userHelper'
import {userType} from '../types/types'
import {InferActionType, ThankTypeCreator} from './reduxStore'
import {Dispatch} from 'redux'

const initialState = {
  users: [] as Array<userType>,
  pageNumber: 1,
  usersNumber: 4,
  totalPage: 0,
  pagesLimit: 10,
  nameUserForFind: '',
  isShowFriend: 'any' as isShowFriendType,
  toggleIsFetching: true,
  usersRequest: [] as Array<number>,
}
const usersFindReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'find/FOLLOWING-USER': {
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
    case 'find/UNFOLLOWING-USER': {
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
    case 'find/SET-USERS': {
      return {...state, users: [...action.users]}
    }
    case 'find/SET-PAGE': {
      return {
        ...state,
        pageNumber: action.numberPage,
      }
    }
    case 'find/SET_TOTAL-PAGE': {
      let maxPage = +action.totalNumber / state.usersNumber
      Math.ceil(maxPage)

      return {
        ...state,
        totalPage: maxPage,
      }
    }

    case 'find/FETCHING-PAGE': {
      return {
        ...state,
        toggleIsFetching: action.isFetching,
      }
    }
    case 'find/USERS-REQUEST': {
      return {
        ...state,
        usersRequest: state.usersRequest.some(
          (element) => element === action.userId,
        )
          ? state.usersRequest.filter((user) => user !== action.userId)
          : [...state.usersRequest, action.userId],
      }
    }
    case 'find/SET_PARAMS': {
      return {
        ...state,
        nameUserForFind: action.userName!,
        isShowFriend: action.isFriend!,
      }
    }

    default:
      return state
  }
}

export const actionsUserFind = {
  usersButtonDisable: (userId: number) =>
    ({
      type: 'find/USERS-REQUEST',
      userId,
    } as const),

  fetcingPage: (isFetching: boolean) =>
    ({
      type: 'find/FETCHING-PAGE',
      isFetching,
    } as const),

  setPage: (numberPage: number) =>
    ({
      type: 'find/SET-PAGE',
      numberPage,
    } as const),

  setTotalPage: (totalNumber: number) =>
    ({
      type: 'find/SET_TOTAL-PAGE',
      totalNumber,
    } as const),
  setParamsAdditional: (
    userName: string | undefined,
    isFriend: isShowFriendType,
  ) =>
    ({
      type: 'find/SET_PARAMS',
      userName,
      isFriend,
    } as const),
  following: (userId: number) =>
    ({
      type: 'find/FOLLOWING-USER',
      userId,
    } as const),

  unfollowing: (userId: number) =>
    ({
      type: 'find/UNFOLLOWING-USER',
      userId,
    } as const),

  setUsers: (users: Array<userType>) =>
    ({
      type: 'find/SET-USERS',
      users,
    } as const),
}

export const requestUsers =
  (
    pageNumber: number,
    usersNumber: number,
    userName?: string,
    isFriends?: isShowFriendType,
  ): ThankType =>
  async (dispatch) => {
    dispatch(actionsUserFind.fetcingPage(true))
    const data = await usersApi.getUsers(
      pageNumber,
      usersNumber,
      userName,
      isFriends,
    )
    dispatch(actionsUserFind.fetcingPage(false))
    dispatch(actionsUserFind.setUsers(data.items))
    dispatch(actionsUserFind.setPage(pageNumber))
    dispatch(actionsUserFind.setParamsAdditional(userName, isFriends!))
    dispatch(actionsUserFind.setTotalPage(data.totalCount))
  }
const _followUnfollowPattern = async (
  userId: number,
  apiMethod: (userId: number) => Promise<CommonResponseType>,
  actionCreator: (userId: number) => ActionTypes,
  dispatch: Dispatch<ActionTypes>,
) => {
  dispatch(actionsUserFind.usersButtonDisable(userId))
  const data = await apiMethod(userId)
  if (data.resultCode === ResultCode.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actionsUserFind.usersButtonDisable(userId))
}

export const followSuccessful = (userId: number): ThankType => {
  return async (dispatch) => {
    await _followUnfollowPattern(
      userId,
      usersApi.followUser,
      actionsUserFind.following,
      dispatch,
    )
  }
}
export const unfollowSuccessful = (userId: number): ThankType => {
  return async (dispatch) => {
    await _followUnfollowPattern(
      userId,
      usersApi.unFollowUser,
      actionsUserFind.unfollowing,
      dispatch,
    )
  }
}

const setPage = actionsUserFind.setPage
const setTotalPage = actionsUserFind.setTotalPage
const fetcingPage = actionsUserFind.fetcingPage
export {setPage, setTotalPage, fetcingPage}
export {usersFindReducer}
export type isShowFriendType = 'any' | 'true' | 'false'
export type initialStateType = typeof initialState
export type ActionTypes = InferActionType<typeof actionsUserFind>
type ThankType = ThankTypeCreator<ActionTypes>
