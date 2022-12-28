import {Navigate} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'

export const AuthNavigate = (Component) => {
  let mapStateToPropsNavigate = (state) => {
    return {
      isAuth: state.authReducer.isAuthorized,
    }
  }

  let withOutAuth = (props) => {
    if (!props.isAuth) return <Navigate to={'/login'} />
    return <Component {...props} />
  }
  withOutAuth = connect(mapStateToPropsNavigate)(withOutAuth)

  return withOutAuth
}
