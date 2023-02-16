import {FC} from 'react'
import {UserCard} from './UserCard'
import {Paginator} from './Paginator'
import style from '../User.module.css'
import UserSelector from '../UserSelector/UserSelector'
import {useDispatch, useSelector} from 'react-redux'

import {
  getIsAuthorized,
  getIsFriends,
  getNameUser,
  getPageNumber,
  getPagesLimit,
  getTotalPage,
  getUsersList,
  getUsersNumber,
  getUsersRequest,
} from '../../../../redux/reduxSelectors/profileSelector'
import {userDispatch} from '../UsersContainer'
import {
  followSuccessful,
  isShowFriendType,
  requestUsers,
  unfollowSuccessful,
} from '../../../../redux/usersFindReducer'

type Props = {
  choosePage: (num: number) => void
}

let User: FC<Props> = ({choosePage}) => {
  const pageNumber = useSelector(getPageNumber)
  const usersNumber = useSelector(getUsersNumber)
  const userName = useSelector(getNameUser)
  const isFriend = useSelector(getIsFriends)
  const PagesLimit = useSelector(getPagesLimit)
  const totalPage = useSelector(getTotalPage)

  const users = useSelector(getUsersList)
  const usersRequest = useSelector(getUsersRequest)
  const isAuthorized = useSelector(getIsAuthorized)

  const dispatch: userDispatch = useDispatch()
  const getUsers = (
    pageNumber: number,
    usersNumber: number,
    userName: string,
    isFriend: isShowFriendType,
  ) => {
    dispatch(requestUsers(pageNumber, usersNumber, userName, isFriend))
  }
  const follow = (userId: number) => {
    dispatch(followSuccessful(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollowSuccessful(userId))
  }
  return (
    <div className={style.listUser}>
      <h2>Users</h2>

      <UserSelector
        getUsers={getUsers}
        isFriend={isFriend}
        userName={userName}
        pageNumber={pageNumber}
        usersNumber={usersNumber}
      />
      <Paginator
        choosePage={choosePage}
        pageNumber={pageNumber}
        totalPage={totalPage}
        pagesLimit={PagesLimit}
      />
      {users.map((user) => {
        return (
          <div key={user.id}>
            <UserCard
              user={user}
              usersRequest={usersRequest}
              unfollowSuccessful={unfollow}
              followSuccessful={follow}
              isAuthorized={isAuthorized}
            />
          </div>
        )
      })}
    </div>
  )
}

export {User}
