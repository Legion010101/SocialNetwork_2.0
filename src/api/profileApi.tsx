import {profileType, PhotosType} from '../types/types'
import {CommonResponseType, instance} from './api'

export const profileApi = {
  getProfile(userId: number | null) {
    return instance.get(`profile/${userId}`).then((response) => response.data)
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`/profile/status/${userId}`)
      .then((response) => response.data)
  },

  updateStatus(status: string | null) {
    return instance
      .put<CommonResponseType>(`/profile/status`, {status})
      .then((response) => response.data)
  },
  updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return instance
      .put<UpdateAvatar>(`/profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
  },
  updateProfile(profileData: profileType) {
    return instance
      .put<CommonResponseType>(`/profile`, profileData)
      .then((response) => response.data)
  },
}
type UpdateAvatar = {
  data: {
    photos: PhotosType
  }
  resultCode: number
  fieldsErrors: Array<string>

  messages: Array<string>
}
