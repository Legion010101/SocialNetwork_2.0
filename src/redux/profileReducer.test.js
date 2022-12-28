import {deletePost, addPost, profileReducer} from './profileReducer'

let state = {
  postsData: [
    {id: 1, message: 'Hello world', likesCount: 111},
    {id: 2, message: 'lol', likesCount: 5},
    {id: 3, message: 'This is my first post', likesCount: 0},
    {id: 4, message: 'no', likesCount: 1},
  ],
}
it('after adding a post, the length of the array should be increment', () => {
  let action = addPost('It-Danil')

  let newState = profileReducer(state, action)
  expect(newState.postsData.length).toBe(5)
})
it('new message text should be Jon Sina', () => {
  let action = addPost('Jon Sina')

  let newState = profileReducer(state, action)
  expect(newState.postsData[4].message).toBe('Jon Sina')
})
it('after remove a post, the length of the array should be decrement', () => {
  let action = deletePost(1)
  let newState = profileReducer(state, action)
  expect(newState.postsData.length).toBe(3)
})
it('array length must be unchanged if invalid id is entered', () => {
  let action = deletePost(1000)
  let newState = profileReducer(state, action)
  expect(newState.postsData.length).toBe(4)
})
