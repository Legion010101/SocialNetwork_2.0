import React from 'react'
import style from '../User.module.css'
import defaultAva from '../../../../accept/img/defaultAva.png'
import {NavLink} from 'react-router-dom'

let UserCard = ({
  users,
  usersRequest,
  unfollowSuccessful,
  followSuccessful,
}) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id} className={style.user}>
            <NavLink to={'/profile/' + user.id} className={style.avatar}>
              <img
                src={user.photos.small ? user.photos.small : defaultAva}
                alt="ava"
              />
            </NavLink>
            <div className={style.description}>
              <div>{user.name}</div>
              <div>{user.location ? user.location.country : 'Бездомный'}</div>
              <div>{user.status}</div>
              <div>{user.location ? user.location.city : 'Бездомный'}</div>
            </div>
            {user.followed ? (
              <button
                disabled={usersRequest.some((element) => element === user.id)}
                className={style.subscribe + ' ' + style.un}
                onClick={() => {
                  unfollowSuccessful(user.id)
                }}>
                Unfollowing
              </button>
            ) : (
              <button
                disabled={usersRequest.some((element) => element === user.id)}
                className={style.subscribe}
                onClick={() => {
                  followSuccessful(user.id)
                }}>
                Following
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export {UserCard}
