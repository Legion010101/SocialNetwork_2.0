import React, {useEffect} from 'react'
import {ProfilePage} from './ProfilePage'
import {connect} from 'react-redux'
import {
  getProfileUser,
  getStatus,
  updateStatus,
} from '../../../../redux/profileReducer'
import {compose} from 'redux'
import {GetUrl} from '../../../../hoc/getUrl'
import {useNavigate} from 'react-router-dom'

const ProfileUserContainerAPI = ({
  userId,
  idAuthProfile,
  getProfileUser,
  getStatus,
  status,
  profile,
  overWindow,
  updateStatus,
}) => {
  useEffect(() => {
    if (!userId && idAuthProfile) {
      getProfileUser(idAuthProfile)
      getStatus(idAuthProfile)
    } else if (userId) {
      getProfileUser(userId)
      getStatus(userId)
    }
  }, [userId, idAuthProfile])

  const userIsInactive = !userId && !idAuthProfile
  const navigate = useNavigate()

  useEffect(() => {
    if (userIsInactive) {
      navigate('/login')
    }
  }, [userIsInactive])

  return (
    <ProfilePage
      profile={profile}
      updateStatus={updateStatus}
      status={status}
      idUserAuth={idAuthProfile}
      userId={userId}
      overWindow={overWindow}
    />
  )
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    overWindow: state.profilePage.profileInfo.overWindow,
    status: state.profilePage.status,
    idAuthProfile: state.authReducer.dataUser.id,
  }
}

const ProfileUserContainer = compose(
  connect(mapStateToProps, {getProfileUser, getStatus, updateStatus}),
  GetUrl,
)(ProfileUserContainerAPI)

export default ProfileUserContainer
