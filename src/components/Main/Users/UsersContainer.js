import {connect} from 'react-redux'
import {
  setPage,
  setTotalPage,
  fetcingPage,
  requestUsers,
  unfollowSuccessful,
  followSuccessful,
} from '../../../redux/usersFindReducer'
import React, {useEffect} from 'react'
import {User} from './User/User'
import style from './User.module.css'
import {Preloader} from '../../../common/preloader/Preloader'
import {compose} from 'redux'
import {
  getPageNumber,
  getPages,
  getPagesLimit,
  getToggleIsFetching,
  getTotalPage,
  getUsers,
  getUsersNumber,
  getUsersRequest,
} from '../../../redux/profileSelector'

const UsersAPIContainer = (props) => {
  useEffect(() => {
    props.getUsers(props.pageNumber, props.usersNumber)
  }, [props.pageNumber, props.usersNumber])

  const choosePage = (num) => {
    props.getUsers(num, props.usersNumber)
  }

  return (
    <>
      <Preloader toggle={props.toggleIsFetching} />
      <div className={props.toggleIsFetching ? style.preloader : ''}>
        <User choosePage={choosePage} {...props} />
      </div>
    </>
  )
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    usersNumber: getUsersNumber(state),
    pageNumber: getPageNumber(state),
    totalPage: getTotalPage(state),
    pages: getPages(state),
    pagesLimit: getPagesLimit(state),
    toggleIsFetching: getToggleIsFetching(state),
    usersRequest: getUsersRequest(state),
  }
}

const UsersContainer = compose(
  connect(mapStateToProps, {
    setPage,
    setTotalPage,
    fetcingPage,
    getUsers: requestUsers,
    unfollowSuccessful,
    followSuccessful,
  }),
)(UsersAPIContainer)
export default UsersContainer
