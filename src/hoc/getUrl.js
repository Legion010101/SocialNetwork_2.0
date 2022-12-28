import React from 'react'
import {useParams} from 'react-router'

export const GetUrl = (Component) => {
  let ProfileHook = (props) => {
    const userId = useParams()
    return <Component {...props} userId={userId.userId} />
  }

  return ProfileHook
}
