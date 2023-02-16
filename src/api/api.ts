import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export enum ResultCode {
  Success = 0,
  SomeError = 1,
}

export enum ResultCodeCaptcha {
  Captcha = 10,
}

export type CommonResponseType<D = {}> = {
  data: D
  resultCode: number
  messages: Array<string>
}
