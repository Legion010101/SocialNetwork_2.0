import {usersApi} from '../../api/userApi'
import {
  actionsUserFind,
  followSuccessful,
  initialStateType,
  requestUsers,
  unfollowSuccessful,
} from '../usersFindReducer'
import {ResultCode} from '../../api/api'
import {userType} from '../../types/types'

jest.mock('../../api/userApi')
const userAPIMock = usersApi as jest.Mocked<typeof usersApi>

let state: initialStateType

beforeEach(() => {
  state = {
    users: [
      {
        followed: false,
        id: 0,
        name: 'Danil',
        status: 'status0',
        photos: {small: null, large: null},
      },
      {
        followed: false,
        id: 1,
        name: 'Danil1',
        status: 'status1',
        photos: {small: null, large: null},
      },
      {
        followed: true,
        id: 2,
        name: 'Danil2',
        status: 'status2',
        photos: {small: null, large: null},
      },
      {
        followed: true,
        id: 3,
        name: 'Danil3',
        status: 'status3',
        photos: {small: null, large: null},
      },
    ],
    pageNumber: 1,
    usersNumber: 5,
    totalPage: 0,
    pagesLimit: 10,
    nameUserForFind: '',
    isShowFriend: 'false',
    toggleIsFetching: true,
    usersRequest: [],
  }
})

test('all dispatch success worked in followThunk', async () => {
  const thunk = followSuccessful(1)
  const dispatchMock = jest.fn()
  const getState = jest.fn()
  const result = {
    data: {userId: 1},
    resultCode: ResultCode.Success,
    messages: [],
  }
  userAPIMock.followUser.mockReturnValue(Promise.resolve(result))
  await thunk(dispatchMock, getState, {})
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actionsUserFind.usersButtonDisable(1),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsUserFind.following(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actionsUserFind.usersButtonDisable(1),
  )
})
test('all dispatch success worked in unfollowThunk', async () => {
  const thunk = unfollowSuccessful(3)
  const dispatchMock = jest.fn()
  const getState = jest.fn()

  const result = {
    data: {userId: 3},
    resultCode: ResultCode.Success,
    messages: [],
  }
  userAPIMock.unFollowUser.mockReturnValue(Promise.resolve(result))
  await thunk(dispatchMock, getState, {})
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actionsUserFind.usersButtonDisable(3),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actionsUserFind.unfollowing(3),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actionsUserFind.usersButtonDisable(3),
  )
})
test('all dispatch success worked in requestUsersThunk', async () => {
  const thunk = requestUsers(
    state.pageNumber,
    state.usersNumber,
    'Danil',
    'false',
  )
  const dispatchMock = jest.fn()
  const getState = jest.fn()

  const result = {
    items: state.users,
    totalCount: 4,
    error: '',
  }
  userAPIMock.getUsers.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getState, {})

  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actionsUserFind.fetcingPage(true),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actionsUserFind.fetcingPage(false),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actionsUserFind.setUsers(result.items),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    4,
    actionsUserFind.setPage(state.pageNumber),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    5,
    actionsUserFind.setParamsAdditional('Danil', 'false'),
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    6,
    actionsUserFind.setTotalPage(result.totalCount),
  )
})
