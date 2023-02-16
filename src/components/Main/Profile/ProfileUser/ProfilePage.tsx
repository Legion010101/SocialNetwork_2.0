import React from 'react'
import {Preloader} from '../../../../common/preloader/Preloader'
import {ProfileUser} from './ProfileUser'
import {useSelector} from 'react-redux'
import {getProfile} from '../../../../redux/reduxSelectors/profileSelector'

let ProfilePage = () => {
  const profile = useSelector(getProfile)

  if (!profile) {
    return <Preloader toggle={true} />
  }

  return (
    <div>
      <ProfileUser />
    </div>
  )
}

export {ProfilePage}
