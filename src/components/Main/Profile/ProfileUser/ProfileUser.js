import React from 'react'
import s from '../ProfileUser/ProfileUser.module.css'
import defaultAva from '../../../../accept/img/defaultAva.png'
import {StatusWithHook} from '../Status/StatusWithHook'

let ProfileUser = ({profile, status, updateStatus, idUserAuth}) => {
  return (
    <div className={s.description}>
      <div className={s.avatarPlace}>
        <img
          className={s.avatar}
          src={profile.photos.large ? profile.photos.large : defaultAva}
          alt="ava sleep"
        />
      </div>
      <div className={s.text}>
        <span>
          <h1>{profile.fullName}</h1>
          <StatusWithHook
            userId={profile.userId}
            statusProps={status}
            updateStatus={updateStatus}
            idUserAuth={idUserAuth}
          />
        </span>
        {profile.aboutMe}
        <span>
          <h4>В поисках работы?:</h4>
          {profile.lookingForAJobDescription}
        </span>
      </div>
      <div className={s.contacts}>
        {Object.entries(profile.contacts).map((contact, index) => {
          return (
            <div key={1 + index}>
              {`${contact[0]}: `} <a href={contact[1]}>{contact[1]}</a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export {ProfileUser}
