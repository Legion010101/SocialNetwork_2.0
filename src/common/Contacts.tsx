import React, {FC} from 'react'
import s from '../components/Main/Profile/ProfileUser/ProfileUser.module.css'
import {profileType} from '../types/types'

interface PropsType {
  profile: profileType
}

let Contacts: FC<PropsType> = ({profile}) => {
  return (
    <div className={s.contacts}>
      <h4>{profile.fullName} is contacts</h4>
      <>
        {Object.entries(profile.contacts!).map((contact, index) => {
          return (
            contact[1] && (
              <div key={1 + index}>
                {`${contact[0]}: `}
                {
                  <a href={contact[1]} target="_blank" rel="noreferrer">
                    {contact[0]}
                  </a>
                }
              </div>
            )
          )
        })}
      </>
    </div>
  )
}

export {Contacts}
