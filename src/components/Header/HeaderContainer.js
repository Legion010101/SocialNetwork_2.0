import React from 'react'
import {Header} from './Header'
import {connect} from 'react-redux'
import {authUser, logoutUser} from '../../redux/authReducer'

const HeaderContainerAPI = (props) => {
  return (
    <Header
      dataUser={props.dataUser}
      isAuthorized={props.isAuthorized}
      logoutUser={props.logoutUser}
      avatar={props.avatar}
    />
  )
}

let mapStateToProps = (state) => {
  return {
    dataUser: state.authReducer.dataUser,
    isAuthorized: state.authReducer.isAuthorized,
    avatar: state.authReducer.avatar,
  }
}

const HeaderContainer = connect(mapStateToProps, {authUser, logoutUser})(
  HeaderContainerAPI,
)

export {HeaderContainer}
