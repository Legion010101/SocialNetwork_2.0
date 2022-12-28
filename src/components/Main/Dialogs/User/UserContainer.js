import {User} from './User'

import {connect} from 'react-redux'

let mapStateToProps = (state) => {
  return {
    users: state.messagePage.users,
  }
}

const UserContainer = connect(mapStateToProps, {})(User)
export {UserContainer}
