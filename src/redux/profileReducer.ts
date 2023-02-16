import {ResultCode} from '../api/api'
import {profileApi} from '../api/profileApi'

import {actionsAuth} from './authReducer'
import {PhotosType, PostType, profileType} from '../types/types'
import {ThunkAction} from 'redux-thunk'
import {AppStateType, InferActionType, ThankTypeCreator} from './reduxStore'
import exp from 'constants'

const initialState = {
  postsData: [
    {id: 1, message: 'Hello world', likesCount: 111},
    {id: 2, message: 'lol', likesCount: 5},
    {id: 3, message: 'This is my first post', likesCount: 0},
    {id: 4, message: 'no', likesCount: 1},
  ],
  profile: null as profileType | null,
  status: '' as string | null,
  updateProfileSuccessful: false,
}

const profileReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST': {
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
    case 'profile/DELETE-POST': {
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.postId),
      }
    }

    case ' profile/PROFILE-USER': {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case 'profile/UPDATE-AVATAR': {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos},
      }
    }
    case 'profile/UPDATE-STATUS': {
      return {
        ...state,
        status: action.status && action.status,
      }
    }
    case 'profile/UPDATE-PROFILE-SUCCESSFUL': {
      return {
        ...state,
        updateProfileSuccessful: action.boolean,
      }
    }
    default:
      return state
  }
}

export const actionProfile = {
  updateStatusProfile: (status: string | null) =>
    ({type: 'profile/UPDATE-STATUS', status} as const),

  updateStatusAvatar: (photos: PhotosType) =>
    ({
      type: 'profile/UPDATE-AVATAR',
      photos,
    } as const),

  updateProfileSuccessful: (boolean: boolean) =>
    ({
      type: 'profile/UPDATE-PROFILE-SUCCESSFUL',
      boolean,
    } as const),

  profileUser: (profile: any) =>
    ({
      type: ' profile/PROFILE-USER',
      profile,
    } as const),

  addPost: (postText: string) =>
    ({
      type: 'profile/ADD-POST',
      postText,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: 'profile/DELETE-POST',
      postId,
    } as const),
  avatarUser: actionsAuth.avatarUser,
}

export const getProfileUser =
  (userId: number): ThankType =>
  async (dispatch) => {
    const data = await profileApi.getProfile(userId)
    dispatch(actionProfile.profileUser(data))
  }
export const getStatus =
  (userId: number): ThankType =>
  async (dispatch) => {
    const data = await profileApi.getStatus(userId)
    dispatch(actionProfile.updateStatusProfile(data))
  }
export const updateStatus =
  (status: string | null): ThankType =>
  async (dispatch) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === ResultCode.Success) {
      dispatch(actionProfile.updateStatusProfile(status))
    }
  }
export const updateAvatar =
  (file: File): ThankType =>
  async (dispatch) => {
    const data = await profileApi.updateAvatar(file)
    if (data.resultCode === ResultCode.Success) {
      dispatch(actionProfile.updateStatusAvatar(data.data.photos))
      dispatch(actionProfile.avatarUser(data.data.photos.large))
    }
  }
export const updateProfile =
  (profileData: profileType, setStatus: Function): ThankType =>
  async (dispatch) => {
    const data = await profileApi.updateProfile({
      ...profileData,
      aboutMe: 'Null',
    })
    if (data.resultCode === ResultCode.Success) {
      dispatch(actionProfile.updateProfileSuccessful(true))
      setStatus('')
    } else {
      setStatus(data.messages)
      dispatch(actionProfile.updateProfileSuccessful(false))
    }
  }
const addPost = actionProfile.addPost
const deletePost = actionProfile.deletePost
const updateProfileSuccessful = actionProfile.updateProfileSuccessful

export {profileReducer}
export {addPost, deletePost, updateProfileSuccessful}

type initialStateType = typeof initialState
export type ActionTypes = InferActionType<typeof actionProfile>
export type ThankType = ThankTypeCreator<ActionTypes>
