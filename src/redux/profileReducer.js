import {profileApi} from '../api/api'

const ADD_POST = 'profile/ADD-POST '
const DELETE_POST = 'profile/DELETE-POST '
const PROFILE_USER = 'profile/PROFILE-USER'
const UPDATE_STATUS = 'profile/UPDATE-STATUS'

const initialState = {
  postsData: [
    {id: 1, message: 'Hello world', likesCount: 111},
    {id: 2, message: 'lol', likesCount: 5},
    {id: 3, message: 'This is my first post', likesCount: 0},
    {id: 4, message: 'no', likesCount: 1},
  ],
  profile: null,
  profileInfo: {
    description: 'danik.korablev00',
    ava: 'https://img5.goodfon.ru/wallpaper/nbig/0/78/art-pitbull-avatarka-pitbul-angry-dog-zloi-pes-osheinik-s-sh.jpg',
    overWindow:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  },
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: +new Date(),
        message: action.postText,
        likesCount: 0,
      }
      return {
        ...state,
        postsData: [...state.postsData, newPost],
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.postId),
      }
    }

    case PROFILE_USER: {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        status: action.status,
      }
    }
    default:
      return state
  }
}

const updateStatusProfile = (status) => ({type: UPDATE_STATUS, status})
const profileUser = (profile) => ({type: PROFILE_USER, profile})
const addPost = (postText) => ({type: ADD_POST, postText})
const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getProfileUser = (userId) => async (dispatch) => {
  const data = await profileApi.getProfile(userId)
  dispatch(profileUser(data))
}
export const getStatus = (userId) => async (dispatch) => {
  const data = await profileApi.getStatus(userId)
  dispatch(updateStatusProfile(data))
}
export const updateStatus = (status) => async (dispatch) => {
  const data = await profileApi.updateStatus(status)
  if (!data.resultCode) {
    dispatch(updateStatusProfile(status))
  }
}

export {profileReducer}
export {addPost, deletePost}
