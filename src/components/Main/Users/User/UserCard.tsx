import React, {FC} from 'react'
import style from '../User.module.css'
import {NavLink} from 'react-router-dom'
import {Avatar} from '../../../../common/Avatar'
import cn from 'classnames'
import {userType} from '../../../../types/types'

type Props = {
  usersRequest: Array<number>
  isAuthorized: boolean
  unfollowSuccessful: (userId: number) => void
  followSuccessful: (userId: number) => void
  user: userType
}
let UserCard: FC<Props> = ({
  usersRequest,
  unfollowSuccessful,
  followSuccessful,
  isAuthorized,
  user,
}) => {
  return (
    <div>
      <div className={style.user}>
        <NavLink to={'/profile/' + user.id} className={style.avatar}>
          <Avatar avatar={user.photos.small} />
        </NavLink>
        <div className={style.description}>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>

        {isAuthorized && (
          <button
            disabled={usersRequest.some((element) => element === user.id)}
            className={cn(style.subscribe, {[style.un]: user.followed})}
            onClick={() => {
              user.followed
                ? unfollowSuccessful(user.id)
                : followSuccessful(user.id)
            }}>
            {user.followed ? 'Unfollowing' : 'Following'}
          </button>
        )}
      </div>
    </div>
  )
}

export {UserCard}
