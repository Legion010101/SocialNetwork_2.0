const initialState = {
  listNav: [
    {to: '/profile/me', text: 'Profile', key: 1},
    {to: '/findUsers', text: 'Find Users', key: 2},
    {to: '/chatPage', text: 'Chat', key: 3},
  ],
}

const sidebarReducer = (state = initialState) => {
  return state
}

export default sidebarReducer
type initialStateType = typeof initialState
