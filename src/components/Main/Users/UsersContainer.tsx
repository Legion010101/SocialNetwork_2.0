import {useDispatch, useSelector} from 'react-redux'
import {
  ActionTypes,
  isShowFriendType,
  requestUsers,
} from '../../../redux/usersFindReducer'
import React, {FC, useEffect} from 'react'
import {User} from './User/User'
import {Preloader} from '../../../common/preloader/Preloader'
import {
  getIsFriends,
  getNameUser,
  getPageNumber,
  getToggleIsFetching,
  getUsersNumber,
} from '../../../redux/reduxSelectors/profileSelector'
import {AppStateType} from '../../../redux/reduxStore'
import {ThunkDispatch} from 'redux-thunk'
import {useNavigate} from 'react-router-dom'
import styles from './User.module.css'

export type userDispatch = ThunkDispatch<AppStateType, any, ActionTypes>

const UsersPage: FC = () => {
  const pageNumber = useSelector(getPageNumber)
  const usersNumber = useSelector(getUsersNumber)
  const userName = useSelector(getNameUser)
  const isFriend = useSelector(getIsFriends)
  const toggleIsFetching = useSelector(getToggleIsFetching)
  const dispatch: userDispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    let url = new URL(window.location.href)
    let ActualPage = pageNumber
    let term = userName
    let friend = isFriend
    if (url.searchParams.has('page')) {
      ActualPage = Number(url.searchParams.get('page'))
    }
    if (url.searchParams.has('term')) term = url.searchParams.get('term')!
    if (url.searchParams.has('friend')) {
      friend = url.searchParams.get('friend') as isShowFriendType
    }
    dispatch(requestUsers(ActualPage, usersNumber, term, friend))
  }, [])

  useEffect(() => {
    let url = new URL(window.location.href)

    pageNumber > 1
      ? url.searchParams.set('page', String(pageNumber))
      : url.searchParams.delete('page')
    userName
      ? url.searchParams.set('term', userName)
      : url.searchParams.delete('term')
    String(isFriend) !== 'any'
      ? url.searchParams.set('friend', String(isFriend))
      : url.searchParams.delete('friend')
    const paramsString = url.searchParams.toString()
    navigate(`?${paramsString}`)
  }, [pageNumber, userName, isFriend])

  const choosePage = (num: number) => {
    dispatch(requestUsers(num, usersNumber, userName, isFriend))
  }

  return (
    <div className={styles.container}>
      <Preloader toggle={toggleIsFetching} />
      <div className={toggleIsFetching ? styles.preloader : ''}>
        <User choosePage={choosePage} />
      </div>
    </div>
  )
}
export default UsersPage
