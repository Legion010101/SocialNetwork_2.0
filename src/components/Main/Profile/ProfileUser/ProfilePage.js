import {MyPostsContainer} from '../MyPosts/MyPostsContainer'
import React from 'react'
import {Preloader} from '../../../../common/preloader/Preloader'
import s from '../ProfileUser/ProfileUser.module.css'
import {ProfileUser} from './ProfileUser'

let ProfilePage = ({profile, overWindow, status, updateStatus, idUserAuth}) => {
  if (!profile) {
    return <Preloader toggle={true} />
  }

  return (
    <div>
      <div>
        <div className={s.overWindow}>
          <img src={overWindow} alt="over window" />
        </div>
      </div>
      <ProfileUser
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        idUserAuth={idUserAuth}
      />
      <MyPostsContainer />
    </div>
  )
}

export {ProfilePage}
