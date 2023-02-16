export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type PhotosType = {
  small: string | null
  large: string | null
}
export type dataUserType = {
  id: number | null
  login: string | null
  email: string | null
}
export type loginType = {
  email: string | null
  password: string | null
  rememberMe: boolean
  captcha: string | null
}
export type MessageType = {
  id: number
  data: number
  text: string
  from: string
  for: string
}
export type userDialogType = {
  name: string
  ava: string | null
  key: number
}
export type linkType = {
  to: string
  text: string
  key: number
}
export type userType = {
  followed: boolean
  id: number
  name: string
  uniqueUrlName?: string | null
  status: string | null
  photos: PhotosType
}
export type profileType = {
  aboutMe?: string | null | undefined
  contacts?: contactsType
  lookingForAJob?: boolean
  lookingForAJobDescription?: string | null
  fullName?: string | null
  userId?: number | null
  photos?: PhotosType
}
export type contactsType = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
}
export type dialogsType = {
  dialogs: Array<MessageType>
  key: number
  user: string
}
export type messageResponseType = {
  message: string
  photo: string
  userId: number
  userName: string
}
export type chatStatusType = 'pending' | 'ready' | 'error'
