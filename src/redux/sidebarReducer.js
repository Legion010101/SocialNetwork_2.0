const initialState = {
  listNav: [
    {to: '/profile/me', text: 'Profile', key: 1},
    {to: '/dialogs', text: 'Messages', key: 2},
    {to: '/news', text: 'News', key: 3},
    {to: '/music', text: 'Music', key: 4},
    {to: '/findUsers', text: 'Find Users', key: 5},
    {to: '/setting', text: 'Setting', key: 6},
  ],
}

const sidebarReducer = (state = initialState, action) => {
  return state
}

export {sidebarReducer}
