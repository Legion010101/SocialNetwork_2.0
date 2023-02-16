import ''
import {
  actionsUserFind,
  initialStateType,
  usersFindReducer,
} from '../usersFindReducer'

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

test('follow success ', () => {
  const newState = usersFindReducer(state, actionsUserFind.following(1))
  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success ', () => {
  const newState = usersFindReducer(state, actionsUserFind.unfollowing(2))
  expect(newState.users[2].followed).toBeFalsy()
  expect(newState.users[3].followed).toBeTruthy()
})
