import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  header: '',
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

const usersApi = {
  getUsers(pageNumber, usersNumber) {
    return instance
      .get(`users?page=${pageNumber}&count=${usersNumber}`)
      .then((response) => response.data)
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data)
  },
  unFollowUser(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response.data)
  },
}

const authApi = {
  authUser() {
    return instance.get(`auth/me`).then((response) => response.data)
  },
  login(dataUser) {
    return instance
      .post(`auth/login`, dataUser)
      .then((response) => response.data)
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data)
  },
}
const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data)
  },
  getStatus(userId) {
    return instance
      .get(`/profile/status/${userId}`)
      .then((response) => response.data)
  },

  updateStatus(status) {
    return instance
      .put(`/profile/status`, {status})
      .then((response) => response.data)
  },
}

export {usersApi, profileApi, authApi}
