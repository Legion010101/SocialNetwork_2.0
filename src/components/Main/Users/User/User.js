import React from 'react'
import {UserCard} from './UserCard'
import {Paginator} from './Paginator'
import style from '../User.module.css'

let User = (props) => {
  return (
    <div className={style.listUser}>
      <h2>Users</h2>
      <Paginator {...props} />

      <UserCard
        users={props.users}
        usersRequest={props.usersRequest}
        unfollowSuccessful={props.unfollowSuccessful}
        followSuccessful={props.followSuccessful}
      />
    </div>
  )
}

export {User}
