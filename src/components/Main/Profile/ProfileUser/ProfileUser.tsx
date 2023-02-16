import React, {FC} from 'react'
import style from './ProfileUser.module.css'
import Status from '../Status/StatusWithHook'
import {AvatarUser} from './AvatarUser'
import {Contacts} from '../../../../common/Contacts'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getProfile} from '../../../../redux/reduxSelectors/profileSelector'
import {getIdUserAuth} from '../../../../redux/reduxSelectors/authSelector'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../../redux/reduxStore'
import {ActionTypes} from '../../../../redux/profileReducer'

let ProfileUser: FC = () => {
  const profile = useSelector(getProfile)
  const idUserAuth = useSelector(getIdUserAuth)

  return (
    <div className={style.container}>
      <div className={style.descriptionContainer}>
        <div className={style.description}>
          <div className={style.avatarPlace}>
            <AvatarUser avatar={profile?.photos?.large} />
          </div>
          <div className={style.AboutProfile}>
            <span>
              <div>
                <h1>{profile?.fullName}</h1>
              </div>
              <Status />
            </span>
            <span>
              <div>
                <h4 className={style.lookingForAJob}>
                  В поисках работы: {profile?.lookingForAJob ? 'Yes' : 'No'}
                </h4>
              </div>
            </span>
          </div>
          {profile && <Contacts profile={profile} />}
          {idUserAuth === profile?.userId && (
            <div className={style.setting}>
              <NavLink to="/setting">Refactor profile</NavLink>
            </div>
          )}
        </div>
        <hr />
        <h3>technical skills:</h3>
        <div>{profile?.lookingForAJobDescription}</div>
      </div>
    </div>
  )
}

export {ProfileUser}
export type ProfileDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
