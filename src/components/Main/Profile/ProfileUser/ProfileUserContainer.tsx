import React, {useEffect} from 'react'
import {ProfilePage} from './ProfilePage'
import {useDispatch, useSelector} from 'react-redux'
import {getProfileUser, getStatus} from '../../../../redux/profileReducer'
import {useNavigate} from 'react-router-dom'

import {useParams} from 'react-router'
import {getIdUserAuth} from '../../../../redux/reduxSelectors/authSelector'
import {ProfileDispatch} from './ProfileUser'

export const ProfileUserContainerAPI = () => {
  const navigate = useNavigate()
  const userId = useParams().userId
  const idUserAuth = useSelector(getIdUserAuth)
  const dispatch: ProfileDispatch = useDispatch()

  useEffect(() => {
    if (userId === 'me' && !idUserAuth) {
      navigate('/login')
    } else if (userId === 'me' && idUserAuth) {
      dispatch(getProfileUser(idUserAuth))
      dispatch(getStatus(idUserAuth))
    } else if (userId) {
      dispatch(getProfileUser(+userId))
      dispatch(getStatus(+userId))
    }
  }, [userId, idUserAuth])

  return <ProfilePage />
}
