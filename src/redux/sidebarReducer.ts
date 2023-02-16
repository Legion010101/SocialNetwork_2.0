const initialState = {
  listNav: [
    {to: '/SocialNetwork_2.0/profile/me', text: 'Profile', key: 1},
    {to: '/SocialNetwork_2.0/findUsers', text: 'Find Users', key: 2},
    {to: '/SocialNetwork_2.0/chatPage', text: 'Chat', key: 3},
  ],
}

const sidebarReducer = (state = initialState) => {
  return state
}

export default sidebarReducer
type initialStateType = typeof initialState
